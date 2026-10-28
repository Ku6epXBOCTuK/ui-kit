<script lang="ts">
	import Badge from "../src/components/Badge.svelte";
	import Button from "../src/components/Button.svelte";
	import Field from "../src/components/Field.svelte";
	import IconButton from "../src/components/IconButton.svelte";
	import Modal from "../src/components/Modal.svelte";
	import Select from "../src/components/Select.svelte";
	import TagInput from "../src/components/TagInput.svelte";
	import TextInput from "../src/components/TextInput.svelte";
	import { createSelect } from "../src/headless/select.svelte.ts";

	const tones = [
		"neutral",
		"accent",
		"success",
		"warning",
		"danger",
		"info",
	] as const;
	const variants = ["soft", "solid", "outline"] as const;
	const statuses = [
		"backlog",
		"open",
		"in-progress",
		"blocked",
		"done",
		"cancelled",
	];

	let name = $state("");
	let email = $state("not-an-email");
	let modalOpen = $state(false);

	let single = $state<string | null>("open");
	const one = createSelect<string>({
		items: () => statuses,
		getLabel: (status) => status,
		onPick: (status) => {
			single = status;
		},
	});

	let picked = $state<string[]>(["open"]);
	const multi = createSelect<string>({
		items: () => statuses,
		getLabel: (status) => status,
		closeOnPick: false,
		onPick: (status) => {
			picked = picked.includes(status)
				? picked.filter((item) => item !== status)
				: [...picked, status];
		},
	});

	let tags = $state(["bug", "ui"]);
	const tagSuggestions = [
		"bug",
		"ui",
		"docs",
		"perf",
		"a11y",
		"select",
		"modal",
	];
</script>

{#snippet plus()}
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	>
		<path d="M12 5v14M5 12h14" />
	</svg>
{/snippet}

{#snippet trash()}
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	>
		<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
	</svg>
{/snippet}

{#snippet caret()}
	<span class="ui-select-trigger-caret" aria-hidden="true">▾</span>
{/snippet}

{#snippet singleTrigger()}
	<button
		type="button"
		class="ui-select-trigger"
		aria-expanded={one.open}
		aria-label="Status"
		onclick={() => one.toggle()}
	>
		<span class="ui-select-trigger-label">{single ?? "Pick a status"}</span>
		{@render caret()}
	</button>
{/snippet}

{#snippet multiTrigger()}
	<button
		type="button"
		class="ui-select-trigger"
		aria-expanded={multi.open}
		aria-label="Status filter"
		onclick={() => multi.toggle()}
	>
		<span class="ui-select-trigger-label">Status</span>
		<span class="ui-select-trigger-meta">{picked.length}</span>
		{@render caret()}
	</button>
{/snippet}

{#snippet plainOption(status: string)}
	<span class="ui-select-option-label">{status}</span>
{/snippet}

{#snippet markOption(status: string)}
	<span class="ui-select-option-mark" aria-hidden="true">
		{#if picked.includes(status)}✓{/if}
	</span>
	<span class="ui-select-option-label">{status}</span>
{/snippet}

{#snippet clearFooter()}
	<button type="button" onclick={() => (picked = [])}>Clear all</button>
{/snippet}

<div class="row">
	<span class="row-label">button / variant</span>
	<Button variant="primary" icon={plus}>Create</Button>
	<Button>Secondary</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="danger">Delete</Button>
	<Button variant="primary" loading>Saving</Button>
	<Button disabled>Disabled</Button>
</div>

<div class="row">
	<span class="row-label">button / size</span>
	<Button size="sm">Small</Button>
	<Button size="md">Medium</Button>
	<Button size="lg">Large</Button>
</div>

<div class="row">
	<span class="row-label">icon button</span>
	<IconButton label="Add">{@render plus()}</IconButton>
	<IconButton label="Remove" variant="secondary">{@render trash()}</IconButton>
	<IconButton label="Selected" active>{@render plus()}</IconButton>
	<IconButton label="Disabled" disabled>{@render plus()}</IconButton>
</div>

<div class="row">
	<span class="row-label">badge / tone (soft)</span>
	{#each tones as tone (tone)}
		<Badge {tone} dot>{tone}</Badge>
	{/each}
</div>

<div class="row">
	<span class="row-label">badge / variant (danger)</span>
	{#each variants as variant (variant)}
		<Badge tone="danger" {variant}>{variant}</Badge>
	{/each}
	<Badge variant="outline" size="md">medium</Badge>
</div>

<div class="row">
	<span class="row-label">field + input</span>
	<Field label="Project name" hint="Shown in the sidebar." required>
		{#snippet children(id)}
			<TextInput {id} bind:value={name} placeholder="untitled" />
		{/snippet}
	</Field>
	<Field label="Email" error="Enter a valid address.">
		{#snippet children(id)}
			<TextInput {id} type="email" invalid bind:value={email} />
		{/snippet}
	</Field>
	<Field label="Read only">
		{#snippet children(id)}
			<TextInput {id} value="locked" disabled />
		{/snippet}
	</Field>
</div>

<div class="row">
	<span class="row-label">select / single, searchable</span>
	<div class="block">
		<Select
			select={one}
			getKey={(status) => status}
			trigger={singleTrigger}
			option={plainOption}
			searchable
			searchPlaceholder="Filter statuses"
			listLabel="Status"
			isSelected={(status) => status === single}
			variant="field"
		/>
	</div>
</div>

<div class="row">
	<span class="row-label">select / multiselect, filter</span>
	<Select
		select={multi}
		getKey={(status) => status}
		trigger={multiTrigger}
		option={markOption}
		footer={clearFooter}
		listLabel="Statuses"
		multiselect
		isSelected={(status) => picked.includes(status)}
	/>
</div>

<div class="row">
	<span class="row-label">modal</span>
	<div class="block">
		<Button onclick={() => (modalOpen = true)}>Open dialog</Button>
		<Modal
			open={modalOpen}
			title="Delete task"
			size="wide"
			dismissable
			onclose={() => (modalOpen = false)}
		>
			<p>This task and its comments will be gone.</p>
			<Field label="Reason" hint="Shown in the activity feed.">
				{#snippet children(id)}
					<TextInput {id} placeholder="Optional" />
				{/snippet}
			</Field>
			<div
				style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px;"
			>
				<Button onclick={() => (modalOpen = false)}>Cancel</Button>
				<Button variant="danger" onclick={() => (modalOpen = false)}
					>Delete</Button
				>
			</div>
		</Modal>
	</div>
</div>

<div class="row">
	<span class="row-label">tag input</span>
	<div class="block">
		<TagInput
			value={tags}
			onchange={(next) => (tags = next)}
			suggestions={tagSuggestions}
			ariaLabel="Tags"
		/>
	</div>
</div>

<style>
	.block {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}
</style>
