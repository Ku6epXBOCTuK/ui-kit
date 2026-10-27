<script lang="ts">
	import Pane from "./Pane.svelte";
	import Specimen from "./Specimen.svelte";

	const combos = [
		{ theme: "tool", mode: "light" },
		{ theme: "tool", mode: "dark" },
		{ theme: "kawaii", mode: "light" },
		{ theme: "kawaii", mode: "dark" },
	] as const;
</script>

<div class="gallery">
	{#each combos as combo (combo.theme + combo.mode)}
		<Pane theme={combo.theme} mode={combo.mode}>
			<Specimen />
		</Pane>
	{/each}
</div>
