import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	root: "gallery",
	plugins: [svelte()],
	server: {
		port: 4322,
		fs: { allow: [".."] },
	},
});
