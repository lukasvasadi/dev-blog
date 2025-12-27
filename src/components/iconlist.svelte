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
	}

	div > p {
		margin: 0;
	}
</style>
