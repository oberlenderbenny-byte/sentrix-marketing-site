// Runs after `vite build` (see the "build" script in package.json). Splices
// the prerendered home-page markup (public/_home-body.html, produced by
// `npm run prerender` — see scripts/prerender.mjs) into dist/index.html's
// empty <div id="root"></div>, so crawlers that don't execute JavaScript
// (most AI bots, and Googlebot's first, non-rendering pass) see real content
// on the single most important URL on the site instead of an empty shell.
//
// This does no browser work — it's a plain string splice on files that
// already exist on disk — so it's safe to run on Vercel, unlike the
// Playwright-based prerender script itself.
//
// If public/_home-body.html is missing (e.g. a fresh checkout before anyone
// has run `npm run prerender` locally), this step is skipped with a warning
// rather than failing the build — dist/index.html just falls back to the
// plain CSR shell, exactly like before this change.

import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const DIST_INDEX = path.join("dist", "index.html");
const HOME_BODY = path.join("public", "_home-body.html");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(HOME_BODY))) {
    console.warn(
      `[inject-home] ${HOME_BODY} not found — skipping. Run "npm run prerender" locally and commit it to fix this.`
    );
    return;
  }

  const [indexHtml, homeBody] = await Promise.all([
    readFile(DIST_INDEX, "utf-8"),
    readFile(HOME_BODY, "utf-8"),
  ]);

  const marker = '<div id="root"></div>';
  if (!indexHtml.includes(marker)) {
    console.warn(`[inject-home] Could not find ${marker} in ${DIST_INDEX} — skipping splice.`);
    return;
  }

  const spliced = indexHtml.replace(marker, homeBody);
  await writeFile(DIST_INDEX, spliced, "utf-8");
  console.log(`[inject-home] Spliced ${HOME_BODY} into ${DIST_INDEX}.`);
}

main().catch((err) => {
  console.error("[inject-home] Failed:", err.message);
  process.exit(1);
});
