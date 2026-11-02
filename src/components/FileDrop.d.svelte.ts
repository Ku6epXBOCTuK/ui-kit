// NOTE: generated from src/components/FileDrop.svelte by `pnpm build:types`; do not edit.
interface Props {
	/** Text inside the drop zone. */
	label: string;
	/** Comma-separated MIME types, wildcards and extensions. */
	accept?: string;
	/** Blocks clicks, drops and keyboard activation. */
	disabled?: boolean;
	/** Called with the first accepted file; the input resets, so the same file can be picked again. */
	onpick: (file: File) => void;
	/** Extra classes on the drop zone. */
	class?: string;
}
declare const FileDrop: import("svelte").Component<Props, {}, "">;
type FileDrop = ReturnType<typeof FileDrop>;
export default FileDrop;
