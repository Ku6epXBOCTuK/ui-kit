// NOTE: generated from src/components/Panel.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Heading above the body; no heading when omitted. */
	title?: string;
	/** Helper text under the heading. */
	description?: string;
	/** Removes the body padding, for tables and scroll areas. */
	flush?: boolean;
	/** Panel body. */
	children: Snippet;
	/** Actions under a divider, right-aligned. */
	footer?: Snippet;
	/** Extra classes on the container. */
	class?: string;
}
declare const Panel: import("svelte").Component<Props, {}, "">;
type Panel = ReturnType<typeof Panel>;
export default Panel;
