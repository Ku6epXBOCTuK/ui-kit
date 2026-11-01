import { describe, expect, it } from "vitest";
import {
	placePopover,
	type PopoverAnchor,
	type PopoverBox,
} from "./popover.svelte.ts";

const viewport: PopoverBox = { width: 1280, height: 800 };
const box: PopoverBox = { width: 288, height: 240 };

function anchorAt(
	left: number,
	top: number,
	width = 120,
	height = 36,
): PopoverAnchor {
	return { left, top, right: left + width, bottom: top + height };
}

describe("placePopover", () => {
	it("hangs below the anchor and aligns its right edge", () => {
		const point = placePopover(anchorAt(1000, 100), box, viewport);

		expect(point.top).toBe(140);
		expect(point.left).toBe(1000 + 120 - 288);
	});

	it("aligns the left edge with start", () => {
		const point = placePopover(anchorAt(200, 100), box, viewport, {
			placement: "start",
		});

		expect(point.left).toBe(200);
	});

	it("stays inside the left edge when the anchor sits at the edge", () => {
		const point = placePopover(anchorAt(0, 100), box, viewport);

		expect(point.left).toBe(8);
	});

	it("stays inside the right edge when the anchor sits at the edge", () => {
		const point = placePopover(anchorAt(1200, 100), box, viewport, {
			placement: "start",
		});

		expect(point.left).toBe(1280 - 288 - 8);
	});

	it("flips above when there is no room below", () => {
		const point = placePopover(anchorAt(1000, 600), box, viewport);

		expect(point.top).toBe(600 - 240 - 4);
	});

	it("clamps to the top margin when the box is taller than the viewport", () => {
		const tall: PopoverBox = { width: 288, height: 900 };
		const point = placePopover(anchorAt(1000, 700), tall, viewport);

		expect(point.top).toBe(8);
	});

	it("goes right of the anchor for side placement", () => {
		const point = placePopover(anchorAt(100, 100), box, viewport, {
			placement: "side",
		});

		expect(point.left).toBe(100 + 120 + 4);
	});

	it("goes left of the anchor when the right side does not fit", () => {
		const point = placePopover(anchorAt(1100, 100), box, viewport, {
			placement: "side",
		});

		expect(point.left).toBe(1100 - 288 - 4);
	});

	it("keeps a narrow viewport at the margin instead of going negative", () => {
		const phone: PopoverBox = { width: 320, height: 640 };
		const point = placePopover(anchorAt(10, 100), box, phone);

		expect(point.left).toBe(8);
	});
});
