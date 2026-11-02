<script lang="ts">
	import type { Snippet } from "svelte";
	import Button from "./Button.svelte";
	import Modal from "./Modal.svelte";

	interface Props {
		title: string;
		body?: string;
		open?: boolean;
		confirmLabel?: string;
		cancelLabel?: string;
		danger?: boolean;
		disabled?: boolean;
		onconfirm: () => void;
		oncancel: () => void;
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
