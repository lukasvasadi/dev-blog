<script lang="ts">
	import type { CommandList } from '$lib/types'

	export let array: CommandList[]
</script>

<dl>
	{#each array as item (item.cmd)}
		<dt><code>{item.cmd}</code></dt>
		<dd>{@html item.desc}</dd>
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
