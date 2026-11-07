<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/** Drops the box and the dividers, for rows that bring their own frame. */
		plain?: boolean;
		/** `li` rows. */
		children: Snippet;
		/** Extra classes on the list. */
		class?: string;
	}

	let { plain = false, children, class: className = "" }: Props = $props();
</script>

<ul class="ui-list {className}" data-ui="list" data-plain={plain || undefined}>
	{@render children()}
</ul>

<style>
	.ui-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: var(--ui-line-w) solid var(--ui-line);
		border-radius: var(--ui-r-panel);
		overflow: hidden;
	}

	.ui-list[data-plain] {
		border: none;
		border-radius: 0;
		overflow: visible;
	}

	.ui-list > :global(li:not(:last-child)) {
		border-bottom: var(--ui-line-w) solid var(--ui-line);
	}

	.ui-list[data-plain] > :global(li) {
		border-bottom: none;
	}
</style>
