// NOTE: Minimal static server for preview/, because @import of local files
// over file:// is blocked in some browsers.

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.env.PORT ?? 4321);

const types = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
	const path = normalize(decodeURIComponent(new URL(request.url, "http://x").pathname));
	const resolved = join(root, path === "/" ? "preview/index.html" : path);

	if (!resolved.startsWith(root)) {
		response.writeHead(403).end("Forbidden");
		return;
	}

	try {
		const info = await stat(resolved);
		const file = info.isDirectory() ? join(resolved, "index.html") : resolved;
		if (!(await stat(file)).isFile()) throw new Error("not a file");
		response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
		createReadStream(file).pipe(response);
	} catch {
		response.writeHead(404).end("Not found");
	}
});

server.listen(port, () => console.log(`preview: http://localhost:${port}/preview/`));
