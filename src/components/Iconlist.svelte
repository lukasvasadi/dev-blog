<script lang="ts">
	export let html: string
	export let desc: string
</script>

<div>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- html is a hardcoded SVG icon written in post source, not user input -->
	{@html html}
	<p>{desc}</p>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	div > p {
		margin: 0;
	}
</style>
