<script lang="ts">
	import * as config from '$lib/config'
	import { resolve } from '$app/paths'
</script>

<header>
	<nav>
		<a href={resolve('/')}>{config.title}</a>
	</nav>
</header>

<style>
	header {
		/*position: sticky;*/
		top: 0;
		width: 100%;
		height: fit-content;
		margin-bottom: 2rem;
		padding-inline: 1rem;
		background-color: var(--background-color);
		border-bottom: 1px solid var(--border-color);
	}

	nav {
		padding-block: 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	a {
		color: inherit;
		text-decoration: none;
		font-family: 'Fira Code';
		font-size: 22px;
	}
</style>
