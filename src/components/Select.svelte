<script lang="ts" generics="T">
	import type { Select } from "../headless/select.svelte.ts";
	import type { Snippet } from "svelte";

	type Size = "sm" | "md" | "lg";

	interface Props {
		select: Select<T>;
		getKey: (item: T) => string | number;
		trigger: Snippet;
		option: Snippet<[T]>;
		footer?: Snippet;
		isSelected?: (item: T) => boolean;
		onkeydown?: (event: KeyboardEvent) => boolean;
		searchable?: boolean;
		searchPlaceholder?: string;
		emptyLabel?: string;
		listLabel?: string;
		listId?: string;
		multiselect?: boolean;
		variant?: "filter" | "field";
		size?: Size;
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

	function place() {
		if (popover === null || root === null) return;

		const anchor = root.getBoundingClientRect();
		const margin = 8;
		const gap = 4;

		popover.style.minWidth = `${root.offsetWidth}px`;

		const width = popover.offsetWidth;
		const height = popover.offsetHeight;
		const spaceBelow = window.innerHeight - anchor.bottom - margin;
		const spaceAbove = anchor.top - margin;
		const flip = spaceBelow < height && spaceAbove > spaceBelow;

		const top = flip
			? Math.max(margin, anchor.top - height - gap)
			: Math.min(
					anchor.bottom + gap,
					Math.max(margin, window.innerHeight - height - margin),
				);
		const left = Math.min(
			Math.max(margin, anchor.left),
			Math.max(margin, window.innerWidth - width - margin),
		);

		popover.style.top = `${top}px`;
		popover.style.left = `${left}px`;
	}

	function handleKeydown(event: KeyboardEvent) {
		const handled = onkeydown?.(event) || select.handleKeydown(event);
		if (handled) event.preventDefault();
	}

	$effect(() => {
		if (popover === null) return;

		if (!select.open) {
			if (popover.matches(":popover-open")) popover.hidePopover();
			return;
		}

		if (!popover.matches(":popover-open")) popover.showPopover();
		place();
		searchInput?.focus();

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
					autocomplete="off"
				/>
			{/if}
			<div
				class="ui-select-list"
				id={listId}
				role="listbox"
				aria-label={listLabel}
				aria-multiselectable={multiselect}
			>
				{#if select.filtered.length === 0}
					<p class="ui-select-empty">{emptyLabel}</p>
				{:else}
					{#each select.filtered as item, index (getKey(item))}
						<button
							type="button"
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
