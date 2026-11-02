<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		placePopover,
		type PopoverPlacement,
	} from "../headless/popover.svelte.ts";

	interface Props {
		/** Whether the panel is shown. */
		open: boolean;
		/** Element the panel is placed against. */
		anchor: HTMLElement | null;
		/** start or end below the anchor, side next to it; goes above when there is no room below. */
		placement?: PopoverPlacement;
		/** Distance in pixels between the anchor and the panel. */
		gap?: number;
		/** Closest the panel may come to the viewport edge. */
		margin?: number;
		/** Id of the panel, so a trigger can point at it with aria-controls. */
		id?: string;
		/** Role of the panel, for example dialog or listbox. */
		role?: string;
		/** Accessible name of the panel. */
		label?: string;
		/** CSS min-width of the panel. */
		minWidth?: string;
		/** CSS max-width of the panel. */
		maxWidth?: string;
		/** Bindable panel element. */
		element?: HTMLDivElement;
		/** Extra classes on the panel. */
		class?: string;
		/** Called on an outside pointerdown or Escape; the caller closes the panel. */
		onclose?: () => void;
		/** Panel content. */
		children: Snippet;
	}

	let {
		open,
		anchor,
		placement = "end",
		gap = 4,
		margin = 8,
		id = undefined,
		role = undefined,
		label = undefined,
		minWidth = undefined,
		maxWidth = undefined,
		element = $bindable(),
		class: className = "",
		onclose,
		children,
	}: Props = $props();

	function place() {
		if (!element || !anchor) return;
		const point = placePopover(
			anchor.getBoundingClientRect(),
			{ width: element.offsetWidth, height: element.offsetHeight },
			{ width: window.innerWidth, height: window.innerHeight },
			{ placement, gap, margin },
		);
		element.style.top = `${point.top}px`;
		element.style.left = `${point.left}px`;
	}

	// NOTE: Placed before showPopover(), because an open box that is not placed
	// yet sits at the UA inset: 0 corner for as long as the show takes.
	$effect(() => {
		if (!element) return;

		if (!open) {
			if (element.matches(":popover-open")) element.hidePopover();
			return;
		}

		if (!element.matches(":popover-open")) element.showPopover();
		place();

		window.addEventListener("resize", place);
		window.addEventListener("scroll", place, true);
		const observer = new ResizeObserver(() => place());
		observer.observe(element);

		return () => {
			window.removeEventListener("resize", place);
			window.removeEventListener("scroll", place, true);
			observer.disconnect();
		};
	});

	$effect(() => {
		if (!open || !element) return;

		function onPointerDown(event: PointerEvent) {
			const target = event.target as Node;
			if (element?.contains(target) || anchor?.contains(target)) return;
			onclose?.();
		}

		function onKeydown(event: KeyboardEvent) {
			if (event.key !== "Escape") return;
			event.stopPropagation();
			onclose?.();
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
	bind:this={element}
	class="ui-popover {className}"
	data-ui="popover"
	popover="manual"
	{id}
	{role}
	aria-label={label}
	style:min-width={minWidth}
	style:max-width={maxWidth}
>
	{@render children()}
</div>

<style>
	.ui-popover {
		position: fixed;
		inset: auto;
		margin: 0;
		max-width: calc(100dvw - var(--ui-space-2) * 2);
		max-height: calc(100dvh - var(--ui-space-2) * 2);
		overflow: auto;
	}

	:where(.ui-popover) {
		box-sizing: border-box;
		padding: var(--ui-space-2);
		border: var(--ui-line-w) solid var(--ui-line);
		border-radius: var(--ui-r-panel);
		background: var(--ui-panel);
		color: var(--ui-fg);
		box-shadow: var(--ui-shadow-pop);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		font-weight: normal;
		line-height: var(--ui-lh);
		letter-spacing: normal;
		text-align: start;
		text-transform: none;
		white-space: normal;
		overflow-wrap: anywhere;
	}

	/* NOTE: display applies only while open: an author display would otherwise
	   override the UA rule that hides a closed popover. */
	.ui-popover:popover-open {
		display: grid;
		align-content: start;
		gap: var(--ui-space-1);
	}
</style>
