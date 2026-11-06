import { spawn } from "node:child_process";
import {
	cp,
	mkdtemp,
	readdir,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "./format.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = path.join(root, "src", "components");
const check = process.argv.includes("--check");
const bin = path.join(
	path.dirname(
		fileURLToPath(import.meta.resolve("@sveltejs/package/package.json")),
	),
	"svelte-package.js",
);

function run(command, args, cwd) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd,
			stdio: ["ignore", "pipe", "pipe"],
		});
		let output = "";
		child.stdout.on("data", (chunk) => (output += chunk));
		child.stderr.on("data", (chunk) => (output += chunk));
		child.on("error", reject);
		child.on("close", (code) => {
			if (code === 0) resolve(output);
			else
				reject(
					new Error(`${path.basename(command)} exited with ${code}\n${output}`),
				);
		});
	});
}

// NOTE: svelte2tsx names the instance alias and the const after the component, which shadows an imported type of the same name and turns the default export type-only.
function deshadow(source, name) {
	const imported = [...source.matchAll(/^import (?:type )?\{([^}]*)\}/gm)]
		.flatMap((match) => match[1].split(","))
		.map((part) =>
			part
				.trim()
				.split(/\s+as\s+/)
				.pop(),
		);
	if (!imported.includes(name)) return source;
	return source
		.replace(
			new RegExp(`^type ${name}(<[^=]*>)? = InstanceType<typeof ${name}`, "m"),
			(_, generic = "") =>
				`type ${name}Instance${generic} = InstanceType<typeof ${name}Component`,
		)
		.replace(
			new RegExp(`^declare const ${name}:`, "m"),
			`declare const ${name}Component:`,
		)
		.replace(
			new RegExp(`^export default ${name};`, "m"),
			`export default ${name}Component;`,
		);
}

async function declarations() {
	const tmp = await mkdtemp(path.join(os.tmpdir(), "ui-kit-types-"));
	const input = path.join(tmp, "src");
	const output = path.join(tmp, "out");
	const result = new Map();
	try {
		await cp(path.join(root, "src"), input, {
			recursive: true,
			filter: (file) => !file.endsWith(".d.svelte.ts"),
		});
		const tsconfig = JSON.parse(
			await readFile(path.join(root, "tsconfig.json"), "utf8"),
		);
		delete tsconfig.compilerOptions.types;
		tsconfig.include = ["**/*"];
		await writeFile(
			path.join(input, "tsconfig.json"),
			JSON.stringify(tsconfig),
		);
		await run(process.execPath, [bin, "-i", input, "-o", output], root);
		const files = (await readdir(componentsDir))
			.filter((file) => file.endsWith(".svelte"))
			.sort((a, b) => a.localeCompare(b, "en"));
		for (const file of files) {
			const name = path.basename(file, ".svelte");
			const target = path.join(componentsDir, `${name}.d.svelte.ts`);
			const declaration = await readFile(
				path.join(output, "components", `${name}.svelte.d.ts`),
				"utf8",
			).catch(() => null);
			if (declaration === null) throw new Error(`no declaration for ${file}`);
			const note = `// NOTE: generated from src/components/${file} by \`pnpm build:types\`; do not edit.\n`;
			const source = await format(note + deshadow(declaration, name), target);
			result.set(`${name}.d.svelte.ts`, source);
		}
	} finally {
		await rm(tmp, { recursive: true, force: true });
	}
	return result;
}

const expected = await declarations();
const current = new Set(
	(await readdir(componentsDir)).filter((file) =>
		file.endsWith(".d.svelte.ts"),
	),
);

if (check) {
	const problems = [];
	for (const [name, content] of expected) {
		const onDisk = await readFile(path.join(componentsDir, name), "utf8").catch(
			() => null,
		);
		if (onDisk === null) problems.push(`${name}: missing`);
		else if (onDisk !== content) problems.push(`${name}: out of date`);
	}
	for (const name of current) {
		if (!expected.has(name)) problems.push(`${name}: no source component`);
	}
	if (problems.length) {
		console.error(
			`${problems.join("\n")}\nrun \`pnpm build:types\` to regenerate component declarations.`,
		);
		process.exit(1);
	}
	console.log(`${expected.size} component declarations are up to date.`);
} else {
	for (const [name, content] of expected) {
		await writeFile(path.join(componentsDir, name), content);
	}
	for (const name of current) {
		if (!expected.has(name)) await rm(path.join(componentsDir, name));
	}
	console.log(
		`wrote ${expected.size} component declarations to src/components`,
	);
}
