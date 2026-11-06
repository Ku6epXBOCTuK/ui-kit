// NOTE: generated from src/components/Select.svelte by `pnpm build:types`; do not edit.
import type { Select } from "../headless/select.svelte.ts";
import type { Snippet } from "svelte";
declare function $$render<T>(): {
	props: {
		/** State and behaviour from createSelect. */
		select: Select<T>;
		/** Stable key of an item, used by the keyed each. */
		getKey: (item: T) => string | number;
		/** Your trigger markup; the list opens when select.open turns true. */
		trigger: Snippet;
		/** Snippet for one option, called with the item. */
		option: Snippet<[T]>;
		/** Snippet under the list, for actions such as Clear. */
		footer?: Snippet;
		/** Whether an item shows as selected; defaults to none. */
		isSelected?: (item: T) => boolean;
		/** Runs before the machine's keyboard handling; return true to mark the key handled. */
		onkeydown?: (event: KeyboardEvent) => boolean;
		/** Shows a search input at the top of the list and focuses it on open. */
		searchable?: boolean;
		/** Placeholder and aria-label of the search input. */
		searchPlaceholder?: string;
		/** Text shown when nothing matches the query. */
		emptyLabel?: string;
		/** aria-label of the listbox. */
		listLabel?: string;
		/** Id of the listbox, so a trigger can point at it with aria-controls. */
		listId?: string;
		/** Tells assistive tech that several items can be selected. */
		multiselect?: boolean;
		/** filter is inline, field fills the width like an input. */
		variant?: "filter" | "field";
		/** sm, md or lg trigger height. */
		size?: "sm" | "md" | "lg";
		/** Extra classes on the root. */
		class?: string;
	};
	exports: {};
	bindings: "";
	slots: {};
	events: {};
};
declare class __sveltets_Render<T> {
	props(): ReturnType<typeof $$render<T>>["props"];
	events(): ReturnType<typeof $$render<T>>["events"];
	slots(): ReturnType<typeof $$render<T>>["slots"];
	bindings(): "";
	exports(): {};
}
interface $$IsomorphicComponent {
	new <T>(
		options: import("svelte").ComponentConstructorOptions<
			ReturnType<__sveltets_Render<T>["props"]>
		>,
	): import("svelte").SvelteComponent<
		ReturnType<__sveltets_Render<T>["props"]>,
		ReturnType<__sveltets_Render<T>["events"]>,
		ReturnType<__sveltets_Render<T>["slots"]>
	> & {
		$$bindings?: ReturnType<__sveltets_Render<T>["bindings"]>;
	} & ReturnType<__sveltets_Render<T>["exports"]>;
	<T>(
		internal: unknown,
		props: ReturnType<__sveltets_Render<T>["props"]> & {},
	): ReturnType<__sveltets_Render<T>["exports"]>;
	z_$$bindings?: ReturnType<__sveltets_Render<any>["bindings"]>;
}
declare const SelectComponent: $$IsomorphicComponent;
type SelectInstance<T> = InstanceType<typeof SelectComponent<T>>;
export default SelectComponent;
