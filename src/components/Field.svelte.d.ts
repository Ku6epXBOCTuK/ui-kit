// NOTE: generated from src/components/Field.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Visible label, tied to the generated control id. */
	label?: string;
	/** Helper text under the control; error takes its place when set. */
	hint?: string;
	/** Error text under the control; also marks the field invalid. */
	error?: string;
	/** Adds the asterisk to the label; set required on the control yourself. */
	required?: boolean;
	/** Control id; generated when omitted and passed to children. */
	id?: string;
	/** stack puts the label above the control, row puts them side by side. */
	orientation?: "stack" | "row";
	/** Receives the id generated for the control, so label and control stay paired. */
	children: Snippet<[string]>;
	/** Extra classes on the field. */
	class?: string;
}
declare const Field: import("svelte").Component<Props, {}, "">;
type Field = ReturnType<typeof Field>;
export default Field;
