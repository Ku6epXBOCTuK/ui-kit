// NOTE: generated from src/components/Button.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
interface Props extends HTMLButtonAttributes {
	/** primary for the main action, secondary for a normal one, ghost for a quiet one, danger for a destructive one. */
	variant?: Variant;
	/** sm, md or lg height and text step. */
	size?: Size;
	/** Snippet before the label; the spinner takes its place while loading. */
	icon?: Snippet;
	/** Snippet after the label; hidden while loading. */
	iconAfter?: Snippet;
	/** Disables the button, sets aria-busy and puts a spinner where the icon goes. */
	loading?: boolean;
	/** Button label. */
	children?: Snippet;
	/** Bindable native button element. */
	element?: HTMLButtonElement;
}
declare const Button: import("svelte").Component<Props, {}, "element">;
type Button = ReturnType<typeof Button>;
export default Button;
