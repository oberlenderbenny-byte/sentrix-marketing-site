// Post-build prerendering.
//
// Vite builds this app as a client-only SPA — the shipped index.html is just
// `<div id="root"></div>` until React runs. That's invisible to any crawler
// that doesn't execute JavaScript (many AI crawlers used for grounding/answer
// engines don't). This script serves the built `dist` folder locally, opens
// each real route in a headless browser, waits for React to render, and
// writes the resulting fully-rendered HTML back into `dist` as a static file
// at that route's path. Vercel's filesystem routing serves a matching static
// file before falling back to the SPA rewrite (see vercel.json), so crawlers
// hitting e.g. /solutions/retail get real prerendered content, while regular
// browsers still get the exact same app taking over client-side as before.
//
// This step is best-effort: if the headless browser can't launch (e.g. a
// build environment missing system libraries), it logs a warning and exits
// 0 rather than failing the deploy. See package.json's "build" script.

import { preview } from "vite";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROUTES = [
  "/",
  "/solutions/retail",
  "/solutions/banking",
  "/solutions/warehouse",
  "/solutions/corporate",
  "/solutions/technology",
  "/pricing",
  "/about",
  "/contact",
];

async function main() {
  const server = await preview({ preview: { port: 4173, host: "127.0.0.1" } });
  const base = `http://127.0.0.1:${server.config.preview.port}`;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const html = await page.content();

    const outDir =
      route === "/"
        ? "dist"
        : path.join("dist", route.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`Prerendered ${route} -> ${outDir}/index.html`);
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

main()
  .then(() => {
    console.log("Prerendering complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.warn("Prerendering failed, shipping CSR-only build instead:", err.message);
    process.exit(0);
  });
