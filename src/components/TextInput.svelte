<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	type Size = "sm" | "md" | "lg";

	interface Props extends Omit<HTMLInputAttributes, "size" | "value"> {
		value?: string;
		size?: Size;
		invalid?: boolean;
	}

	let {
		value = $bindable(""),
		size = "md",
		invalid = false,
		type = "text",
		class: className = "",
		...rest
	}: Props = $props();
</script>

<input
	{...rest}
	{type}
	bind:value
	aria-invalid={invalid || undefined}
	data-ui="input"
	data-size={size}
	class="ui-input {className}"
/>

<style>
	.ui-input {
		display: block;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		height: var(--ui-control-h-md);
		padding: 0 var(--ui-space-3);
		border: var(--ui-line-w) solid var(--ui-line);
		border-radius: var(--ui-r-control);
		background: var(--ui-field);
		color: var(--ui-fg);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-md);
		line-height: var(--ui-lh);
		transition:
			border-color var(--ui-duration) ease,
			background-color var(--ui-duration) ease;
	}

	.ui-input[data-size="sm"] {
		height: var(--ui-control-h-sm);
		padding: 0 var(--ui-space-2);
		font-size: var(--ui-fs-sm);
	}

	.ui-input[data-size="lg"] {
		height: var(--ui-control-h-lg);
		padding: 0 var(--ui-space-4);
		font-size: var(--ui-fs-lg);
	}

	.ui-input::placeholder {
		color: var(--ui-fg-muted);
	}

	.ui-input:hover:not(:disabled):not(:focus) {
		border-color: var(--ui-line-strong);
	}

	.ui-input:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: -1px;
		border-color: var(--ui-line-strong);
	}

	.ui-input[aria-invalid="true"] {
		border-color: var(--ui-danger);
	}

	.ui-input[aria-invalid="true"]:focus-visible {
		outline-color: var(--ui-danger);
	}

	.ui-input:disabled {
		background: var(--ui-bg-muted);
		color: var(--ui-fg-muted);
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-input {
			transition: none;
		}
	}
</style>
