<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/** Message explaining why the area is empty. */
		children: Snippet;
		/** Optional action rendered under the message, e.g. a button. */
		action?: Snippet;
		/** Extra classes on the container. */
		class?: string;
	}

	let { children, action, class: className = "" }: Props = $props();
</script>

<div class="ui-empty-state {className}" data-ui="empty-state">
	<div class="ui-empty-message">{@render children()}</div>
	{#if action}
		<div class="ui-empty-action">{@render action()}</div>
	{/if}
</div>

<style>
	.ui-empty-state {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--ui-space-3);
		padding: var(--ui-space-6) var(--ui-space-4);
		border: var(--ui-line-w) dashed var(--ui-line-strong);
		border-radius: var(--ui-r-panel);
		color: var(--ui-fg-muted);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-lg);
		line-height: var(--ui-lh);
		text-align: center;
	}

	.ui-empty-action {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--ui-space-2);
	}
</style>
