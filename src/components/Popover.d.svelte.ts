// NOTE: generated from src/components/Popover.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
import { type PopoverPlacement } from "../headless/popover.svelte.ts";
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
declare const Popover: import("svelte").Component<Props, {}, "element">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
