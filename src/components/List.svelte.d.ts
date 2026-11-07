// NOTE: generated from src/components/List.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Drops the box and the dividers, for rows that bring their own frame. */
	plain?: boolean;
	/** `li` rows. */
	children: Snippet;
	/** Extra classes on the list. */
	class?: string;
}
declare const List: import("svelte").Component<Props, {}, "">;
type List = ReturnType<typeof List>;
export default List;
