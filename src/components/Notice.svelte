<script lang="ts">
	import type { Snippet } from "svelte";

	type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
	type Variant = "inline" | "box";
	type Size = "sm" | "md" | "lg";

	interface Props {
		tone?: Tone;
		variant?: Variant;
		size?: Size;
		role?: string;
		children: Snippet;
		class?: string;
	}

	let {
		tone = "neutral",
		variant = "inline",
		size = "md",
		role,
		children,
		class: className = "",
	}: Props = $props();
</script>

<div
	class="ui-notice {className}"
	data-ui="notice"
	data-tone={tone}
	data-variant={variant}
	data-size={size}
	{role}
>
	{@render children()}
</div>

<style>
	.ui-notice {
		--notice-ink: var(--ui-fg-muted);
		--notice-surface: var(--ui-bg-muted);

		margin: 0;
		font-family: var(--ui-font);
		line-height: var(--ui-lh);
		color: var(--notice-ink);
	}

	.ui-notice[data-size="sm"] {
		font-size: var(--ui-fs-sm);
	}

	.ui-notice[data-size="md"] {
		font-size: var(--ui-fs-md);
	}

	.ui-notice[data-size="lg"] {
		font-size: var(--ui-fs-lg);
	}

	.ui-notice[data-tone="accent"] {
		--notice-ink: var(--ui-accent-ink);
		--notice-surface: var(--ui-accent-surface);
	}

	.ui-notice[data-tone="success"] {
		--notice-ink: var(--ui-success);
		--notice-surface: var(--ui-success-surface);
	}

	.ui-notice[data-tone="warning"] {
		--notice-ink: var(--ui-warning);
		--notice-surface: var(--ui-warning-surface);
	}

	.ui-notice[data-tone="danger"] {
		--notice-ink: var(--ui-danger);
		--notice-surface: var(--ui-danger-surface);
	}

	.ui-notice[data-tone="info"] {
		--notice-ink: var(--ui-info);
		--notice-surface: var(--ui-info-surface);
	}

	.ui-notice[data-variant="box"] {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-3);
		box-sizing: border-box;
		padding: var(--ui-space-4);
		border: var(--ui-line-w) solid
			color-mix(in srgb, var(--notice-ink) 50%, var(--ui-line));
		border-radius: var(--ui-r-panel);
		background: var(--notice-surface);
		color: var(--ui-fg-secondary);
	}
</style>
