<script lang="ts">
	import type { Snippet } from "svelte";

	type Tone = "muted" | "accent" | "danger" | "warning";
	type Size = "sm" | "md";

	interface Props {
		/** Heading level 2, 3 or 4; the element follows it. */
		level?: 2 | 3 | 4;
		/** muted by default; accent for section heads, danger and warning for states. */
		tone?: Tone;
		/** sm or md. */
		size?: Size;
		/** Uses the monospace face, for paired-column heads. */
		mono?: boolean;
		/** Title text. */
		children: Snippet;
		/** Extra classes on the heading. */
		class?: string;
	}

	let {
		level = 2,
		tone = "muted",
		size = "md",
		mono = false,
		children,
		class: className = "",
	}: Props = $props();
</script>

<svelte:element
	this={`h${level}`}
	class="ui-section-title {className}"
	data-ui="section-title"
	data-tone={tone}
	data-size={size}
	data-mono={mono ? true : undefined}
>
	{@render children()}
</svelte:element>

<style>
	.ui-section-title {
		display: flex;
		align-items: center;
		gap: var(--ui-space-3);
		margin: 0;
		font-family: var(--ui-font);
		font-weight: 600;
		line-height: var(--ui-lh);
		letter-spacing: var(--ui-label-track);
		text-transform: uppercase;
		color: var(--ui-fg-muted);
	}

	.ui-section-title[data-size="sm"] {
		font-size: var(--ui-fs-sm);
	}

	.ui-section-title[data-size="md"] {
		font-size: var(--ui-fs-md);
	}

	.ui-section-title[data-tone="accent"] {
		font-weight: 700;
		color: var(--ui-accent-ink);
	}

	.ui-section-title[data-tone="danger"] {
		color: var(--ui-danger);
	}

	.ui-section-title[data-tone="warning"] {
		color: var(--ui-warning);
	}

	.ui-section-title[data-mono] {
		font-family: var(--ui-font-mono);
		font-weight: 700;
	}
</style>
