// NOTE: generated from src/components/Checkbox.svelte by `pnpm build:types`; do not edit.
import type { HTMLInputAttributes } from "svelte/elements";
interface Props
	extends Omit<HTMLInputAttributes, "type" | "value" | "checked"> {
	/** Bindable checked state. */
	checked?: boolean;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
