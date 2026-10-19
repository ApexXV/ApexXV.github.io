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
const printing = await readFile(path.join(out, "printing/index.html"), "utf8");
const about = await readFile(path.join(out, "about/index.html"), "utf8");
for (const expected of ["Functional prints, prepared and checked.", "Bambu Lab X1 Carbon", "What AP3X does not print", 'href="https://ap3xoperations.com/printing/"']) assert(printing.includes(expected), `3D printing page missing ${expected}`);
for (const expected of ["Sebastien Gifford, founder.", "Where the experience comes from.", "Tools and platforms", 'href="https://ap3xoperations.com/about/"']) assert(about.includes(expected), `About page missing ${expected}`);
for (const [name, html] of [["home", home], ["3D printing", printing], ["about", about]]) {
  for (const href of ['href="/printing/"', 'href="/about/"']) assert(html.includes(href), `${name} page navigation missing ${href}`);
}
assert(deductions.includes("Deductions — AP3X"), "Missing deductions title");
assert(deductions.includes("noindex, nofollow"), "Deductions indexing restriction lost");
assert(deductions.includes("/deductions.webmanifest"), "Missing Deductions install manifest");
for (const html of [home, deductions, printing, about]) {
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]*)[^"]*"/g)) {
    if (match[1] === "/") continue;
    const filename = path.join(out, decodeURIComponent(match[1]));
    const info = await stat(filename).catch(() => null);
    assert(info, `Missing exported local asset ${match[1]}`);
  }
}
for (const entry of await readdir(path.join(root, "public"), { recursive: true, withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const name = path.relative(path.join(root, "public"), path.join(entry.parentPath, entry.name));
  const original = await readFile(path.join(root, "public", name));
  const exported = await readFile(path.join(out, name)).catch(() => null);
  assert(exported, `Asset missing from export: ${name}`);
  assert(original.equals(exported), `Asset changed: ${name}`);
}
console.log("PASS: both route HTML files, canonical metadata, homepage copy, navigation targets, local assets, noindex, manifests, and byte-identical public assets.");
