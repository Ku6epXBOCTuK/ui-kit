// NOTE: generated from src/components/EmptyState.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Message explaining why the area is empty. */
	children: Snippet;
	/** Optional action rendered under the message, e.g. a button. */
	action?: Snippet;
	/** Extra classes on the container. */
	class?: string;
}
declare const EmptyState: import("svelte").Component<Props, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
