import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = path.join(root, "src", "components");
const outputFile = path.join(root, "docs", "reference", "components.md");
const check = process.argv.includes("--check");

function scriptOf(source) {
	const match = source.match(
		/<script[^>]*\blang="ts"[^>]*>([\s\S]*?)<\/script>/,
	);
	if (!match) throw new Error("no TypeScript script block");
	return match[1];
}

function aliasTypes(file) {
	const aliases = new Map();
	file.forEachChild((node) => {
		if (ts.isTypeAliasDeclaration(node)) {
			aliases.set(node.name.text, node.type.getText(file));
		}
	});
	return aliases;
}

function resolveType(text, aliases, depth = 0) {
	if (depth > 5) return text;
	if (/^[A-Za-z_$][\w$]*$/.test(text) && aliases.has(text)) {
		return resolveType(aliases.get(text), aliases, depth + 1);
	}
	const generic = text.match(/^([A-Za-z_$][\w$]*)<(.+)>$/);
	if (generic && aliases.has(generic[1])) {
		const inner = resolveType(aliases.get(generic[1]), aliases, depth + 1);
		return `${inner}<${generic[2]}>`;
	}
	return text;
}

function descriptionOf(member) {
	const docs = member.jsDoc ?? [];
	const parts = [];
	for (const doc of docs) {
		if (typeof doc.comment === "string") parts.push(doc.comment);
		else if (doc.comment)
			parts.push(doc.comment.map((line) => line.text).join(""));
	}
	return parts.join(" ").replace(/\s+/g, " ").trim();
}

function defaultsOf(file) {
	const defaults = new Map();
	file.forEachChild((node) => {
		if (!ts.isVariableStatement(node)) return;
		for (const declaration of node.declarationList.declarations) {
			if (!ts.isObjectBindingPattern(declaration.name)) continue;
			const init = declaration.initializer;
			if (!init || !ts.isCallExpression(init)) continue;
			if (init.expression.getText(file) !== "$props") continue;
			for (const element of declaration.name.elements) {
				const name = (element.propertyName ?? element.name).getText(file);
				defaults.set(name, element.initializer ?? null);
			}
		}
	});
	return defaults;
}

function propRows(file, declaration, aliases, defaults) {
	const rows = [];
	for (const member of declaration.members) {
		if (!ts.isPropertySignature(member) || !member.name) continue;
		const name = member.name.getText(file);
		const initializer = defaults.get(name);
		const initText = initializer ? initializer.getText(file) : "";
		const bindable = initText.startsWith("$bindable");
		const optional = Boolean(member.questionToken);
		const label = bindable ? `bind:${name}` : optional ? `${name}?` : name;
		const type = resolveType(member.type?.getText(file) ?? "unknown", aliases);
		const defaultValue =
			initializer && !bindable && initText !== "undefined"
				? code(escapeCell(initText))
				: "";
		rows.push({
			label: code(label),
			type: code(escapeCell(type)),
			default: defaultValue,
			description: escapeCell(descriptionOf(member)),
		});
	}
	return rows;
}

function escapeCell(text) {
	return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function code(text) {
	const runs = text.match(/`+/g) ?? [];
	const longest = runs.reduce((max, run) => Math.max(max, run.length), 0);
	const fence = "`".repeat(longest + 1);
	const pad = longest ? " " : "";
	return `${fence}${pad}${text}${pad}${fence}`;
}

async function documentComponent(fileName, source) {
	const name = path.basename(fileName, ".svelte");
	const file = ts.createSourceFile(
		fileName,
		scriptOf(source),
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS,
	);
	const declaration = file.statements.find(
		(node) => ts.isInterfaceDeclaration(node) && node.name.text === "Props",
	);
	if (!declaration) throw new Error(`${fileName}: no interface Props`);
	const aliases = aliasTypes(file);
	const defaults = defaultsOf(file);
	const rows = propRows(file, declaration, aliases, defaults);
	const heredity = (declaration.heritageClauses ?? [])
		.flatMap((clause) => clause.types.map((type) => type.getText(file)))
		.map((text) =>
			text
				.replace(/\s+/g, " ")
				.trim()
				.replace(/<\s+/g, "<")
				.replace(/\s+>/g, ">"),
		)
		.filter(Boolean);

	const lines = [
		`## ${name}`,
		"",
		"```svelte",
		`import ${name} from "@ku6epxboctuk/ui-kit/components/${name}.svelte";`,
		"```",
		"",
	];
	if (heredity.length) {
		lines.push(
			`Extends ${heredity.map((item) => `\`${item}\``).join(", ")}; those attributes and event handlers pass through.`,
			"",
		);
	}
	lines.push(
		"| Prop | Type | Default | Description |",
		"| --- | --- | --- | --- |",
	);
	for (const row of rows) {
		lines.push(
			`| ${row.label} | ${row.type} | ${row.default} | ${row.description} |`,
		);
	}
	lines.push("");
	return lines.join("\n");
}

async function build() {
	const files = (await readdir(componentsDir))
		.filter((file) => file.endsWith(".svelte"))
		.sort((a, b) => a.localeCompare(b, "en"));
	const sections = [];
	for (const file of files) {
		const source = await readFile(path.join(componentsDir, file), "utf8");
		sections.push(await documentComponent(file, source));
	}
	const raw = [
		"# Component props",
		"",
		"Generated from `interface Props` in `src/components` by `pnpm docs:build`. Do not edit by hand: rerun the command instead.",
		"",
		"A prop shown as `bind:name` is bindable; `?` marks an optional prop.",
		"",
		...sections,
	].join("\n");
	const config = (await prettier.resolveConfig(outputFile)) ?? {};
	return prettier.format(raw, { ...config, parser: "markdown" });
}

const result = await build();
if (check) {
	const current = await readFile(outputFile, "utf8").catch(() => "");
	if (current !== result) {
		console.error(
			"docs/reference/components.md is out of date: run `pnpm docs:build`.",
		);
		process.exit(1);
	}
	console.log("docs/reference/components.md is up to date.");
} else {
	await mkdir(path.dirname(outputFile), { recursive: true });
	await writeFile(outputFile, result);
	console.log(`wrote ${path.relative(root, outputFile)}`);
}
