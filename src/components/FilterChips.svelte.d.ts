// NOTE: generated from src/components/FilterChips.svelte by `pnpm build:types`; do not edit.
interface Option {
	value: string;
	label: string;
}
interface Props {
	/** Chips in display order. */
	options: Option[];
	/** Bindable selected values. */
	value?: string[];
	/** Label of the select-all chip; no chip when omitted. */
	allLabel?: string;
	/** Accessible name of the group. */
	label: string;
	/** Disables every chip. */
	disabled?: boolean;
	/** Called with the new selection. */
	onchange?: (value: string[]) => void;
	/** Extra classes on the group. */
	class?: string;
}
declare const FilterChips: import("svelte").Component<Props, {}, "value">;
type FilterChips = ReturnType<typeof FilterChips>;
export default FilterChips;
