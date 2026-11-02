<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<
		HTMLInputAttributes,
		"type" | "value" | "checked"
	> {
		/** Bindable checked state. */
		checked?: boolean;
	}

	let {
		checked = $bindable(false),
		class: className = "",
		...rest
	}: Props = $props();
</script>

<input
	{...rest}
	type="checkbox"
	bind:checked
	data-ui="checkbox"
	class="ui-checkbox {className}"
/>

<style>
	.ui-checkbox {
		flex: none;
		width: 1.1em;
		height: 1.1em;
		margin: 0;
		accent-color: var(--ui-accent-ink);
		cursor: pointer;
	}

	.ui-checkbox:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: var(--ui-focus-ring-offset);
	}

	.ui-checkbox:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
