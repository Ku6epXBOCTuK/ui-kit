// NOTE: generated from src/components/IconButton.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
type Variant = "ghost" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";
interface Props extends HTMLButtonAttributes {
	/** Becomes the button's aria-label; the button has no visible text. */
	label: string;
	/** ghost has no chrome until hover, secondary has a border, danger is destructive. */
	variant?: Variant;
	/** sm, md or lg square. */
	size?: Size;
	/** Pressed state: sets aria-pressed and the active style. */
	active?: boolean;
	/** Value for aria-expanded when the button controls a disclosure. */
	expanded?: boolean;
	/** Icon markup; the label prop carries the text. */
	children: Snippet;
	/** Bindable native button element. */
	element?: HTMLButtonElement;
}
declare const IconButton: import("svelte").Component<Props, {}, "element">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
