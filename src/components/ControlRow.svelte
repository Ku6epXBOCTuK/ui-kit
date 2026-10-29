<script lang="ts">
	import type { Snippet } from "svelte";

	type Align = "start" | "center" | "end";

	interface Props {
		align?: Align;
		gap?: string;
		children?: Snippet;
		end?: Snippet;
		class?: string;
	}

	let {
		align = "end",
		gap = "var(--ui-space-2)",
		children,
		end,
		class: className = "",
	}: Props = $props();
</script>

<div
	class="ui-control-row {className}"
	data-ui="control-row"
	data-align={align}
	style:gap
>
	{@render children?.()}
	{#if end}
		<div class="ui-control-row-end" style:gap>{@render end()}</div>
	{/if}
</div>

<style>
	.ui-control-row {
		display: flex;
		align-items: flex-end;
		min-width: 0;
	}

	.ui-control-row[data-align="start"] {
		align-items: flex-start;
	}

	.ui-control-row[data-align="center"] {
		align-items: center;
	}

	.ui-control-row-end {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
</style>
