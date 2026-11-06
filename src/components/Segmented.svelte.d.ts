// NOTE: generated from src/components/Segmented.svelte by `pnpm build:types`; do not edit.
interface Option {
	value: string;
	label: string;
}
interface Props {
	/** Segments in display order. */
	options: Option[];
	/** Bindable value of the selected segment. */
	value?: string;
	/** Stretches the group to the container width. */
	wide?: boolean;
	/** Disables every segment. */
	disabled?: boolean;
	/** Accessible name of the radio group. */
	label: string;
	/** Called with the value of the picked segment. */
	onchange?: (value: string) => void;
	/** Extra classes on the group. */
	class?: string;
}
declare const Segmented: import("svelte").Component<Props, {}, "value">;
type Segmented = ReturnType<typeof Segmented>;
export default Segmented;
