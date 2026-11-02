<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/** Turns the label into a button; without it the chip is static. */
		onopen?: () => void;
		/** aria-label of the open button, for when the label text does not describe the action. */
		openLabel?: string;
		/** Shows the remove button and runs on click. */
		onremove?: () => void;
		/** aria-label of the remove button, for example Remove alpha. */
		removeLabel?: string;
		/** Dims the chip and turns the label into a disabled span. */
		unavailable?: boolean;
		/** Title shown while the chip is unavailable, to explain why. */
		hint?: string;
		/** Chip label. */
		children?: Snippet;
		/** Extra classes on the chip. */
		class?: string;
	}

	let {
		onopen,
		openLabel,
		onremove,
		removeLabel,
		unavailable = false,
		hint,
		children,
		class: className = "",
	}: Props = $props();

	const openable = $derived(onopen !== undefined && !unavailable);
</script>

<span
	data-ui="chip"
	class="ui-chip {className}"
	class:is-openable={openable}
	class:is-unavailable={unavailable}
	title={unavailable ? hint : undefined}
>
	{#if openable}
		<button
			type="button"
			class="ui-chip-label"
			aria-label={openLabel}
			onclick={onopen}
		>
			{#if children}{@render children()}{/if}
		</button>
	{:else}
		<span
			class="ui-chip-label"
			aria-disabled={unavailable ? "true" : undefined}
		>
			{#if children}{@render children()}{/if}
		</span>
	{/if}
	{#if onremove}
		<button
			type="button"
			class="ui-chip-remove"
			aria-label={removeLabel}
			onclick={onremove}
		>
			<svg viewBox="0 0 12 12" aria-hidden="true">
				<path d="M3 3l6 6M9 3l-6 6" />
			</svg>
		</button>
	{/if}
</span>

<style>
	.ui-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--ui-space-1);
		max-width: 100%;
		padding: 0 var(--ui-space-2);
		border: 1px solid var(--ui-line-strong);
		border-radius: var(--ui-r-chip);
		background: var(--ui-surface);
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font-mono);
		font-size: var(--ui-fs-xs);
		line-height: 1.75;
		white-space: nowrap;
		vertical-align: middle;
	}

	.ui-chip.is-openable:hover {
		border-color: var(--ui-accent);
	}

	.ui-chip:has(.ui-chip-remove) {
		padding-inline-end: var(--ui-space-1);
	}

	.ui-chip-label {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	button.ui-chip-label {
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}

	button.ui-chip-label:hover {
		color: var(--ui-fg);
		text-decoration: underline;
	}

	.ui-chip-label :global(a) {
		color: inherit;
		text-decoration: none;
	}

	.ui-chip-label :global(a:hover) {
		color: var(--ui-fg);
		text-decoration: underline;
	}

	.ui-chip-label :global(a:focus-visible) {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: 1px;
	}

	.ui-chip-remove {
		display: inline-flex;
		flex: none;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--ui-fg-muted);
		cursor: pointer;
	}

	.ui-chip-remove:hover {
		color: var(--ui-fg);
	}

	.ui-chip-remove:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: 1px;
	}

	.ui-chip-remove svg {
		width: 0.75rem;
		height: 0.75rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
	}

	.ui-chip.is-unavailable {
		border-style: dashed;
		color: var(--ui-fg-muted);
	}

	.ui-chip.is-unavailable .ui-chip-label {
		cursor: not-allowed;
	}
</style>
