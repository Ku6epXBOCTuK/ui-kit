<script lang="ts">
	import type { Snippet } from "svelte";
	import SectionTitle from "./SectionTitle.svelte";

	interface Props {
		/** Heading above the body; no heading when omitted. */
		title?: string;
		/** Helper text under the heading. */
		description?: string;
		/** Removes the body padding, for tables and scroll areas. */
		flush?: boolean;
		/** Panel body. */
		children: Snippet;
		/** Actions under a divider, right-aligned. */
		footer?: Snippet;
		/** Extra classes on the container. */
		class?: string;
	}

	let {
		title,
		description,
		flush = false,
		children,
		footer,
		class: className = "",
	}: Props = $props();
</script>

<section
	class="ui-panel {className}"
	data-ui="panel"
	data-flush={flush || undefined}
>
	{#if title || description}
		<header class="ui-panel-head">
			{#if title}
				<SectionTitle level={3}>{title}</SectionTitle>
			{/if}
			{#if description}
				<p class="ui-panel-description">{description}</p>
			{/if}
		</header>
	{/if}
	<div class="ui-panel-body">
		{@render children()}
	</div>
	{#if footer}
		<footer class="ui-panel-footer">
			{@render footer()}
		</footer>
	{/if}
</section>

<style>
	.ui-panel {
		display: flex;
		flex-direction: column;
		min-width: 0;
		border: var(--ui-line-w) solid var(--ui-line);
		border-radius: var(--ui-r-panel);
		background: var(--ui-panel);
		box-shadow: var(--ui-shadow-panel);
	}

	.ui-panel-head {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-1);
		padding: var(--ui-space-4) var(--ui-space-4) var(--ui-space-3);
	}

	.ui-panel-description {
		margin: 0;
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		line-height: var(--ui-lh);
		color: var(--ui-fg-muted);
	}

	.ui-panel-body {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-4);
		min-width: 0;
		padding: var(--ui-space-4);
	}

	.ui-panel[data-flush] .ui-panel-body {
		padding: 0;
	}

	.ui-panel-footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: var(--ui-space-2);
		padding: var(--ui-space-3) var(--ui-space-4);
		border-top: var(--ui-line-w) solid var(--ui-line);
	}
</style>
