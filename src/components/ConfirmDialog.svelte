<script lang="ts">
	import type { Snippet } from "svelte";
	import Button from "./Button.svelte";
	import Modal from "./Modal.svelte";

	interface Props {
		/** Heading, also the accessible name of the dialog. */
		title: string;
		/** Plain text body; use children when the body needs markup. */
		body?: string;
		/** Whether the dialog is shown. */
		open?: boolean;
		/** Text of the confirm button. */
		confirmLabel?: string;
		/** Text of the cancel button. */
		cancelLabel?: string;
		/** Paints the confirm button as destructive; it is primary otherwise. */
		danger?: boolean;
		/** Disables the confirm button, for a confirm that is still running. */
		disabled?: boolean;
		/** Called by the confirm button. */
		onconfirm: () => void;
		/** Called by the cancel button, Escape and a backdrop click. */
		oncancel: () => void;
		/** Extra markup under the body. */
		children?: Snippet;
	}

	let {
		title,
		body,
		open = true,
		confirmLabel = "OK",
		cancelLabel = "Cancel",
		danger = true,
		disabled = false,
		onconfirm,
		oncancel,
		children,
	}: Props = $props();
</script>

<Modal {open} {title} dismissable onclose={oncancel}>
	{#if body}
		<p class="ui-confirm-body">{body}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
	{#snippet actions()}
		<Button onclick={oncancel}>{cancelLabel}</Button>
		<Button
			variant={danger ? "danger" : "primary"}
			{disabled}
			onclick={onconfirm}
		>
			{confirmLabel}
		</Button>
	{/snippet}
</Modal>

<style>
	.ui-confirm-body {
		margin: 0;
		font-size: var(--ui-fs-lg);
		line-height: var(--ui-lh);
		color: var(--ui-fg-secondary);
	}
</style>
