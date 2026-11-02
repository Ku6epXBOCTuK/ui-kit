<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		id?: string;
		orientation?: "stack" | "row";
		children: Snippet<[string]>;
		class?: string;
	}

	let {
		label,
		hint,
		error,
		required = false,
		id,
		orientation = "stack",
		children,
		class: className = "",
	}: Props = $props();

	const fallbackId = $props.id();
	const controlId = $derived(id ?? fallbackId);
</script>

<div
	class="ui-field {className}"
	data-ui="field"
	data-orientation={orientation}
	data-invalid={error ? true : undefined}
>
	{#if label}
		<label class="ui-field-label" for={controlId}>
			{label}
			{#if required}<span class="ui-field-required" aria-hidden="true">*</span
				>{/if}
		</label>
	{/if}
	{@render children(controlId)}
	{#if error}
		<p class="ui-field-message" data-tone="error">{error}</p>
	{:else if hint}
		<p class="ui-field-message">{hint}</p>
	{/if}
</div>

<style>
	.ui-field {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-1);
		min-width: 0;
	}

	.ui-field[data-orientation="row"] {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: var(--ui-space-3);
		row-gap: var(--ui-space-1);
	}

	.ui-field[data-orientation="row"] > .ui-field-message {
		grid-column: 1 / -1;
	}

	.ui-field-label {
		display: inline-flex;
		align-items: baseline;
		gap: var(--ui-space-1);
		font-family: var(--ui-label-font);
		font-size: var(--ui-fs-xs);
		font-weight: 600;
		line-height: var(--ui-lh);
		letter-spacing: var(--ui-label-track);
		text-transform: var(--ui-label-transform);
		color: var(--ui-fg-secondary);
	}

	.ui-field[data-invalid] .ui-field-label {
		color: var(--ui-danger);
	}

	.ui-field-required {
		color: var(--ui-danger);
	}

	.ui-field-message {
		margin: 0;
		font-family: var(--ui-font);
		font-size: var(--ui-fs-xs);
		line-height: var(--ui-lh);
		color: var(--ui-fg-muted);
	}

	.ui-field-message[data-tone="error"] {
		color: var(--ui-danger);
	}
</style>
