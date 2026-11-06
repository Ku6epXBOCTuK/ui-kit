// NOTE: generated from src/components/Badge.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
type Variant = "soft" | "solid" | "outline";
type Size = "xs" | "sm" | "md";
interface Props {
	/** Colour family: neutral, accent, success, warning, danger or info. */
	tone?: Tone;
	/** Soft tint, solid fill or outline. */
	variant?: Variant;
	/** xs, sm or md padding and text step. */
	size?: Size;
	/** Draws a small dot before the label. */
	dot?: boolean;
	/** A CSS colour that overrides the tone, for data colours outside the six tones. */
	color?: string;
	/** Badge label; text, an icon or both. */
	children?: Snippet;
	/** Extra classes on the root span. */
	class?: string;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
