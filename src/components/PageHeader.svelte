<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/** Page title, rendered as the h1. */
		title: string;
		/** Trailing actions aligned to the right edge, e.g. buttons. */
		actions?: Snippet;
		/** Extra classes on the header. */
		class?: string;
	}

	let { title, actions, class: className = "" }: Props = $props();
</script>

<header class="ui-page-header {className}" data-ui="page-header">
	<h1 class="ui-page-header-title">{title}</h1>
	{#if actions}
		<div class="ui-page-header-actions">{@render actions()}</div>
	{/if}
</header>

<style>
	.ui-page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--ui-space-4);
		flex-wrap: wrap;
	}

	.ui-page-header-title {
		margin: 0;
		font-family: var(--ui-font);
		font-size: var(--ui-fs-xl);
		font-weight: 600;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: var(--ui-fg);
	}

	.ui-page-header-actions {
		display: flex;
		align-items: center;
		gap: var(--ui-space-2);
		flex-wrap: wrap;
	}
</style>
