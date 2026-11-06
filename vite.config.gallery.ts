import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
	root: "gallery",
	base: command === "build" ? "./" : "/",
	plugins: [svelte()],
	build: {
		outDir: "../.gallery-dist",
		emptyOutDir: true,
	},
	server: {
		port: 4322,
		fs: { allow: [".."] },
	},
}));
