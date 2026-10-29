<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	type Axis = "x" | "y" | "both";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		axis?: Axis;
		children?: Snippet;
	}

	let {
		axis = "y",
		children,
		class: className = "",
		...rest
	}: Props = $props();
</script>

<div
	{...rest}
	class="ui-scroll-area {className}"
	data-ui="scroll-area"
	data-axis={axis}
>
	{@render children?.()}
</div>

<style>
	.ui-scroll-area {
		box-sizing: border-box;
		padding: var(--ui-focus-room);
		margin: calc(var(--ui-focus-room) * -1);
		overflow: auto;
	}

	.ui-scroll-area[data-axis="y"] {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.ui-scroll-area[data-axis="x"] {
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>
