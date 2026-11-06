// NOTE: generated from src/components/TextInput.svelte by `pnpm build:types`; do not edit.
import type { HTMLInputAttributes } from "svelte/elements";
type Size = "sm" | "md" | "lg";
interface Props extends Omit<HTMLInputAttributes, "size" | "value"> {
	/** Bindable text. */
	value?: string;
	/** sm, md or lg height and text step. */
	size?: Size;
	/** Marks the input invalid. */
	invalid?: boolean;
	/** Uses the monospace face. */
	mono?: boolean;
}
declare const TextInput: import("svelte").Component<Props, {}, "value">;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
