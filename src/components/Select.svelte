<script lang="ts" generics="T">
	import { placePopover } from "../headless/popover.svelte.ts";
	import type { Select } from "../headless/select.svelte.ts";
	import type { Snippet } from "svelte";

	type Size = "sm" | "md" | "lg";

	interface Props {
		/** State and behaviour from createSelect. */
		select: Select<T>;
		/** Stable key of an item, used by the keyed each. */
		getKey: (item: T) => string | number;
		/** Your trigger markup; the list opens when select.open turns true. */
		trigger: Snippet;
		/** Snippet for one option, called with the item. */
		option: Snippet<[T]>;
		/** Snippet under the list, for actions such as Clear. */
		footer?: Snippet;
		/** Whether an item shows as selected; defaults to none. */
		isSelected?: (item: T) => boolean;
		/** Runs before the machine's keyboard handling; return true to mark the key handled. */
		onkeydown?: (event: KeyboardEvent) => boolean;
		/** Shows a search input at the top of the list and focuses it on open. */
		searchable?: boolean;
		/** Placeholder and aria-label of the search input. */
		searchPlaceholder?: string;
		/** Text shown when nothing matches the query. */
		emptyLabel?: string;
		/** aria-label of the listbox. */
		listLabel?: string;
		/** Id of the listbox, so a trigger can point at it with aria-controls. */
		listId?: string;
		/** Tells assistive tech that several items can be selected. */
		multiselect?: boolean;
		/** filter is inline, field fills the width like an input. */
		variant?: "filter" | "field";
		/** sm, md or lg trigger height. */
		size?: Size;
		/** Extra classes on the root. */
		class?: string;
	}

	let {
		select,
		getKey,
		trigger,
		option,
		footer,
		isSelected = () => false,
		onkeydown,
		searchable = false,
		searchPlaceholder = "Search",
		emptyLabel = "Nothing found",
		listLabel = "Options",
		listId,
		multiselect = false,
		variant = "filter",
		size = "md",
		class: className = "",
	}: Props = $props();

	let root = $state<HTMLElement | null>(null);
	let popover = $state<HTMLDivElement | null>(null);
	let searchInput = $state<HTMLInputElement | null>(null);
	let list = $state<HTMLDivElement | null>(null);
	let focusBeforeOpen: HTMLElement | null = null;

	const baseId = $props.id();
	const resolvedListId = $derived(listId ?? `${baseId}-listbox`);
	const activeOptionId = $derived(
		select.open && select.activeIndex >= 0
			? `${baseId}-option-${select.activeIndex}`
			: undefined,
	);

	function isPrintable(event: KeyboardEvent): boolean {
		return (
			event.key.length === 1 &&
			!event.ctrlKey &&
			!event.metaKey &&
			!event.altKey
		);
	}

	function place() {
		if (popover === null || root === null) return;

		popover.style.minWidth = `${root.offsetWidth}px`;

		const point = placePopover(
			root.getBoundingClientRect(),
			{ width: popover.offsetWidth, height: popover.offsetHeight },
			{ width: window.innerWidth, height: window.innerHeight },
			{ placement: "start" },
		);

		popover.style.top = `${point.top}px`;
		popover.style.left = `${point.left}px`;
	}

	function handleKeydown(event: KeyboardEvent) {
		const handled =
			onkeydown?.(event) ||
			select.handleKeydown(event) ||
			(!searchable && isPrintable(event) && select.typeahead(event.key));
		if (handled) event.preventDefault();
	}

	$effect(() => {
		if (popover === null) return;

		if (!select.open) {
			if (popover.matches(":popover-open")) popover.hidePopover();
			const current = document.activeElement;
			if (
				focusBeforeOpen !== null &&
				(current === null ||
					current === document.body ||
					root?.contains(current))
			) {
				focusBeforeOpen.focus({ preventScroll: true });
			}
			focusBeforeOpen = null;
			return;
		}

		if (focusBeforeOpen === null) {
			focusBeforeOpen =
				document.activeElement instanceof HTMLElement
					? document.activeElement
					: null;
		}

		if (!popover.matches(":popover-open")) popover.showPopover();
		place();
		if (searchable) searchInput?.focus({ preventScroll: true });
		else list?.focus({ preventScroll: true });

		window.addEventListener("resize", place);
		window.addEventListener("scroll", place, true);
		const observer = new ResizeObserver(() => place());
		observer.observe(popover);

		return () => {
			window.removeEventListener("resize", place);
			window.removeEventListener("scroll", place, true);
			observer.disconnect();
		};
	});

	$effect(() => {
		if (popover === null || !select.open) return;

		const active = select.active;
		if (active === null) return;

		const element = popover.querySelector('[data-active="true"]');
		element?.scrollIntoView({ block: "nearest" });
	});

	$effect(() => {
		if (!select.open) return;

		function onPointerDown(event: PointerEvent) {
			if (root !== null && !root.contains(event.target as Node)) select.hide();
		}

		function onKeydown(event: KeyboardEvent) {
			if (event.key !== "Escape") return;
			select.hide();
			event.stopPropagation();
		}

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeydown);

		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeydown);
		};
	});
</script>

<div
	class="ui-select {className}"
	data-ui="select"
	data-variant={variant}
	data-size={size}
	role="presentation"
	bind:this={root}
	onkeydown={handleKeydown}
>
	{@render trigger()}
	<div class="ui-select-popover" popover="manual" bind:this={popover}>
		{#if select.open}
			{#if searchable}
				<input
					class="ui-select-search"
					bind:this={searchInput}
					value={select.query}
					oninput={(event) => select.setQuery(event.currentTarget.value)}
					placeholder={searchPlaceholder}
					aria-label={searchPlaceholder}
					role="combobox"
					aria-expanded={select.open}
					aria-controls={resolvedListId}
					aria-autocomplete="list"
					aria-activedescendant={activeOptionId}
					autocomplete="off"
				/>
			{/if}
			<div
				class="ui-select-list"
				id={resolvedListId}
				bind:this={list}
				role="listbox"
				aria-label={listLabel}
				aria-multiselectable={multiselect}
				tabindex={searchable ? undefined : -1}
				aria-activedescendant={searchable ? undefined : activeOptionId}
			>
				{#if select.filtered.length === 0}
					<p class="ui-select-empty">{emptyLabel}</p>
				{:else}
					{#each select.filtered as item, index (getKey(item))}
						<button
							type="button"
							id={`${baseId}-option-${index}`}
							role="option"
							class="ui-select-option"
							data-active={select.active === item}
							aria-selected={isSelected(item)}
							onclick={() => select.pick(item)}
							onpointermove={() => select.moveTo(index)}
						>
							{@render option(item)}
						</button>
					{/each}
				{/if}
			</div>
			{#if footer}
				<div class="ui-select-footer">
					{@render footer()}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.ui-select {
		position: relative;
		display: inline-flex;
		min-width: 0;
	}

	.ui-select[data-variant="field"] {
		display: block;
		width: 100%;
	}

	:global(.ui-select-trigger) {
		display: inline-flex;
		align-items: center;
		gap: var(--ui-space-2);
		box-sizing: border-box;
		width: 100%;
		height: var(--ui-control-h-md);
		padding: 0 var(--ui-space-3);
		border: var(--ui-line-w) solid var(--ui-line-strong);
		border-radius: var(--ui-r-control);
		background: transparent;
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-md);
		line-height: 1;
		text-align: left;
		cursor: pointer;
	}

	.ui-select[data-size="sm"] :global(.ui-select-trigger) {
		height: var(--ui-control-h-sm);
		font-size: var(--ui-fs-sm);
	}

	.ui-select[data-size="lg"] :global(.ui-select-trigger) {
		height: var(--ui-control-h-lg);
		font-size: var(--ui-fs-lg);
	}

	:global(.ui-select-trigger:hover:not(:disabled)) {
		background: var(--ui-hover);
		color: var(--ui-fg);
	}

	:global(.ui-select-trigger:focus-visible),
	:global(.ui-select-trigger[aria-expanded="true"]) {
		border-color: var(--ui-accent);
		color: var(--ui-fg);
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: var(--ui-focus-ring-offset);
	}

	:global(.ui-select-trigger:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.ui-select-trigger > svg) {
		flex: none;
		width: 1rem;
		height: 1rem;
		color: var(--ui-fg-muted);
	}

	:global(.ui-select-trigger-label) {
		flex: 1 1 auto;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.ui-select-trigger-caret) {
		display: inline-flex;
		flex: none;
		margin-left: auto;
		color: var(--ui-fg-muted);
	}

	:global(.ui-select-trigger-caret svg) {
		width: 1rem;
		height: 1rem;
	}

	:global(.ui-select-trigger-meta) {
		flex: none;
		color: var(--ui-fg-muted);
		font-size: var(--ui-fs-xs);
		font-variant-numeric: tabular-nums;
	}

	.ui-select[data-variant="field"] :global(.ui-select-trigger) {
		padding: 0 var(--ui-space-3);
		border-color: var(--ui-line);
		background: var(--ui-field);
		color: var(--ui-fg);
		font-weight: 400;
	}

	.ui-select-popover {
		position: fixed;
		inset: auto;
		margin: 0;
		flex-direction: column;
		min-width: 10rem;
		padding: var(--ui-space-1);
		border: var(--ui-line-w) solid var(--ui-line-strong);
		border-radius: var(--ui-r-control);
		background: var(--ui-panel);
		color: var(--ui-fg-secondary);
		box-shadow: var(--ui-shadow-pop);
		overflow: hidden;
	}

	.ui-select-popover:popover-open {
		display: flex;
	}

	.ui-select-search {
		width: 100%;
		margin-bottom: var(--ui-space-1);
		padding: var(--ui-space-2);
		border: 0;
		border-bottom: var(--ui-line-w) solid var(--ui-line);
		background: transparent;
		color: var(--ui-fg);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		outline: none;
	}

	.ui-select-search::placeholder {
		color: var(--ui-fg-muted);
	}

	.ui-select-list {
		display: flex;
		flex-direction: column;
		max-height: 15rem;
		overflow-y: auto;
	}

	.ui-select-option {
		display: flex;
		align-items: center;
		gap: var(--ui-space-2);
		width: 100%;
		padding: var(--ui-space-2);
		border: 0;
		border-radius: var(--ui-r-chip);
		background: transparent;
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		text-align: left;
		cursor: pointer;
	}

	.ui-select-option:hover,
	.ui-select-option[data-active="true"] {
		background: var(--ui-hover);
		color: var(--ui-fg);
	}

	.ui-select-option[aria-selected="true"] {
		color: var(--ui-fg);
	}

	.ui-select-option > :global(svg) {
		flex: none;
		width: 1rem;
		height: 1rem;
	}

	:global(.ui-select-option-mark) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 1rem;
		height: 1rem;
		color: var(--ui-accent);
	}

	:global(.ui-select-option-mark > svg) {
		width: 1rem;
		height: 1rem;
	}

	:global(.ui-select-option-label) {
		flex: 1 1 auto;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.ui-select-option-count) {
		flex: none;
		color: var(--ui-fg-muted);
		font-size: var(--ui-fs-xs);
		font-variant-numeric: tabular-nums;
	}

	.ui-select-empty {
		margin: 0;
		padding: var(--ui-space-2);
		color: var(--ui-fg-muted);
		font-size: var(--ui-fs-sm);
	}

	.ui-select-footer {
		padding-top: var(--ui-space-1);
		border-top: var(--ui-line-w) solid var(--ui-line);
	}

	.ui-select-footer :global(button) {
		width: 100%;
		padding: var(--ui-space-2);
		border: 0;
		border-radius: var(--ui-r-chip);
		background: transparent;
		color: var(--ui-fg-muted);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		text-align: left;
		cursor: pointer;
	}

	.ui-select-footer :global(button:hover) {
		background: var(--ui-hover);
		color: var(--ui-fg);
	}
</style>
