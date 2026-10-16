<script lang="ts">
	import type { CommandList } from '$lib/types'

	let { items }: { items: CommandList[] } = $props()
</script>

<dl>
	{#each items as { cmd, desc } (cmd)}
		<dt><code>{cmd}</code></dt>
		<!-- Backtick-delimited spans in desc render as inline code -->
		<dd>
			{#each desc.split('`') as part, i (i)}{#if i % 2}<code>{part}</code>{:else}{part}{/if}{/each}
		</dd>
	{/each}
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: max-content auto;
		column-gap: 2rem;
		row-gap: 0.7rem;
	}
</style>
