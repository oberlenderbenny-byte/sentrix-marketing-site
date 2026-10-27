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
// The "/" (home) route is handled differently from the rest: writing a
// rendered snapshot straight to `public/index.html` would collide with
// Vite's own processed index.html (the one with correct hashed/stable asset
// tags), since files in `public/` are copied over the build output. Instead
// the home route's rendered body is captured into `public/_home-body.html`
// (a plain fragment, not a full page) and `scripts/inject-home.mjs` splices
// it into `dist/index.html` after every `vite build` — see that script and
// the `build` entry in package.json. That splice step does not need a
// browser, so it runs fine on Vercel.

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

  // Home route: capture only the #root fragment, not a full document.
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const rootHtml = await page.$eval("#root", (el) => el.outerHTML);
  await writeFile(path.join("public", "_home-body.html"), rootHtml, "utf-8");
  console.log("Prerendered / -> public/_home-body.html (spliced into dist/index.html at build time)");

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));

  console.log("\nDone. Now commit the new/updated files under public/ and push.");
}

main().catch((err) => {
  console.error("Prerendering failed:", err.message);
  process.exit(1);
});
