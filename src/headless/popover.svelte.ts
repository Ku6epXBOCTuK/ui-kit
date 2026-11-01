export type PopoverPlacement = "start" | "end" | "side";

export interface PopoverAnchor {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface PopoverBox {
	width: number;
	height: number;
}

export interface PopoverPoint {
	top: number;
	left: number;
}

export interface PopoverOptions {
	placement?: PopoverPlacement;
	gap?: number;
	margin?: number;
}

// NOTE: The Popover API places nothing on its own and anchor() is not available
// everywhere, so the box is placed from rects. Clamping both axes here is what
// keeps a panel next to its anchor on narrow screens instead of off-screen.
export function placePopover(
	anchor: PopoverAnchor,
	box: PopoverBox,
	viewport: PopoverBox,
	{ placement = "end", gap = 4, margin = 8 }: PopoverOptions = {},
): PopoverPoint {
	const maxLeft = Math.max(margin, viewport.width - box.width - margin);
	let left: number;
	if (placement === "side") {
		const beside =
			anchor.right + gap + box.width <= viewport.width - margin
				? anchor.right + gap
				: anchor.left - gap - box.width;
		left = beside;
	} else if (placement === "end") {
		left = anchor.right - box.width;
	} else {
		left = anchor.left;
	}

	const below = anchor.bottom + gap;
	const above = anchor.top - gap - box.height;
	const fitsBelow = below + box.height <= viewport.height - margin;
	const fitsAbove = above >= margin;

	let top: number;
	if (fitsBelow) top = below;
	else if (fitsAbove) top = above;
	else
		top = Math.min(
			Math.max(margin, below),
			Math.max(margin, viewport.height - box.height - margin),
		);

	return {
		top,
		left: Math.min(Math.max(margin, left), maxLeft),
	};
}
