// NOTE: generated from src/components/ScrollArea.svelte by `pnpm build:types`; do not edit.
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
type Axis = "x" | "y" | "both";
interface Props extends HTMLAttributes<HTMLDivElement> {
	/** Directions that scroll: y, x or both. */
	axis?: Axis;
	/** Scrollable content. */
	children?: Snippet;
}
declare const ScrollArea: import("svelte").Component<Props, {}, "">;
type ScrollArea = ReturnType<typeof ScrollArea>;
export default ScrollArea;
