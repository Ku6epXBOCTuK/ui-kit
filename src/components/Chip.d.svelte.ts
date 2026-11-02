// NOTE: generated from src/components/Chip.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface Props {
	/** Turns the label into a button; without it the chip is static. */
	onopen?: () => void;
	/** aria-label of the open button, for when the label text does not describe the action. */
	openLabel?: string;
	/** Shows the remove button and runs on click. */
	onremove?: () => void;
	/** aria-label of the remove button, for example Remove alpha. */
	removeLabel?: string;
	/** Dims the chip and turns the label into a disabled span. */
	unavailable?: boolean;
	/** Title shown while the chip is unavailable, to explain why. */
	hint?: string;
	/** Chip label. */
	children?: Snippet;
	/** Extra classes on the chip. */
	class?: string;
}
declare const Chip: import("svelte").Component<Props, {}, "">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
