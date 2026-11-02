// NOTE: generated from src/components/SectionTitle.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
type Tone = "muted" | "accent" | "danger" | "warning";
type Size = "sm" | "md";
interface Props {
	/** Heading level 2, 3 or 4; the element follows it. */
	level?: 2 | 3 | 4;
	/** muted by default; accent for section heads, danger and warning for states. */
	tone?: Tone;
	/** sm or md. */
	size?: Size;
	/** Uses the monospace face, for paired-column heads. */
	mono?: boolean;
	/** Title text. */
	children: Snippet;
	/** Extra classes on the heading. */
	class?: string;
}
declare const SectionTitle: import("svelte").Component<Props, {}, "">;
type SectionTitle = ReturnType<typeof SectionTitle>;
export default SectionTitle;
