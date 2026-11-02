<script lang="ts">
	import type { Snippet } from "svelte";

	type Tone = "muted" | "secondary" | "accent" | "danger";

	interface Props {
		/** muted by default; secondary, accent and danger change the colour. */
		tone?: Tone;
		/** Label text. */
		children: Snippet;
		/** Extra classes on the span. */
		class?: string;
	}

	let { tone = "muted", children, class: className = "" }: Props = $props();
</script>

<span class="ui-label {className}" data-ui="label" data-tone={tone}>
	{@render children()}
</span>

<style>
	.ui-label {
		font-family: var(--ui-label-font);
		font-size: var(--ui-fs-sm);
		font-weight: 600;
		line-height: var(--ui-lh);
		letter-spacing: var(--ui-label-track);
		text-transform: var(--ui-label-transform);
		color: var(--ui-fg-muted);
	}

	.ui-label[data-tone="secondary"] {
		color: var(--ui-fg-secondary);
	}

	.ui-label[data-tone="accent"] {
		color: var(--ui-accent-ink);
	}

	.ui-label[data-tone="danger"] {
		color: var(--ui-danger);
	}
</style>
