<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface Props extends HTMLButtonAttributes {
		/** Pressed state: sets aria-pressed and the active style. */
		active?: boolean;
		/** Chip label. */
		children: Snippet;
		/** Bindable native button element. */
		element?: HTMLButtonElement;
	}

	let {
		active = false,
		type = "button",
		class: className = "",
		children,
		element = $bindable(),
		...rest
	}: Props = $props();
</script>

<button
	{...rest}
	bind:this={element}
	{type}
	aria-pressed={active}
	data-ui="toggle-chip"
	data-active={active || undefined}
	class="ui-toggle-chip {className}"
>
	{@render children()}
</button>

<style>
	.ui-toggle-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--ui-space-2);
		box-sizing: border-box;
		padding: var(--ui-space-1) var(--ui-space-2);
		border: 1px solid var(--ui-line);
		border-radius: var(--ui-r-chip);
		background: var(--ui-surface);
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		line-height: 1.5;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--ui-duration) ease,
			border-color var(--ui-duration) ease,
			color var(--ui-duration) ease;
	}

	.ui-toggle-chip:hover:not(:disabled, [data-active]) {
		background: var(--ui-hover);
		border-color: var(--ui-line-strong);
		color: var(--ui-fg);
	}

	.ui-toggle-chip[data-active] {
		background: color-mix(in oklch, var(--ui-accent) 14%, var(--ui-surface));
		border-color: color-mix(in oklch, var(--ui-accent) 55%, var(--ui-line));
		color: var(--ui-fg);
	}

	.ui-toggle-chip[data-active]:hover:not(:disabled) {
		background: color-mix(in oklch, var(--ui-accent) 22%, var(--ui-surface));
		border-color: var(--ui-accent);
	}

	.ui-toggle-chip:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: var(--ui-focus-ring-offset);
	}

	.ui-toggle-chip:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-toggle-chip {
			transition: none;
		}
	}
</style>
