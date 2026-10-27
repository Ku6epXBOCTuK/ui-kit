<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Variant = "ghost" | "secondary" | "danger";
	type Size = "sm" | "md" | "lg";

	interface Props extends HTMLButtonAttributes {
		label: string;
		variant?: Variant;
		size?: Size;
		active?: boolean;
		children: Snippet;
	}

	let {
		label,
		variant = "ghost",
		size = "md",
		active = false,
		disabled = false,
		type = "button",
		class: className = "",
		children,
		...rest
	}: Props = $props();
</script>

<button
	{...rest}
	{type}
	{disabled}
	aria-label={label}
	aria-pressed={active || undefined}
	data-ui="icon-button"
	data-variant={variant}
	data-size={size}
	data-active={active || undefined}
	class="ui-icon-button {className}"
>
	{@render children()}
</button>

<style>
	.ui-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: var(--ui-control-h-md);
		height: var(--ui-control-h-md);
		padding: 0;
		border: var(--ui-line-w) solid transparent;
		border-radius: var(--ui-r-control);
		background: transparent;
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-md);
		line-height: 1;
		cursor: pointer;
		transition:
			background-color var(--ui-duration) ease,
			border-color var(--ui-duration) ease,
			color var(--ui-duration) ease;
	}

	.ui-icon-button :global(svg) {
		width: 1.15em;
		height: 1.15em;
	}

	.ui-icon-button[data-size="sm"] {
		width: var(--ui-control-h-sm);
		height: var(--ui-control-h-sm);
		font-size: var(--ui-fs-sm);
	}

	.ui-icon-button[data-size="lg"] {
		width: var(--ui-control-h-lg);
		height: var(--ui-control-h-lg);
		font-size: var(--ui-fs-lg);
	}

	.ui-icon-button:hover:not(:disabled) {
		background: var(--ui-hover);
		color: var(--ui-fg);
	}

	.ui-icon-button[data-active] {
		background: var(--ui-selected);
		border-color: var(--ui-line-strong);
		color: var(--ui-fg);
	}

	.ui-icon-button[data-variant="secondary"] {
		background: var(--ui-panel);
		border-color: var(--ui-line);
		color: var(--ui-fg);
	}

	.ui-icon-button[data-variant="secondary"]:hover:not(:disabled) {
		border-color: var(--ui-line-strong);
	}

	.ui-icon-button[data-variant="danger"]:hover:not(:disabled) {
		background: var(--ui-danger-surface);
		color: var(--ui-danger);
	}

	.ui-icon-button:focus-visible {
		outline: 2px solid var(--ui-focus);
		outline-offset: 2px;
	}

	.ui-icon-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-icon-button {
			transition: none;
		}
	}
</style>
