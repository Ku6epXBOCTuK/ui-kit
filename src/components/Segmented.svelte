<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		/** Segments in display order. */
		options: Option[];
		/** Bindable value of the selected segment. */
		value?: string;
		/** Stretches the group to the container width. */
		wide?: boolean;
		/** Disables every segment. */
		disabled?: boolean;
		/** Accessible name of the radio group. */
		label: string;
		/** Called with the value of the picked segment. */
		onchange?: (value: string) => void;
		/** Extra classes on the group. */
		class?: string;
	}

	let {
		options,
		value = $bindable(),
		wide = false,
		disabled = false,
		label,
		onchange,
		class: className = "",
	}: Props = $props();

	let root = $state<HTMLDivElement | null>(null);

	const checkedIndex = $derived(
		options.findIndex((option) => option.value === value),
	);
	const tabbableIndex = $derived(checkedIndex === -1 ? 0 : checkedIndex);

	function select(option: Option, focus = false) {
		if (disabled) return;
		value = option.value;
		onchange?.(option.value);
		if (focus) {
			const buttons =
				root?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
			buttons?.[options.indexOf(option)]?.focus();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled || options.length === 0) return;

		const last = options.length - 1;
		let index = checkedIndex === -1 ? 0 : checkedIndex;

		switch (event.key) {
			case "ArrowRight":
			case "ArrowDown":
				index = index === last ? 0 : index + 1;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				index = index === 0 ? last : index - 1;
				break;
			case "Home":
				index = 0;
				break;
			case "End":
				index = last;
				break;
			default:
				return;
		}

		event.preventDefault();
		const option = options[index];
		if (option) select(option, true);
	}
</script>

<div
	class="ui-segmented {className}"
	role="radiogroup"
	aria-label={label}
	tabindex="-1"
	data-ui="segmented"
	data-wide={wide || undefined}
	bind:this={root}
	onkeydown={handleKeydown}
>
	{#each options as option, index (option.value)}
		<button
			type="button"
			role="radio"
			class="ui-segment"
			aria-checked={option.value === value}
			tabindex={index === tabbableIndex ? 0 : -1}
			{disabled}
			onclick={() => select(option)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.ui-segmented {
		display: inline-flex;
		box-sizing: border-box;
		max-width: 100%;
		overflow: hidden;
		border: 1px solid var(--ui-line);
		border-radius: var(--ui-r-control);
		background: var(--ui-surface);
	}

	.ui-segmented[data-wide] {
		display: flex;
		width: 100%;
	}

	.ui-segment {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 1 0 auto;
		padding: var(--ui-space-2) var(--ui-space-3);
		border: 0;
		border-right: 1px solid var(--ui-line);
		background: transparent;
		color: var(--ui-fg-secondary);
		font-family: var(--ui-font);
		font-size: var(--ui-fs-sm);
		line-height: 1.5;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--ui-duration) ease,
			color var(--ui-duration) ease;
	}

	.ui-segment:last-child {
		border-right: 0;
	}

	.ui-segment:hover:not(:disabled, [aria-checked="true"]) {
		background: var(--ui-hover);
		color: var(--ui-fg);
	}

	.ui-segment[aria-checked="true"] {
		background: color-mix(in oklch, var(--ui-accent) 14%, var(--ui-surface));
		box-shadow: inset 0 0 0 1px
			color-mix(in oklch, var(--ui-accent) 55%, var(--ui-line));
		color: var(--ui-fg);
	}

	.ui-segment:focus-visible {
		outline: var(--ui-focus-ring-w) solid var(--ui-focus);
		outline-offset: calc(-1 * var(--ui-focus-ring-w));
	}

	.ui-segment:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-segment {
			transition: none;
		}
	}
</style>
