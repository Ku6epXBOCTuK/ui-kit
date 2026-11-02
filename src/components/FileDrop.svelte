<script lang="ts">
	interface Props {
		/** Text inside the drop zone. */
		label: string;
		/** Comma-separated MIME types, wildcards and extensions. */
		accept?: string;
		/** Blocks clicks, drops and keyboard activation. */
		disabled?: boolean;
		/** Called with the first accepted file; the input resets, so the same file can be picked again. */
		onpick: (file: File) => void;
		/** Extra classes on the drop zone. */
		class?: string;
	}

	let {
		label,
		accept,
		disabled = false,
		onpick,
		class: className = "",
	}: Props = $props();

	let over = $state(false);
	let input: HTMLInputElement | undefined = $state();

	function matches(file: File, pattern: string): boolean {
		const type = file.type.toLowerCase();
		if (pattern.startsWith("."))
			return file.name.toLowerCase().endsWith(pattern);
		if (pattern.endsWith("/*")) return type.startsWith(pattern.slice(0, -1));
		return type === pattern;
	}

	function allowed(file: File): boolean {
		if (!accept) return true;
		return accept
			.split(",")
			.some((pattern) => matches(file, pattern.trim().toLowerCase()));
	}

	function take(file: File | undefined) {
		if (!file || disabled || !allowed(file)) return;
		onpick(file);
	}

	function open() {
		if (!disabled) input?.click();
	}

	function ondrop(event: DragEvent) {
		event.preventDefault();
		over = false;
		take(event.dataTransfer?.files?.[0]);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			open();
		}
	}
</script>

<div
	class="ui-drop {className}"
	class:is-over={over}
	class:is-disabled={disabled}
	data-ui="file-drop"
	role="button"
	tabindex={disabled ? undefined : 0}
	aria-disabled={disabled}
	onclick={open}
	{onkeydown}
	ondragover={(event) => {
		event.preventDefault();
		if (!disabled) over = true;
	}}
	ondragleave={() => (over = false)}
	{ondrop}
>
	{label}
	<input
		bind:this={input}
		type="file"
		{accept}
		{disabled}
		onchange={(event) => {
			take(event.currentTarget.files?.[0]);
			event.currentTarget.value = "";
		}}
	/>
</div>

<style>
	.ui-drop {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 4.5rem;
		padding: var(--ui-space-4) var(--ui-space-3);
		border: 1px dashed var(--ui-line-strong);
		border-radius: var(--ui-r-control);
		background: var(--ui-field);
		color: var(--ui-fg-muted);
		font-size: var(--ui-fs-md);
		text-align: center;
		cursor: pointer;
	}

	.ui-drop:hover:not(.is-disabled) {
		border-color: var(--ui-accent);
		color: var(--ui-fg-secondary);
	}

	.ui-drop:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: 1px;
	}

	.ui-drop.is-over {
		border-style: solid;
		border-color: var(--ui-accent-ink);
		background: var(--ui-accent-surface);
		color: var(--ui-accent-ink);
	}

	.ui-drop.is-disabled {
		opacity: 0.5;
		cursor: default;
	}

	input {
		display: none;
	}
</style>
