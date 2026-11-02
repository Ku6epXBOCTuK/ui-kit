// NOTE: generated from src/components/ControlRow.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
type Align = "start" | "center" | "end";
interface Props {
	/** Cross-axis alignment: start, center or end. */
	align?: Align;
	/** CSS gap between the children. */
	gap?: string;
	/** Leading content. */
	children?: Snippet;
	/** Snippet pinned to the right. */
	end?: Snippet;
	/** Extra classes on the row. */
	class?: string;
}
declare const ControlRow: import("svelte").Component<Props, {}, "">;
type ControlRow = ReturnType<typeof ControlRow>;
export default ControlRow;
