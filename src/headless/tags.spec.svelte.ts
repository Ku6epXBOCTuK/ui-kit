import { describe, expect, it, vi } from "vitest";
import { createTagInput } from "./tags.svelte.ts";

const pool = ["bug", "ui", "docs"];

function make(initial: string[] = [], onUnknown?: (tag: string) => Promise<unknown> | void) {
	let tags = [...initial];
	const onChange = vi.fn((next: string[]) => {
		tags = next;
	});
	const input = createTagInput({
		value: () => tags,
		suggestions: () => pool,
		onChange,
		onUnknown,
	});
	return { input, onChange, read: () => tags };
}

function key(value: string): KeyboardEvent {
	return { key: value } as KeyboardEvent;
}

describe("createTagInput", () => {
	it("splits on spaces and commas, lowercasing each tag", () => {
		const { input, onChange } = make();

		input.setText("Alpha, Beta gamma");
		void input.commit();

		expect(onChange).toHaveBeenCalledWith(["alpha", "beta", "gamma"]);
	});

	it("drops duplicates, empties and tags already chosen", () => {
		const { input, onChange } = make(["ui"]);

		input.setText("ui, bug,, bug");
		void input.commit();

		expect(onChange).toHaveBeenCalledWith(["ui", "bug"]);
	});

	it("clears the text and tells the owner about the new tag", () => {
		const { input, read } = make();

		input.setText("bug");
		void input.commit();

		expect(input.text).toBe("");
		expect(input.select.query).toBe("");
		expect(read()).toEqual(["bug"]);
		expect(input.available).toEqual(["ui", "docs"]);
	});

	it("does not commit an empty text", () => {
		const { input, onChange } = make();

		input.setText("   ");
		void input.commit();

		expect(onChange).not.toHaveBeenCalled();
	});

	it("hides picked tags from the suggestions", () => {
		const { input } = make(["bug"]);

		expect(input.available).toEqual(["ui", "docs"]);
	});

	it("removes the last chip on backspace when the text is empty", () => {
		const { input, onChange, read } = make(["bug", "ui"]);

		expect(input.handleKeydown(key("Backspace"))).toBe(true);
		expect(onChange).toHaveBeenCalledWith(["bug"]);
		expect(read()).toEqual(["bug"]);
	});

	it("leaves backspace alone while text is present", () => {
		const { input, onChange } = make(["bug"]);

		input.setText("u");

		expect(input.handleKeydown(key("Backspace"))).toBe(false);
		expect(onChange).not.toHaveBeenCalled();
	});

	it("ignores space on an empty text but reports it as handled", () => {
		const { input, onChange } = make();

		expect(input.handleKeydown(key(" "))).toBe(true);
		expect(onChange).not.toHaveBeenCalled();
	});

	it("picks the active suggestion on enter instead of committing the text", () => {
		const { input, onChange, read } = make();

		input.setText("do");

		expect(input.handleKeydown(key("Enter"))).toBe(true);
		expect(read()).toEqual(["docs"]);
		expect(onChange).toHaveBeenCalledWith(["docs"]);
	});

	it("commits a typed tag that matches nothing", () => {
		const { input, read } = make();

		input.setText("fresh");
		expect(input.handleKeydown(key("Enter"))).toBe(true);

		expect(read()).toEqual(["fresh"]);
	});

	it("removes a chip by name", () => {
		const { input, onChange } = make(["bug", "ui"]);

		input.remove("bug");

		expect(onChange).toHaveBeenCalledWith(["ui"]);
	});

	it("asks the owner about unknown tags only", async () => {
		const onUnknown = vi.fn(async () => undefined);
		const { input } = make([], onUnknown);

		input.setText("bug, fresh");
		await input.commit();

		expect(onUnknown).toHaveBeenCalledTimes(1);
		expect(onUnknown).toHaveBeenCalledWith("fresh");
	});

	it("keeps the case when lowercasing is off", () => {
		let tags: string[] = [];
		const input = createTagInput({
			value: () => tags,
			onChange: (next) => {
				tags = next;
			},
			lowercase: false,
		});

		input.setText("Bug");
		void input.commit();

		expect(tags).toEqual(["Bug"]);
	});
});
