<script lang="ts">
	import * as config from '$lib/config'
</script>

<footer>
	<p>{config.title} &copy {new Date().getFullYear()}</p>
</footer>

<style>
	footer {
		margin-top: 4rem;
		padding-block: 2rem;
		border-top: 0.5px solid var(--border-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	p {
		color: inherit;
	}
</style>
