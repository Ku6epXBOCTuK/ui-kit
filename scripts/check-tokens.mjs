// NOTE: Guards the token contract: both themes define the same set, a dark
// block may only override tokens of its own light block, every var(--ui-*)
// resolves and no hct() reaches a consumer. Exit 1 on any violation.
import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const root = fileURLToPath(new URL("..", import.meta.url));

async function read(path) {
	return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

function blocks(css, theme) {
	const result = { light: new Map(), dark: new Map() };

	postcss.parse(css).walkRules((rule) => {
		const selector = rule.selector.replace(/\s+/g, " ").trim();
		const own =
			theme === "kawaii"
				? selector.includes('data-ui-theme="kawaii"')
				: !selector.includes('data-ui-theme="kawaii"') && selector.includes(":root");
		if (!own) return;

		const dark = selector.includes('data-ui-mode="dark"');
		const target = dark ? result.dark : result.light;
		rule.walkDecls((decl) => {
			if (decl.prop.startsWith("--ui-")) target.set(decl.prop, decl.value);
		});
	});

	return result;
}

function diff(actual, expected, label) {
	return [...expected].filter((name) => !actual.has(name)).map((name) => `${label}: missing ${name}`);
}

async function sources(dir) {
	const entries = await readdir(new URL(`../${dir}`, import.meta.url), { withFileTypes: true });
	const found = [];
	for (const entry of entries) {
		const path = `${dir}/${entry.name}`;
		if (entry.isDirectory()) found.push(...(await sources(path)));
		else if (/\.(svelte|css|ts|html|mjs)$/.test(entry.name)) found.push(path);
	}
	return found;
}

async function exists(path) {
	try {
		await stat(new URL(`../${path}`, import.meta.url));
		return true;
	} catch {
		return false;
	}
}

const tool = blocks(await read("tokens/tool.css"), "tool");
const kawaii = blocks(await read("tokens/kawaii.css"), "kawaii");

const errors = [];

for (const [label, theme] of Object.entries({ tool, kawaii })) {
	if (theme.light.size === 0) errors.push(`${label}: no light tokens found`);
	errors.push(...diff(theme.light, theme.dark.keys(), `${label} dark`));
}

const contract = new Set(tool.light.keys());
errors.push(...diff(kawaii.light, contract, "kawaii light"));
for (const name of kawaii.light.keys()) {
	if (!contract.has(name)) errors.push(`kawaii light: extra ${name}`);
}

const files = [...(await sources("tokens")), "tokens.css"];
if (await exists("src")) files.push(...(await sources("src")));
if (await exists("preview")) files.push(...(await sources("preview")));

let references = 0;
for (const file of files) {
	const css = await read(file);
	if (/\bhct\(/.test(css) && !file.endsWith(".src.css")) {
		errors.push(`${file}: hct() leaks into a shipped file`);
	}
	for (const match of css.matchAll(/var\(\s*(--ui-[\w-]+)/g)) {
		references += 1;
		if (!contract.has(match[1])) errors.push(`${file}: undefined ${match[1]}`);
	}
}

if (errors.length > 0) {
	console.log(errors.join("\n"));
	process.exitCode = 1;
} else {
	console.log(
		`Token contract: ${contract.size} tokens, themes in parity, ${references} references resolved.`,
	);
}
