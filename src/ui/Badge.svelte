<script lang="ts">
	import type { Snippet } from "svelte";

	type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
	type Variant = "soft" | "solid" | "outline";
	type Size = "sm" | "md";

	interface Props {
		tone?: Tone;
		variant?: Variant;
		size?: Size;
		dot?: boolean;
		children?: Snippet;
		class?: string;
	}

	let {
		tone = "neutral",
		variant = "soft",
		size = "sm",
		dot = false,
		children,
		class: className = "",
	}: Props = $props();
</script>

<span
	data-ui="badge"
	data-tone={tone}
	data-variant={variant}
	data-size={size}
	class="ui-badge {className}"
>
	{#if dot}<span class="ui-badge-dot" aria-hidden="true"></span>{/if}
	{#if children}{@render children()}{/if}
</span>

<style>
	.ui-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--ui-space-1);
		box-sizing: border-box;
		height: var(--ui-control-h-sm);
		padding: 0 var(--ui-space-2);
		border: var(--ui-line-w) solid transparent;
		border-radius: var(--ui-r-chip);
		font-family: var(--ui-label-font);
		font-size: var(--ui-fs-xs);
		font-weight: 600;
		line-height: 1;
		letter-spacing: var(--ui-label-track);
		text-transform: var(--ui-label-transform);
		white-space: nowrap;
	}

	.ui-badge[data-size="md"] {
		height: var(--ui-control-h-md);
		padding: 0 var(--ui-space-3);
		font-size: var(--ui-fs-sm);
	}

	.ui-badge-dot {
		flex: none;
		width: 0.5em;
		height: 0.5em;
		border-radius: var(--ui-r-pill);
		background: var(--badge-tone);
	}

	.ui-badge[data-variant="soft"] {
		background: var(--badge-surface);
		border-color: var(--badge-surface);
		color: var(--ui-fg);
	}

	.ui-badge[data-variant="outline"] {
		background: transparent;
		border-color: var(--ui-line);
		color: var(--ui-fg-secondary);
	}

	.ui-badge[data-variant="solid"] {
		background: var(--badge-tone);
		border-color: var(--badge-tone);
		color: var(--ui-on-intent);
	}

	.ui-badge[data-tone="neutral"] {
		--badge-tone: var(--ui-fg-muted);
		--badge-surface: var(--ui-bg-muted);
	}

	.ui-badge[data-tone="accent"] {
		--badge-tone: var(--ui-accent);
		--badge-surface: var(--ui-accent-surface);
	}

	.ui-badge[data-tone="success"] {
		--badge-tone: var(--ui-success);
		--badge-surface: var(--ui-success-surface);
	}

	.ui-badge[data-tone="warning"] {
		--badge-tone: var(--ui-warning);
		--badge-surface: var(--ui-warning-surface);
	}

	.ui-badge[data-tone="danger"] {
		--badge-tone: var(--ui-danger);
		--badge-surface: var(--ui-danger-surface);
	}

	.ui-badge[data-tone="info"] {
		--badge-tone: var(--ui-info);
		--badge-surface: var(--ui-info-surface);
	}
</style>
