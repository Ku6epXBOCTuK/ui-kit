import { createSelect } from "./select.svelte.ts";

export interface TagInputConfig {
	value: () => string[];
	suggestions?: () => string[];
	onChange: (tags: string[]) => void;
	onUnknown?: (tag: string) => Promise<unknown> | void;
	lowercase?: () => boolean;
	validate?: () => ((tag: string) => string | null) | undefined;
}

const SEPARATORS = /[\s,]+/;

export function createTagInput(config: TagInputConfig) {
	const suggestions = $derived(config.suggestions?.() ?? []);
	const value = $derived(config.value());

	let text = $state("");

	const select = createSelect<string>({
		items: () => suggestions.filter((tag) => !value.includes(tag)),
		getLabel: (tag) => tag,
		closeOnPick: false,
		onPick: (tag) => add([tag]),
	});

	const available = $derived(select.filtered);

	function normalize(tag: string): string {
		const trimmed = tag.trim();
		return (config.lowercase?.() ?? true) ? trimmed.toLowerCase() : trimmed;
	}

	function valid(tag: string): boolean {
		if (tag === "" || value.includes(tag)) return false;
		const problem = config.validate?.()?.(tag);
		return problem === undefined || problem === null;
	}

	function add(candidates: string[]) {
		const fresh = candidates
			.map(normalize)
			.filter((tag, index, all) => valid(tag) && all.indexOf(tag) === index);
		if (fresh.length > 0) config.onChange([...value, ...fresh]);
		text = "";
		select.setQuery("");
	}

	async function commit() {
		const candidates = text
			.split(SEPARATORS)
			.map(normalize)
			.filter((tag) => tag !== "");
		text = "";
		select.setQuery("");
		if (config.onUnknown !== undefined) {
			for (const tag of candidates) {
				if (!suggestions.includes(tag)) await config.onUnknown(tag);
			}
		}
		add(candidates);
	}

	function remove(tag: string) {
		config.onChange(value.filter((item) => item !== tag));
	}

	function move(from: number, to: number) {
		if (from === to || from < 0 || from >= value.length) return;
		const next = [...value];
		const moved = next.splice(from, 1)[0];
		if (moved === undefined) return;
		next.splice(Math.min(Math.max(to, 0), next.length), 0, moved);
		config.onChange(next);
	}

	function setText(next: string) {
		text = next;
		if (!select.open) select.show();
		select.setQuery(next);
	}

	function clear() {
		text = "";
		select.setQuery("");
	}

	function handleKeydown(event: KeyboardEvent): boolean {
		if (event.key === ",") {
			void commit();
			return true;
		}
		if (event.key === " " || event.key === "Enter") {
			if (text.trim() === "") return event.key === " ";
			if (select.active !== null) select.pickActive();
			else void commit();
			return true;
		}
		if (event.key === "Backspace" && text === "" && value.length > 0) {
			config.onChange(value.slice(0, -1));
			return true;
		}
		return false;
	}

	return {
		get text() {
			return text;
		},
		get available() {
			return available;
		},
		get chips() {
			return value;
		},
		select,
		normalize,
		setText,
		clear,
		add,
		commit,
		remove,
		move,
		handleKeydown,
	};
}

export type TagInput = ReturnType<typeof createTagInput>;
