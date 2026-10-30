<script lang="ts">
	import type { Snippet } from "svelte";
	import IconButton from "./IconButton.svelte";

	type Size = "default" | "wide" | "full";

	interface Props {
		open: boolean;
		title: string;
		label?: string;
		size?: Size;
		dismissable?: boolean;
		onclose: () => void;
		closeIcon?: Snippet;
		actions?: Snippet;
		children: Snippet;
	}

	let {
		open,
		title,
		label,
		size = "default",
		dismissable = false,
		onclose,
		closeIcon,
		actions,
		children,
	}: Props = $props();

	let panel: HTMLDialogElement | undefined = $state();
	let pressedOnBackdrop = false;

	$effect(() => {
		if (open && panel !== undefined && !panel.open) {
			panel.showModal();
			return;
		}
		if (!open && panel?.open) panel.close();
	});

	function trackPress(event: MouseEvent) {
		pressedOnBackdrop = event.target === panel;
	}

	function closeFromBackdrop(event: MouseEvent) {
		if (event.target === panel && pressedOnBackdrop) {
			panel?.close();
		}
		pressedOnBackdrop = false;
	}
</script>

<dialog
	bind:this={panel}
	class="ui-modal"
	aria-label={label ?? title}
	data-ui="modal"
	data-size={size}
	{onclose}
	onmousedown={dismissable ? trackPress : undefined}
	onclick={dismissable ? closeFromBackdrop : undefined}
>
	<div class="ui-modal-top">
		<h2 class="ui-modal-title">{title}</h2>
		<div class="ui-modal-end">
			{#if actions}
				{@render actions()}
			{/if}
			<IconButton label={`Close ${title}`} onclick={() => panel?.close()}>
				{#if closeIcon}
					{@render closeIcon()}
				{:else}
					&times;
				{/if}
			</IconButton>
		</div>
	</div>
	<div class="ui-modal-body">
		{@render children()}
	</div>
</dialog>

<style>
	.ui-modal {
		width: 30rem;
		max-width: calc(100vw - var(--ui-space-6));
		max-height: calc(100dvh - var(--ui-space-6));
		padding: 0;
		border: var(--ui-line-w) solid var(--ui-line);
		border-radius: var(--ui-r-panel);
		background: var(--ui-panel);
		color: var(--ui-fg);
		box-shadow: var(--ui-shadow-panel);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-md);
		line-height: var(--ui-lh);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.ui-modal:not([open]) {
		display: none;
	}

	.ui-modal[data-size="wide"] {
		width: 45rem;
	}

	.ui-modal[data-size="full"] {
		width: fit-content;
		max-width: calc(100dvw - var(--ui-space-6));
	}

	.ui-modal[data-size="full"] .ui-modal-body {
		padding: 0 var(--ui-space-3) var(--ui-space-3);
	}

	.ui-modal[data-size="full"] .ui-modal-top {
		padding: var(--ui-space-2) var(--ui-space-3);
	}

	.ui-modal[data-size="full"] .ui-modal-title {
		min-width: 0;
		font-size: var(--ui-fs-md);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ui-modal-end {
		flex: none;
		display: flex;
		align-items: center;
		gap: var(--ui-space-1);
	}

	.ui-modal-top {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--ui-space-2);
		padding: var(--ui-space-5) var(--ui-space-6) var(--ui-space-2);
	}

	.ui-modal-title {
		margin: 0;
		font-family: var(--ui-font);
		font-size: var(--ui-fs-lg);
		font-weight: 600;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: var(--ui-fg);
	}

	.ui-modal-body {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		padding: 0 var(--ui-space-6) var(--ui-space-6);
	}

	.ui-modal::backdrop {
		background: var(--ui-backdrop);
	}
</style>
