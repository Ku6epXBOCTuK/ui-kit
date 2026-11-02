<script lang="ts">
	import { createTagInput } from "../headless/tags.svelte.ts";
	import Chip from "./Chip.svelte";
	import Select from "./Select.svelte";

	interface Props {
		/** The chosen tags. Not bindable: the caller owns the list. */
		value: string[];
		/** Called with a new array after every add, remove or reorder. */
		onchange: (tags: string[]) => void;
		/** Tags offered in the dropdown. */
		suggestions?: string[];
		/** Number shown next to a suggestion, keyed by tag. */
		counts?: Record<string, number>;
		/** Called for every committed tag outside suggestions; awaited, so it can fetch the tag. */
		onunknown?: (tag: string) => Promise<unknown> | void;
		/** Returns an error message for a tag to reject, or null; the message shows under the input. */
		validate?: (tag: string) => string | null;
		/** Lowercases tags before they are added. */
		lowercase?: boolean;
		/** Placeholder of the text input. */
		placeholder?: string;
		/** aria-label of the text input and the suggestion list. */
		ariaLabel?: string;
		/** Id of the text input, for pairing with a label. */
		id?: string;
		/** Blocks typing, removing and reordering, and dims the chips. */
		disabled?: boolean;
		/** Marks the input and the trigger invalid. */
		invalid?: boolean;
		/** Lets chips be dragged into a new order. */
		reorderable?: boolean;
		/** Clicking a chip copies its tag to the clipboard. */
		copyable?: boolean;
		/** aria-label of the copy button, called with the tag. */
		copyLabel?: (tag: string) => string;
		/** Text shown for a moment after a copy. */
		copiedLabel?: string;
		/** Opens all suggestions on focus; otherwise the list waits for typed text. */
		showAll?: boolean;
		/** filter is inline, field fills the width. */
		variant?: "filter" | "field";
		/** Extra classes on the root. */
		class?: string;
	}

	let {
		value,
		onchange,
		suggestions = [],
		counts = {},
		onunknown,
		validate,
		lowercase = true,
		placeholder = "Add tags",
		ariaLabel = "Tags",
		id,
		disabled = false,
		invalid = false,
		reorderable = false,
		copyable = false,
		copyLabel = (tag: string) => `Copy ${tag}`,
		copiedLabel = "Copied",
		showAll = true,
		variant = "field",
		class: className = "",
	}: Props = $props();

	const COPIED_MS = 900;

	const tags = createTagInput({
		value: () => value,
		suggestions: () => suggestions,
		onChange: (next) => onchange(next),
		onUnknown: (tag) => onunknown?.(tag),
		lowercase: () => lowercase,
		validate: () => validate,
	});

	let input = $state<HTMLInputElement | null>(null);
	let dragIndex = $state<number | null>(null);
	let copied = $state("");

	const uid = $props.id();
	const listId = `${uid}-list`;

	const needle = $derived(tags.select.query.trim().toLowerCase());

	const typed = $derived(tags.normalize(tags.text));
	const problem = $derived(
		typed === "" || validate === undefined ? null : validate(typed),
	);

	function focusInput() {
		input?.focus();
		if (showAll || tags.text !== "") tags.select.show();
	}

	function onfocus() {
		if (showAll || tags.text !== "") tags.select.show();
	}

	function oninput(event: Event & { currentTarget: HTMLInputElement }) {
		tags.setText(event.currentTarget.value);
	}

	function onkeydown(event: KeyboardEvent) {
		const handled = tags.handleKeydown(event);
		if (handled) event.preventDefault();
		return handled;
	}

	function startDrag(event: DragEvent, index: number) {
		dragIndex = index;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.setData("text/plain", value[index] ?? "");
		}
	}

	function dropAt(event: DragEvent, index: number) {
		event.preventDefault();
		const from = dragIndex;
		dragIndex = null;
		if (from !== null) tags.move(from, index);
	}

	async function copy(tag: string) {
		try {
			await navigator.clipboard.writeText(tag);
			copied = tag;
			setTimeout(() => {
				if (copied === tag) copied = "";
			}, COPIED_MS);
		} catch {
			copied = "";
		}
	}

	$effect(() => {
		if (!showAll && tags.text.trim() === "") tags.select.hide();
	});
</script>

{#snippet trigger()}
	<div
		class="ui-select-trigger ui-tag-trigger"
		class:is-invalid={invalid}
		class:is-disabled={disabled}
		data-ui="tag-input"
		role="presentation"
		onpointerdown={(event) => {
			if (event.target === event.currentTarget) {
				event.preventDefault();
				if (!disabled) focusInput();
			}
		}}
	>
		{#if value.length > 0}
			<ul class="ui-tag-chips">
				{#each value as tag, index (tag)}
					<li
						class="ui-tag-slot"
						class:is-dragging={dragIndex === index}
						draggable={reorderable && !disabled ? "true" : "false"}
						ondragstart={(event) => startDrag(event, index)}
						ondragover={(event) => {
							if (reorderable) event.preventDefault();
						}}
						ondrop={(event) => dropAt(event, index)}
						ondragend={() => {
							dragIndex = null;
						}}
					>
						<Chip
							onopen={copyable && !disabled ? () => void copy(tag) : undefined}
							openLabel={copyLabel(tag)}
							onremove={disabled
								? undefined
								: () => {
										tags.remove(tag);
										focusInput();
									}}
							removeLabel={`Remove ${tag}`}
							unavailable={disabled}
						>
							{copied === tag ? copiedLabel : tag}
						</Chip>
					</li>
				{/each}
			</ul>
		{/if}
		<input
			class="ui-tag-input"
			bind:this={input}
			{id}
			value={tags.text}
			{disabled}
			{placeholder}
			{oninput}
			{onfocus}
			aria-label={ariaLabel}
			role="combobox"
			aria-expanded={tags.select.open}
			aria-controls={tags.select.open ? listId : undefined}
			aria-autocomplete="list"
			aria-invalid={invalid}
			autocomplete="off"
		/>
	</div>
	{#if problem}
		<p class="ui-tag-error" role="alert">{problem}</p>
	{/if}
{/snippet}

{#snippet option(tag: string)}
	{@const at = needle === "" ? -1 : tag.toLowerCase().indexOf(needle)}
	<span class="ui-select-option-label">
		{#if at < 0}
			{tag}
		{:else}
			{tag.slice(0, at)}<mark class="ui-tag-mark"
				>{tag.slice(at, at + needle.length)}</mark
			>{tag.slice(at + needle.length)}
		{/if}
	</span>
	{#if counts[tag] !== undefined}
		<span class="ui-select-option-count">{counts[tag]}</span>
	{/if}
{/snippet}

<div
	class="ui-tag"
	onpointerdowncapture={(event) => {
		const target = event.target as HTMLElement | null;
		if (target?.closest('[role="option"]') !== null) event.preventDefault();
	}}
>
	<Select
		select={tags.select}
		getKey={(tag) => tag}
		{trigger}
		{option}
		{onkeydown}
		{variant}
		multiselect
		listLabel={ariaLabel}
		{listId}
		emptyLabel={tags.text.trim() === ""
			? "No tags yet"
			: `Add "${tags.text.trim()}"`}
		class={className}
	/>
</div>

<style>
	.ui-tag {
		display: block;
		width: 100%;
	}

	.ui-tag-trigger {
		height: auto;
		min-height: var(--ui-control-h-md);
		flex-wrap: wrap;
		gap: var(--ui-space-1) var(--ui-space-2);
		padding: var(--ui-space-1) var(--ui-space-2);
		cursor: text;
	}

	.ui-tag-trigger.is-invalid {
		border-color: var(--ui-danger);
	}

	.ui-tag-trigger.is-disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.ui-tag-chips {
		display: contents;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.ui-tag-slot {
		display: inline-flex;
	}

	.ui-tag-slot.is-dragging {
		opacity: 0.4;
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

	.ui-tag-error {
		margin: var(--ui-space-1) 0 0;
		color: var(--ui-danger);
		font-size: var(--ui-fs-sm);
	}

	:global(.ui-tag-mark) {
		color: var(--ui-accent-ink);
		background: transparent;
	}
</style>
