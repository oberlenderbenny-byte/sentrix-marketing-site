// LOCAL-ONLY prerendering. Run this on your own machine (`npm run prerender`),
// then commit the files it writes into `public/`.
//
// This does NOT run on Vercel. Vercel's build container is missing the system
// libraries headless Chromium needs and has no sudo/apt access to install
// them, so launching a browser there fails (confirmed: exitCode 127). Running
// it here instead, on a normal OS, avoids that entirely.
//
// It builds the app, serves `dist` locally, opens each route in a headless
// browser, waits for React to render, and writes the fully-rendered HTML into
// `public/<route>/index.html`. Because `public/` is committed to git, every
// future `vite build` — including on Vercel — copies these pre-rendered
// files into the deploy automatically, with no browser involved at build
// time. Re-run this script and commit again whenever page content changes.
//
// The "/" route is intentionally skipped: Vite's own root index.html template
// already carries solid meta/OG/JSON-LD tags, and writing a prerendered file
// to public/index.html would collide with that template during build.

import { preview } from "vite";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROUTES = [
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

    const outDir = path.join("public", route.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`Prerendered ${route} -> ${outDir}/index.html`);
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));

  console.log("\nDone. Now commit the new/updated files under public/ and push.");
}

main().catch((err) => {
  console.error("Prerendering failed:", err.message);
  process.exit(1);
});
