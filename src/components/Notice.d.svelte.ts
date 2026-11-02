// NOTE: generated from src/components/Notice.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
type Variant = "inline" | "box";
type Size = "sm" | "md" | "lg";
interface Props {
	/** Colour family: neutral, accent, success, warning, danger or info. */
	tone?: Tone;
	/** inline sits in the text flow, box draws a bordered block. */
	variant?: Variant;
	/** sm, md or lg text step. */
	size?: Size;
	/** Passed to the container as role, so a live region can announce the notice. */
	role?: string;
	/** Notice text. */
	children: Snippet;
	/** Extra classes on the container. */
	class?: string;
}
declare const Notice: import("svelte").Component<Props, {}, "">;
type Notice = ReturnType<typeof Notice>;
export default Notice;
