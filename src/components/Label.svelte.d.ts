// NOTE: generated from src/components/Label.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
type Tone = "muted" | "secondary" | "accent" | "danger";
interface Props {
	/** muted by default; secondary, accent and danger change the colour. */
	tone?: Tone;
	/** Label text. */
	children: Snippet;
	/** Extra classes on the span. */
	class?: string;
}
declare const Label: import("svelte").Component<Props, {}, "">;
type Label = ReturnType<typeof Label>;
export default Label;
