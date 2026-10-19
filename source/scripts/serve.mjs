import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.resolve(projectRoot, process.argv[2] || "out");
const port = Number(process.env.PORT || 4173);
const contentTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8" };
http.createServer(async (request, response) => {
  try {
    const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let filename = path.resolve(siteRoot, "." + urlPath);
    if (filename !== siteRoot && !filename.startsWith(siteRoot + path.sep)) {
      response.writeHead(403).end("Forbidden"); return;
    }
    const info = await stat(filename);
    if (info.isDirectory()) filename = path.join(filename, "index.html");
    const body = await readFile(filename);
    response.writeHead(200, { "Content-Type": contentTypes[path.extname(filename)] || "application/octet-stream" });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    try { response.end(await readFile(path.join(siteRoot, "404.html"))); }
    catch { response.end("Not found"); }
  }
}).listen(port, "127.0.0.1", () => console.log(`AP3X local preview: http://127.0.0.1:${port} (serving ${siteRoot})`));
