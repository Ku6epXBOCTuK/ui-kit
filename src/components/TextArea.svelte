<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLTextareaAttributes, "value"> {
		/** Bindable text. */
		value?: string;
		/** Marks the textarea invalid. */
		invalid?: boolean;
		/** Uses the monospace face. */
		mono?: boolean;
	}

	let {
		value = $bindable(""),
		invalid = false,
		mono = false,
		class: className = "",
		...rest
	}: Props = $props();
</script>

<textarea
	{...rest}
	bind:value
	aria-invalid={invalid || undefined}
	data-ui="textarea"
	data-mono={mono || undefined}
	class="ui-textarea {className}"
></textarea>

<style>
	.ui-textarea {
		display: block;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		padding: var(--ui-space-3);
		border: var(--ui-line-w) solid var(--ui-line);
		border-radius: var(--ui-r-control);
		background: var(--ui-field);
		color: var(--ui-fg);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-md);
		line-height: var(--ui-lh);
		resize: vertical;
		transition:
			border-color var(--ui-duration) ease,
			background-color var(--ui-duration) ease;
	}

	.ui-textarea[data-mono] {
		font-family: var(--ui-font-mono);
	}

	.ui-textarea::placeholder {
		color: var(--ui-fg-muted);
	}

	.ui-textarea:hover:not(:disabled):not(:focus) {
		border-color: var(--ui-line-strong);
	}

	.ui-textarea:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: -1px;
		border-color: var(--ui-line-strong);
	}

	.ui-textarea[aria-invalid="true"] {
		border-color: var(--ui-danger);
	}

	.ui-textarea[aria-invalid="true"]:focus-visible {
		outline-color: var(--ui-danger);
	}

	.ui-textarea:disabled {
		background: var(--ui-bg-muted);
		color: var(--ui-fg-muted);
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-textarea {
			transition: none;
		}
	}
</style>
