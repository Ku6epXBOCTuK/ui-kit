<script lang="ts">
	import ToggleChip from "./ToggleChip.svelte";

	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		/** Chips in display order. */
		options: Option[];
		/** Bindable selected values. */
		value?: string[];
		/** Label of the select-all chip; no chip when omitted. */
		allLabel?: string;
		/** Accessible name of the group. */
		label: string;
		/** Disables every chip. */
		disabled?: boolean;
		/** Called with the new selection. */
		onchange?: (value: string[]) => void;
		/** Extra classes on the group. */
		class?: string;
	}

	let {
		options,
		value = $bindable([]),
		allLabel,
		label,
		disabled = false,
		onchange,
		class: className = "",
	}: Props = $props();

	const allActive = $derived(
		options.length > 0 &&
			options.every((option) => value.includes(option.value)),
	);

	function commit(next: string[]) {
		value = next;
		onchange?.(next);
	}

	function toggle(option: Option) {
		if (disabled) return;
		const next = value.includes(option.value)
			? value.filter((item) => item !== option.value)
			: [...value, option.value];
		commit(
			options
				.filter((item) => next.includes(item.value))
				.map((item) => item.value),
		);
	}

	function toggleAll() {
		if (disabled || options.length === 0) return;
		commit(allActive ? [] : options.map((option) => option.value));
	}
</script>

<div
	class="ui-filter-chips {className}"
	role="group"
	aria-label={label}
	data-ui="filter-chips"
>
	{#if allLabel}
		<ToggleChip active={allActive} {disabled} onclick={toggleAll}>
			{allLabel}
		</ToggleChip>
	{/if}
	{#each options as option (option.value)}
		<ToggleChip
			active={value.includes(option.value)}
			{disabled}
			onclick={() => toggle(option)}
		>
			{option.label}
		</ToggleChip>
	{/each}
</div>

<style>
	.ui-filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ui-space-1);
	}
</style>
