// NOTE: generated from src/components/PageHeader.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Page title, rendered as the h1. */
	title: string;
	/** Trailing actions aligned to the right edge, e.g. buttons. */
	actions?: Snippet;
	/** Extra classes on the header. */
	class?: string;
}
declare const PageHeader: import("svelte").Component<Props, {}, "">;
type PageHeader = ReturnType<typeof PageHeader>;
export default PageHeader;
