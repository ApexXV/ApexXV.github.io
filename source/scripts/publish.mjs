// Copies the static export in out/ to the repository root, which GitHub Pages
// serves from the main branch. Run after `npm run build && npm run verify`.
//
//   node scripts/publish.mjs
//
// Everything at the repo root is replaced except the entries listed in KEEP.
import { cp, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(sourceRoot, "..");
const out = path.join(sourceRoot, "out");

// Files and folders at the repo root that are not build output.
const KEEP = new Set([".git", ".nojekyll", "CNAME", "README.md", path.basename(sourceRoot)]);

const outInfo = await stat(out).catch(() => null);
if (!outInfo?.isDirectory()) {
  console.error(`No export found at ${out}. Run "npm run build" first.`);
  process.exit(1);
}
const outIndex = await stat(path.join(out, "index.html")).catch(() => null);
if (!outIndex) {
  console.error(`${out} has no index.html; refusing to publish an incomplete export.`);
  process.exit(1);
}

let removed = 0;
for (const entry of await readdir(repoRoot)) {
  if (KEEP.has(entry)) continue;
  await rm(path.join(repoRoot, entry), { recursive: true, force: true });
  removed += 1;
}

let copied = 0;
for (const entry of await readdir(out)) {
  if (KEEP.has(entry)) {
    console.warn(`Skipping ${entry} from out/: it is a protected root entry.`);
    continue;
  }
  await cp(path.join(out, entry), path.join(repoRoot, entry), { recursive: true });
  copied += 1;
}

console.log(`Published: removed ${removed} old root entries, copied ${copied} from out/.`);
console.log("Next: review `git status`, then commit and push main.");
