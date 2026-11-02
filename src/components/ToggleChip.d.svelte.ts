// NOTE: generated from src/components/ToggleChip.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
interface Props extends HTMLButtonAttributes {
	/** Pressed state: sets aria-pressed and the active style. */
	active?: boolean;
	/** Chip label. */
	children: Snippet;
	/** Bindable native button element. */
	element?: HTMLButtonElement;
}
declare const ToggleChip: import("svelte").Component<Props, {}, "element">;
type ToggleChip = ReturnType<typeof ToggleChip>;
export default ToggleChip;
