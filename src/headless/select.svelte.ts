export interface SelectConfig<T> {
	items: () => T[];
	getLabel: (item: T) => string;
	getKeywords?: (item: T) => string;
	onPick: (item: T) => void;
	closeOnPick?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	onQuery?: (query: string) => void;
	filter?: (item: T, needle: string) => boolean;
	wrap?: boolean;
}

function matches<T>(
	item: T,
	needle: string,
	getLabel: (item: T) => string,
	getKeywords?: (item: T) => string,
): boolean {
	if (needle === "") return true;
	const haystack = `${getLabel(item)} ${getKeywords?.(item) ?? ""}`.toLowerCase();
	return haystack.includes(needle);
}

function clamp(index: number, length: number): number {
	if (length === 0) return 0;
	return ((index % length) + length) % length;
}

export function createSelect<T>(config: SelectConfig<T>) {
	let open = $state(false);
	let query = $state("");
	let activeIndex = $state(0);

	const needle = $derived(query.trim().toLowerCase());

	const filtered = $derived(
		config
			.items()
			.filter((item) =>
				config.filter === undefined
					? matches(item, needle, config.getLabel, config.getKeywords)
					: config.filter(item, needle),
			),
	);

	const active = $derived(
		filtered.length === 0 ? null : (filtered[clamp(activeIndex, filtered.length)] ?? null),
	);

	function show() {
		if (open) return;
		open = true;
		query = "";
		activeIndex = 0;
		config.onOpen?.();
	}

	// NOTE: show() and hide() clear the query without calling onQuery, so an
	// owner that fetches on every query keeps stale results until the user types.
	function hide() {
		if (!open) return;
		open = false;
		query = "";
		config.onClose?.();
	}

	function toggle() {
		if (open) hide();
		else show();
	}

	function setQuery(value: string) {
		query = value;
		activeIndex = 0;
		config.onQuery?.(value);
	}

	function move(delta: number) {
		if (filtered.length === 0) {
			activeIndex = 0;
			return;
		}
		const next = activeIndex + delta;
		activeIndex =
			config.wrap ?? true
				? clamp(next, filtered.length)
				: Math.min(Math.max(next, 0), filtered.length - 1);
	}

	function moveTo(index: number) {
		activeIndex = index;
	}

	function pick(item: T) {
		config.onPick(item);
		if (config.closeOnPick ?? true) hide();
	}

	function pickActive(): T | null {
		const item = active;
		if (item === null) return null;
		pick(item);
		return item;
	}

	function handleKeydown(event: KeyboardEvent): boolean {
		switch (event.key) {
			case "ArrowDown":
				if (!open) show();
				else move(1);
				return true;
			case "ArrowUp":
				if (!open) show();
				else move(-1);
				return true;
			case "Home":
				if (!open) return false;
				moveTo(0);
				return true;
			case "End":
				if (!open) return false;
				moveTo(Math.max(filtered.length - 1, 0));
				return true;
			case "Enter":
				if (!open) return false;
				return pickActive() !== null;
			case "Escape":
				if (!open) return false;
				hide();
				return true;
			case "Tab":
				if (!open) return false;
				hide();
				return false;
			default:
				return false;
		}
	}

	return {
		get open() {
			return open;
		},
		get query() {
			return query;
		},
		get filtered() {
			return filtered;
		},
		get active() {
			return active;
		},
		get activeIndex() {
			return filtered.length === 0 ? -1 : clamp(activeIndex, filtered.length);
		},
		show,
		hide,
		toggle,
		setQuery,
		move,
		moveTo,
		pick,
		pickActive,
		handleKeydown,
	};
}

export type Select<T> = ReturnType<typeof createSelect<T>>;
