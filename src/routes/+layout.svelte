<script>
	import '../app.css'
	import Header from './header.svelte'
	import Footer from './footer.svelte'
	let { children } = $props()
</script>

<div class="layout">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	main {
		width: 100%;
		padding: 0 1rem;
	}

	.layout {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 2rem;
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
