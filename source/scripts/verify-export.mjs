import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(root, process.argv[2] || "out");
const home = await readFile(path.join(out, "index.html"), "utf8");
const deductions = await readFile(path.join(out, "deductions/index.html"), "utf8");
for (const expected of ["Practical support for work that needs to move.", "Business Operations", "Technology Support", "Additive Manufacturing / 3D Printing", "Clear from first question to final handoff.", "Capability without unnecessary ceremony.", "Tell us what you are working on.", "sebastien@ap3xoperations.com", "https://ap3xoperations.com/"]) assert(home.includes(expected), `Homepage missing ${expected}`);
for (const target of ["main-content", "top", "services", "process", "about", "contact"]) assert(home.includes(`id="${target}"`), `Missing navigation target ${target}`);
assert(deductions.includes("Deductions — AP3X"), "Missing deductions title");
assert(deductions.includes("noindex, nofollow"), "Deductions indexing restriction lost");
assert(deductions.includes("/deductions.webmanifest"), "Missing Deductions install manifest");
for (const html of [home, deductions]) {
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]*)[^"]*"/g)) {
    if (match[1] === "/") continue;
    const filename = path.join(out, decodeURIComponent(match[1]));
    const info = await stat(filename).catch(() => null);
    assert(info, `Missing exported local asset ${match[1]}`);
  }
}
for (const name of await readdir(path.join(root, "public"))) {
  const original = await readFile(path.join(root, "public", name));
  const exported = await readFile(path.join(out, name));
  assert(original.equals(exported), `Asset changed: ${name}`);
}
console.log("PASS: both route HTML files, canonical metadata, homepage copy, navigation targets, local assets, noindex, manifests, and byte-identical public assets.");
