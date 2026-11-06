// NOTE: generated from src/components/InfoPopover.svelte by `pnpm build:types`; do not edit.
import type { Snippet } from "svelte";
interface TriggerState {
	open: boolean;
	toggle: () => void;
}
interface Props {
	/** Panel text when no content snippet is given. */
	text?: string;
	/** Panel body; wins over text. */
	content?: Snippet;
	/** Icon before the default trigger content. */
	icon?: Snippet;
	/** Default trigger content. */
	children?: Snippet;
	/** Replaces the default button; call toggle from the trigger's click. */
	trigger?: Snippet<[TriggerState]>;
	/** Accessible name of the default trigger; falls back to text. */
	label?: string;
	/** Extra classes on the default trigger. */
	class?: string;
	/** Inline style on the default trigger. */
	style?: string;
	/** Makes the trigger an action: the click calls it and the panel opens only on hover. */
	onclick?: (event: MouseEvent) => void;
	/** Opens the panel on hover with a mouse; touch and pen open it on tap only. */
	hover?: boolean;
}
declare const InfoPopover: import("svelte").Component<Props, {}, "">;
type InfoPopover = ReturnType<typeof InfoPopover>;
export default InfoPopover;
