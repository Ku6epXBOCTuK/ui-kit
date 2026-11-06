<script lang="ts">
	import FormPage from "./FormPage.svelte";
	import Pane from "./Pane.svelte";
	import Specimen from "./Specimen.svelte";

	const themes = ["tool", "kawaii"] as const;
	const modes = ["light", "dark"] as const;

	let page = $state<"specimen" | "form">("specimen");
</script>

<nav class="gallery-nav" aria-label="Gallery page">
	<button
		type="button"
		class:active={page === "specimen"}
		onclick={() => (page = "specimen")}
	>
		Specimen
	</button>
	<button
		type="button"
		class:active={page === "form"}
		onclick={() => (page = "form")}
	>
		Form
	</button>
</nav>

<div class="gallery">
	{#each themes as theme (theme)}
		<div class="pair">
			{#each modes as mode (mode)}
				<Pane {theme} {mode}>
					{#if page === "specimen"}
						<Specimen />
					{:else}
						<FormPage />
					{/if}
				</Pane>
			{/each}
		</div>
	{/each}
</div>

<style>
	.gallery-nav {
		display: flex;
		gap: 8px;
		padding: 16px 16px 0;
	}

	.gallery-nav button {
		padding: 6px 12px;
		border: 1px solid #2c2c33;
		border-radius: 6px;
		background: #1c1c22;
		color: #8b8b96;
		font: inherit;
		font-size: 13px;
		cursor: pointer;
	}

	.gallery-nav button.active {
		border-color: #6c6c7a;
		background: #26262e;
		color: #e6e6e6;
	}

	.gallery-nav button:focus-visible {
		outline: 2px solid #8ab4ff;
		outline-offset: 2px;
	}
</style>
