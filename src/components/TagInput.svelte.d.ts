// NOTE: generated from src/components/TagInput.svelte by `pnpm build:types`; do not edit.
interface Props {
	/** The chosen tags. Not bindable: the caller owns the list. */
	value: string[];
	/** Called with a new array after every add, remove or reorder. */
	onchange: (tags: string[]) => void;
	/** Tags offered in the dropdown. */
	suggestions?: string[];
	/** Number shown next to a suggestion, keyed by tag. */
	counts?: Record<string, number>;
	/** Called for every committed tag outside suggestions; awaited, so it can fetch the tag. */
	onunknown?: (tag: string) => Promise<unknown> | void;
	/** Returns an error message for a tag to reject, or null; the message shows under the input. */
	validate?: (tag: string) => string | null;
	/** Lowercases tags before they are added. */
	lowercase?: boolean;
	/** Placeholder of the text input. */
	placeholder?: string;
	/** aria-label of the text input and the suggestion list. */
	ariaLabel?: string;
	/** Id of the text input, for pairing with a label. */
	id?: string;
	/** Blocks typing, removing and reordering, and dims the chips. */
	disabled?: boolean;
	/** Marks the input and the trigger invalid. */
	invalid?: boolean;
	/** Lets chips be dragged into a new order. */
	reorderable?: boolean;
	/** Clicking a chip copies its tag to the clipboard. */
	copyable?: boolean;
	/** aria-label of the copy button, called with the tag. */
	copyLabel?: (tag: string) => string;
	/** Text shown for a moment after a copy. */
	copiedLabel?: string;
	/** Opens all suggestions on focus; otherwise the list waits for typed text. */
	showAll?: boolean;
	/** filter is inline, field fills the width. */
	variant?: "filter" | "field";
	/** Extra classes on the root. */
	class?: string;
}
declare const TagInput: import("svelte").Component<Props, {}, "">;
type TagInput = ReturnType<typeof TagInput>;
export default TagInput;
