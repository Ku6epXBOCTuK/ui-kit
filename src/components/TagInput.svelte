<script lang="ts">
	import { createTagInput } from "../headless/tags.svelte.ts";
	import Chip from "./Chip.svelte";
	import Select from "./Select.svelte";

	interface Props {
		value: string[];
		onchange: (tags: string[]) => void;
		suggestions?: string[];
		counts?: Record<string, number>;
		onunknown?: (tag: string) => Promise<unknown> | void;
		placeholder?: string;
		ariaLabel?: string;
		variant?: "filter" | "field";
		class?: string;
	}

	let {
		value,
		onchange,
		suggestions = [],
		counts = {},
		onunknown,
		placeholder = "Add tags",
		ariaLabel = "Tags",
		variant = "field",
		class: className = "",
	}: Props = $props();

	const tags = createTagInput({
		value: () => value,
		suggestions: () => suggestions,
		onChange: (next) => onchange(next),
		onUnknown: (tag) => onunknown?.(tag),
	});

	let input = $state<HTMLInputElement | null>(null);

	const uid = $props.id();
	const listId = `${uid}-list`;

	function focusInput() {
		input?.focus();
		tags.select.show();
	}
</script>

{#snippet trigger()}
	<div
		class="ui-select-trigger ui-tag-trigger"
		role="presentation"
		onpointerdown={(event) => {
			if (event.target !== input) {
				event.preventDefault();
				focusInput();
			}
		}}
	>
		{#each value as tag (tag)}
			<Chip
				removeLabel={`Remove ${tag}`}
				onremove={() => {
					tags.remove(tag);
					focusInput();
				}}
			>
				{tag}
			</Chip>
		{/each}
		<input
			class="ui-tag-input"
			bind:this={input}
			value={tags.text}
			oninput={(event) => tags.setText(event.currentTarget.value)}
			onfocus={() => tags.select.show()}
			{placeholder}
			aria-label={ariaLabel}
			role="combobox"
			aria-expanded={tags.select.open}
			aria-controls={tags.select.open ? listId : undefined}
			aria-autocomplete="list"
			autocomplete="off"
		/>
	</div>
{/snippet}

{#snippet option(tag: string)}
	<span class="ui-select-option-label">{tag}</span>
	{#if counts[tag] !== undefined}
		<span class="ui-select-option-count">{counts[tag]}</span>
	{/if}
{/snippet}

<Select
	select={tags.select}
	getKey={(tag) => tag}
	{trigger}
	{option}
	onkeydown={tags.handleKeydown}
	{variant}
	multiselect
	listLabel={ariaLabel}
	{listId}
	emptyLabel={tags.text.trim() === ""
		? "No tags yet"
		: `Add "${tags.text.trim()}"`}
	class={className}
/>

<style>
	.ui-tag-trigger {
		height: auto;
		min-height: var(--ui-control-h-md);
		flex-wrap: wrap;
		gap: var(--ui-space-1) var(--ui-space-2);
		padding: var(--ui-space-1) var(--ui-space-2);
		cursor: text;
	}

	.ui-tag-input {
		flex: 1 1 5rem;
		min-width: 5rem;
		height: var(--ui-control-h-sm);
		margin: 0;
		padding: 0 var(--ui-space-1);
		border: 0;
		appearance: none;
		background: transparent;
		color: var(--ui-fg);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		outline: none;
	}

	.ui-tag-input::placeholder {
		color: var(--ui-fg-muted);
	}
</style>
