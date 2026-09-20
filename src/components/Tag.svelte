<script>
	import { Info, AlertCircle } from '@lucide/svelte'

	export let tagtype = 'info'
	export let msg = ''
</script>

<p class="tag {tagtype}">
	<span>
		{#if tagtype == 'info'}
			<Info fill="#5d3af7" size="34px" />
		{:else}
			<AlertCircle fill="#ceb301" size="34px" />
		{/if}
	</span>{@html msg}<!-- eslint-disable-line svelte/no-at-html-tags -- msg is hardcoded tag text written in post source, not user input -->
</p>

<style>
	p {
		position: relative;
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 10px;
	}

	span {
		position: absolute;
		top: -1.2rem;
		left: 0.5rem;
	}

	.info {
		background: #5d3af7;
		color: var(--text-color);
	}

	.warning {
		background: #ceb301;
		color: var(--text-color-alt);
	}
</style>
