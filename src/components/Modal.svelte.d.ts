// NOTE: generated from src/components/Modal.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
type Size = "default" | "wide" | "full";
interface Props {
	/** Whether the dialog is shown; closing reports back through onclose. */
	open: boolean;
	/** Heading, also the default accessible name. */
	title: string;
	/** Overrides title as the accessible name when the heading is not enough. */
	label?: string;
	/** default, wide or full width. */
	size?: Size;
	/** Closes on a backdrop click; Escape and the close button work either way. */
	dismissable?: boolean;
	/** Called whenever the dialog closes, including Escape and the backdrop. */
	onclose: () => void;
	/** Replaces the default close glyph. */
	closeIcon?: Snippet;
	/** Header actions shown next to the close button. */
	actions?: Snippet;
	/** Dialog body. */
	children: Snippet;
}
declare const Modal: import("svelte").Component<Props, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
