<script lang="ts">
	import type { Snippet } from "svelte";
	import { placePopover } from "../headless/popover.svelte.ts";

	interface TriggerState {
		open: boolean;
		toggle: () => void;
	}

	interface Props {
		/** Panel text when no content snippet is given. */
		text?: string;
		/** Panel body; wins over text. */
		content?: Snippet;
		/** Icon before the default trigger content. */
		icon?: Snippet;
		/** Default trigger content. */
		children?: Snippet;
		/** Replaces the default button; call toggle from the trigger's click. */
		trigger?: Snippet<[TriggerState]>;
		/** Accessible name of the default trigger; falls back to text. */
		label?: string;
		/** Extra classes on the default trigger. */
		class?: string;
		/** Inline style on the default trigger. */
		style?: string;
		/** Makes the trigger an action: the click calls it and the panel opens only on hover. */
		onclick?: (event: MouseEvent) => void;
		/** Opens the panel on hover with a mouse; touch and pen open it on tap only. */
		hover?: boolean;
	}

	let {
		text = "",
		content,
		icon,
		children,
		trigger,
		label,
		class: className = "",
		style = "",
		onclick,
		hover = true,
	}: Props = $props();

	let open = $state(false);
	let pinned = $state(false);
	let root = $state<HTMLSpanElement | null>(null);
	let panel = $state<HTMLDivElement | null>(null);

	function close() {
		open = false;
		pinned = false;
	}

	function toggle() {
		if (!open) {
			open = true;
			pinned = true;
			return;
		}
		if (pinned) {
			close();
			return;
		}
		pinned = true;
	}

	function place() {
		if (panel === null || root === null) return;

		const point = placePopover(
			root.getBoundingClientRect(),
			{ width: panel.offsetWidth, height: panel.offsetHeight },
			{ width: window.innerWidth, height: window.innerHeight },
			{ placement: "start", gap: 6, margin: 8 },
		);

		panel.style.top = `${point.top}px`;
		panel.style.left = `${point.left}px`;
	}

	function handleClick(event: MouseEvent) {
		event.stopPropagation();
		if (onclick !== undefined) {
			onclick(event);
			return;
		}
		toggle();
	}

	function handlePointerEnter(event: PointerEvent) {
		if (!hover || event.pointerType !== "mouse") return;
		open = true;
	}

	function handlePointerLeave() {
		if (!hover || pinned) return;
		open = false;
	}

	function handleFocusOut(event: FocusEvent) {
		if (root !== null && root.contains(event.relatedTarget as Node)) return;
		close();
	}

	$effect(() => {
		if (!open || panel === null) return;

		if (!panel.matches(":popover-open")) panel.showPopover();
		place();

		const reposition = () => place();
		window.addEventListener("resize", reposition);
		window.addEventListener("scroll", reposition, true);
		const observer = new ResizeObserver(reposition);
		observer.observe(panel);

		return () => {
			window.removeEventListener("resize", reposition);
			window.removeEventListener("scroll", reposition, true);
			observer.disconnect();
			if (panel?.matches(":popover-open")) panel.hidePopover();
		};
	});

	$effect(() => {
		if (!open) return;

		function onPointerDown(event: PointerEvent) {
			if (root !== null && !root.contains(event.target as Node)) close();
		}

		function onKeydown(event: KeyboardEvent) {
			if (event.key !== "Escape") return;
			close();
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

<span
	class="ui-info-popover"
	data-ui="info-popover"
	role="presentation"
	bind:this={root}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
	onfocusout={handleFocusOut}
>
	{#if trigger}
		{@render trigger({ open, toggle })}
	{:else}
		<button
			type="button"
			class="ui-info-popover-trigger {className}"
			{style}
			aria-label={label ?? text}
			aria-expanded={open}
			onclick={handleClick}
		>
			{#if icon}
				{@render icon()}
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</button>
	{/if}
	{#if open}
		<div
			class="ui-info-popover-panel"
			data-ui="info-popover-panel"
			popover="manual"
			role="note"
			bind:this={panel}
		>
			{#if content}
				{@render content()}
			{:else}
				{text}
			{/if}
		</div>
	{/if}
</span>

<style>
	.ui-info-popover {
		display: inline-flex;
		flex: none;
	}

	.ui-info-popover-trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--ui-space-1);
		flex: none;
		appearance: none;
		margin: 0;
		padding: 0;
		border: 0;
		border-radius: var(--ui-r-control);
		background: transparent;
		color: var(--ui-fg-muted);
		font-family: var(--ui-font-mono);
		font-size: var(--ui-fs-xs);
		font-variant-numeric: tabular-nums;
		font-weight: 400;
		line-height: 1;
		letter-spacing: normal;
		cursor: help;
		user-select: none;
	}

	.ui-info-popover-trigger :global(svg) {
		width: 1rem;
		height: 1rem;
		flex: none;
	}

	.ui-info-popover-trigger:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: var(--ui-focus-ring-offset);
	}

	.ui-info-popover-panel {
		position: fixed;
		inset: auto;
		margin: 0;
		width: max-content;
		max-width: min(24rem, calc(100dvw - var(--ui-space-4)));
		padding: var(--ui-space-2) var(--ui-space-3);
		border: var(--ui-field-line-w) solid var(--ui-field-line);
		border-radius: var(--ui-r-control);
		background: var(--ui-field);
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		font-weight: 400;
		line-height: var(--ui-lh);
		white-space: normal;
		overflow-wrap: anywhere;
		box-shadow: var(--ui-shadow-pop);
	}
</style>
