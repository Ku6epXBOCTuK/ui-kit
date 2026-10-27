<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		theme: "tool" | "kawaii";
		mode: "light" | "dark";
		children: Snippet;
	}

	let { theme, mode, children }: Props = $props();
</script>

<section class="pane">
	<h2 class="pane-title">{theme} / {mode}</h2>
	<div class="pane-surface" data-ui-theme={theme} data-ui-mode={mode}>
		{@render children()}
	</div>
</section>
