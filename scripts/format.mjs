import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const bin = path.join(
	path.dirname(
		fileURLToPath(import.meta.resolve("@biomejs/biome/package.json")),
	),
	"bin",
	"biome",
);

export function format(source, filePath) {
	return new Promise((resolve, reject) => {
		const child = spawn(
			process.execPath,
			[bin, "format", "--stdin-file-path", filePath],
			{ stdio: ["pipe", "pipe", "pipe"] },
		);
		let output = "";
		let errors = "";
		child.stdout.on("data", (chunk) => (output += chunk));
		child.stderr.on("data", (chunk) => (errors += chunk));
		child.on("error", reject);
		child.on("close", (code) => {
			if (code === 0) resolve(output);
			else reject(new Error(`biome exited with ${code}\n${errors}`));
		});
		child.stdin.end(source);
	});
}
