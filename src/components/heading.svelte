<script>
	import { Link } from '@lucide/svelte'
	export let str = ''
</script>

<div>
	<a href={`#${str.toLowerCase()}`} aria-label="Link to section">
		<Link size={30} />
	</a>
	<h2 id={`${str.toLowerCase()}`}>{str}</h2>
</div>

<style>
	div {
		margin-top: 1.5rem;
		height: fit-content;
		display: flex; /* Horizontal alignment */
		align-items: center; /* Vertical centering */
		gap: 1rem;
	}

	a {
		color: inherit; /* Inherit color from parent or define a specific color */
		text-decoration: none; /* Removes default link underline */
	}

	h2 {
		font-weight: 300;
		font-size: 40px;
		scroll-margin-top: 100px; /* Offset from top of page */
	}
</style>
