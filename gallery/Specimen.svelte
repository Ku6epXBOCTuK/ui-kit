<script lang="ts">
	import Badge from "../src/ui/Badge.svelte";
	import Button from "../src/ui/Button.svelte";
	import Field from "../src/ui/Field.svelte";
	import IconButton from "../src/ui/IconButton.svelte";
	import TextInput from "../src/ui/TextInput.svelte";

	const tones = ["neutral", "accent", "success", "warning", "danger", "info"] as const;
	const variants = ["soft", "solid", "outline"] as const;

	let name = $state("");
	let email = $state("not-an-email");
</script>

{#snippet plus()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
		<path d="M12 5v14M5 12h14" />
	</svg>
{/snippet}

{#snippet trash()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
		<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
	</svg>
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
