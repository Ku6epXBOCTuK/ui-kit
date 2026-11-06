<script lang="ts">
	import Button from "../src/components/Button.svelte";
	import Checkbox from "../src/components/Checkbox.svelte";
	import Field from "../src/components/Field.svelte";
	import FileDrop from "../src/components/FileDrop.svelte";
	import Label from "../src/components/Label.svelte";
	import Notice from "../src/components/Notice.svelte";
	import Panel from "../src/components/Panel.svelte";
	import Select from "../src/components/Select.svelte";
	import TagInput from "../src/components/TagInput.svelte";
	import TextArea from "../src/components/TextArea.svelte";
	import TextInput from "../src/components/TextInput.svelte";
	import { createSelect } from "../src/headless/select.svelte.ts";

	const statuses = ["backlog", "open", "in-progress", "blocked", "done"];
	const suggestions = ["bug", "ui", "docs", "perf", "a11y"];

	let title = $state("");
	let description = $state("");
	let status = $state<string | null>("open");
	let tags = $state(["ui"]);
	let notify = $state(true);
	let attachment = $state("");
	let touched = $state(false);
	let created = $state(false);

	const statusSelect = createSelect<string>({
		items: () => statuses,
		getLabel: (value) => value,
		onPick: (value) => {
			status = value;
		},
	});

	const titleError = $derived(
		touched && title.trim() === "" ? "Title is required." : undefined,
	);

	function submit(event: SubmitEvent) {
		event.preventDefault();
		touched = true;
		created = title.trim() !== "";
	}

	function reset() {
		title = "";
		description = "";
		status = "open";
		tags = [];
		notify = true;
		attachment = "";
		touched = false;
		created = false;
	}
</script>

{#snippet statusTrigger()}
	<button
		type="button"
		class="ui-select-trigger"
		aria-expanded={statusSelect.open}
		aria-label="Status"
		onclick={() => statusSelect.toggle()}
	>
		<span class="ui-select-trigger-label">{status ?? "Pick a status"}</span>
		<span class="ui-select-trigger-caret" aria-hidden="true">▾</span>
	</button>
{/snippet}

{#snippet statusOption(value: string)}
	<span class="ui-select-option-label">{value}</span>
{/snippet}

{#snippet formFooter()}
	<Button variant="ghost" onclick={reset}>Reset</Button>
	<Button variant="primary" type="submit" form="task-form">Create task</Button>
{/snippet}

<Panel
	title="New task"
	description="Every control on this page comes from the kit."
	footer={formFooter}
>
	<form id="task-form" class="form" onsubmit={submit} novalidate>
		{#if created}
			<Notice variant="box" tone="success" role="status">
				Task "{title}" is ready to be sent.
			</Notice>
		{/if}

		<Field
			label="Title"
			required
			error={titleError}
			hint="One line, shown in the task list."
		>
			{#snippet children(id)}
				<TextInput {id} bind:value={title} placeholder="Fix the flaky select" />
			{/snippet}
		</Field>

		<Field label="Description" hint="Markdown is rendered.">
			{#snippet children(id)}
				<TextArea
					{id}
					bind:value={description}
					rows={4}
					placeholder="What breaks and where"
				/>
			{/snippet}
		</Field>

		<div class="form-field">
			<Label>Status</Label>
			<Select
				select={statusSelect}
				getKey={(value) => value}
				trigger={statusTrigger}
				option={statusOption}
				listLabel="Status"
				variant="field"
			/>
		</div>

		<Field label="Tags" hint="Unknown tags are offered once saved.">
			{#snippet children(id)}
				<TagInput
					{id}
					value={tags}
					onchange={(next) => (tags = next)}
					{suggestions}
					ariaLabel="Tags"
				/>
			{/snippet}
		</Field>

		<div class="form-field">
			<Label>Attachment</Label>
			<FileDrop
				label="Drop a file or press Enter"
				accept="image/*,.pdf"
				onpick={(file) => (attachment = file.name)}
			/>
			{#if attachment}
				<Notice tone="info" size="sm" role="status">
					{attachment}
					will be uploaded with the task.
				</Notice>
			{/if}
		</div>

		<Field
			label="Notify watchers"
			hint="Sends one summary when the task is created."
			orientation="row"
		>
			{#snippet children(id)}
				<Checkbox {id} bind:checked={notify} />
			{/snippet}
		</Field>
	</form>
</Panel>

<Panel title="Unsaved changes" description="Form state before submit.">
	<Notice variant="box" tone={notify ? "warning" : "neutral"} role="status">
		{#if notify}
			Watchers will be emailed once the task is created.
		{:else}
			Watchers stay quiet.
		{/if}
	</Notice>
	<Label>Draft: {title.trim() || "untitled"}</Label>
</Panel>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-4);
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-1);
		min-width: 0;
	}
</style>
