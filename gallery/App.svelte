<script lang="ts">
	import FormPage from "./FormPage.svelte";
	import Pane from "./Pane.svelte";
	import Specimen from "./Specimen.svelte";

	const themes = ["tool", "kawaii"] as const;
	const modes = ["light", "dark"] as const;

	let page = $state<"specimen" | "form">("specimen");
</script>

<header class="gallery-head">
	<h1>UI kit gallery</h1>
	<p>
		Every component from
		<code>@ku6epxboctuk/ui-kit</code>
		in the tool and kawaii themes, light and dark.
	</p>
	<p class="gallery-links">
		<a href="https://www.npmjs.com/package/@ku6epxboctuk/ui-kit">npm</a>
		<a
			href="https://github.com/Ku6epXBOCTuK/ui-kit/blob/main/docs/reference/components.md"
		>
			Component reference
		</a>
		<a href="https://github.com/Ku6epXBOCTuK/ui-kit">GitHub</a>
	</p>
</header>

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

<p class="gallery-note">
	{page === "specimen"
		? "Controls, tones and states, side by side across the themes."
		: "A form assembled only from the kit's components."}
</p>

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
	.gallery-head {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 24px 16px 0;
	}

	.gallery-head h1 {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.gallery-head p {
		max-width: 72ch;
		margin: 0;
		color: #a4a4ae;
		font-size: 13px;
		line-height: 1.5;
	}

	.gallery-head code {
		color: #d6d6de;
		font-family: ui-monospace, monospace;
		font-size: 12px;
	}

	.gallery-links {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.gallery-links a {
		color: #8ab4ff;
		text-decoration: none;
	}

	.gallery-links a:hover {
		text-decoration: underline;
	}

	.gallery-links a:focus-visible,
	.gallery-nav button:focus-visible {
		outline: 2px solid #8ab4ff;
		outline-offset: 2px;
	}

	.gallery-note {
		margin: 0;
		padding: 8px 16px 0;
		color: #8b8b96;
		font-size: 12px;
	}

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
</style>
