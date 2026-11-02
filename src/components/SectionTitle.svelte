<script lang="ts">
	import type { Snippet } from "svelte";

	type Tone = "muted" | "accent" | "danger" | "warning";
	type Size = "sm" | "md";

	interface Props {
		level?: 2 | 3 | 4;
		tone?: Tone;
		size?: Size;
		mono?: boolean;
		children: Snippet;
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
