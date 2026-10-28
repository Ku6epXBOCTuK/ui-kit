<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Variant = "primary" | "secondary" | "ghost" | "danger";
	type Size = "sm" | "md" | "lg";

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		icon?: Snippet;
		iconAfter?: Snippet;
		loading?: boolean;
		children?: Snippet;
	}

	let {
		variant = "secondary",
		size = "md",
		icon,
		iconAfter,
		loading = false,
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
	disabled={disabled || loading}
	aria-busy={loading || undefined}
	data-ui="button"
	data-variant={variant}
	data-size={size}
	class="ui-button {className}"
>
	{#if loading}
		<span class="ui-spinner" aria-hidden="true"></span>
	{:else if icon}
		<span class="ui-button-icon">{@render icon()}</span>
	{/if}
	{#if children}
		<span class="ui-button-label">{@render children()}</span>
	{/if}
	{#if iconAfter && !loading}
		<span class="ui-button-icon">{@render iconAfter()}</span>
	{/if}
</button>

<style>
	.ui-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--ui-space-2);
		box-sizing: border-box;
		height: var(--ui-control-h-md);
		padding: 0 var(--ui-space-4);
		border: var(--ui-line-w) solid transparent;
		border-radius: var(--ui-r-control);
		box-shadow: var(--ui-shadow-control);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-md);
		font-weight: 600;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--ui-duration) ease,
			border-color var(--ui-duration) ease,
			color var(--ui-duration) ease,
			box-shadow var(--ui-duration) ease;
	}

	.ui-button[data-size="sm"] {
		height: var(--ui-control-h-sm);
		padding: 0 var(--ui-space-3);
		font-size: var(--ui-fs-sm);
	}

	.ui-button[data-size="lg"] {
		height: var(--ui-control-h-lg);
		padding: 0 var(--ui-space-5);
		font-size: var(--ui-fs-lg);
	}

	.ui-button[data-variant="primary"] {
		background: var(--ui-accent);
		border-color: var(--ui-accent);
		color: var(--ui-on-accent);
	}

	.ui-button[data-variant="primary"]:hover:not(:disabled) {
		background: var(--ui-accent-hover);
		border-color: var(--ui-accent-hover);
	}

	.ui-button[data-variant="secondary"] {
		background: var(--ui-panel);
		border-color: var(--ui-line);
		color: var(--ui-fg);
	}

	.ui-button[data-variant="secondary"]:hover:not(:disabled) {
		background: var(--ui-hover);
		border-color: var(--ui-line-strong);
	}

	.ui-button[data-variant="ghost"] {
		background: transparent;
		border-color: transparent;
		color: var(--ui-fg-secondary);
	}

	.ui-button[data-variant="ghost"]:hover:not(:disabled) {
		background: var(--ui-hover);
		color: var(--ui-fg);
	}

	.ui-button[data-variant="danger"] {
		background: var(--ui-danger);
		border-color: var(--ui-danger);
		color: var(--ui-on-danger);
	}

	.ui-button[data-variant="danger"]:hover:not(:disabled) {
		background: var(--ui-danger);
		border-color: var(--ui-line-strong);
	}

	.ui-button:focus-visible {
		outline: 2px solid var(--ui-focus);
		outline-offset: 2px;
	}

	.ui-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.ui-button-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: var(--ui-fs-md);
		height: var(--ui-fs-md);
	}

	.ui-spinner {
		flex: none;
		width: var(--ui-fs-md);
		height: var(--ui-fs-md);
		border: var(--ui-line-w) solid currentColor;
		border-right-color: transparent;
		border-radius: var(--ui-r-pill);
		animation: ui-spin 700ms linear infinite;
	}

	@keyframes ui-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-button {
			transition: none;
		}

		.ui-spinner {
			animation-duration: 2s;
		}
	}
</style>
