// NOTE: generated from src/components/ConfirmDialog.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Heading, also the accessible name of the dialog. */
	title: string;
	/** Plain text body; use children when the body needs markup. */
	body?: string;
	/** Whether the dialog is shown. */
	open?: boolean;
	/** Text of the confirm button. */
	confirmLabel?: string;
	/** Text of the cancel button. */
	cancelLabel?: string;
	/** Paints the confirm button as destructive; it is primary otherwise. */
	danger?: boolean;
	/** Disables the confirm button, for a confirm that is still running. */
	disabled?: boolean;
	/** Called by the confirm button. */
	onconfirm: () => void;
	/** Called by the cancel button, Escape and a backdrop click. */
	oncancel: () => void;
	/** Extra markup under the body. */
	children?: Snippet;
}
declare const ConfirmDialog: import("svelte").Component<Props, {}, "">;
type ConfirmDialog = ReturnType<typeof ConfirmDialog>;
export default ConfirmDialog;
