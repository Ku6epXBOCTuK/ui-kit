// NOTE: generated from src/components/TextArea.svelte by `pnpm build:types`; do not edit.
import type { HTMLTextareaAttributes } from "svelte/elements";
interface Props extends Omit<HTMLTextareaAttributes, "value"> {
	/** Bindable text. */
	value?: string;
	/** Marks the textarea invalid. */
	invalid?: boolean;
	/** Uses the monospace face. */
	mono?: boolean;
}
declare const TextArea: import("svelte").Component<Props, {}, "value">;
type TextArea = ReturnType<typeof TextArea>;
export default TextArea;
