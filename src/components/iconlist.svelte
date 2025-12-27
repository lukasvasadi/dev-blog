<script lang="ts">
	export let html: string
	export let desc: string
</script>

<div>
	{@html html}
	<p>{desc}</p>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 1rem 0;
	}

	div > p {
		margin: 0;
	}
</style>
