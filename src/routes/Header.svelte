<script lang="ts">
	import * as config from '$lib/config'
	import { resolve } from '$app/paths'

	const TOLERANCE = 8 // Ignore scroll jitter smaller than this [px]

	let header: HTMLElement
	let hidden = false
	let lastY = 0

	// Hide on scroll down, reveal on scroll up; always visible near the top of the page
	function onScroll() {
		const y = Math.max(0, window.scrollY) // Clamp overscroll bounce
		if (Math.abs(y - lastY) < TOLERANCE) return
		hidden = y > lastY && y > header.offsetHeight
		lastY = y
	}
</script>

<svelte:window on:scroll|passive={onScroll} />

<header bind:this={header} class:hidden>
	<nav>
		<a href={resolve('/')}>{config.title}</a>
	</nav>
</header>

<style>
	header {
		position: sticky;
		z-index: 1;
		top: 0;
		transition: transform 0.25s ease;
		width: 100%;
		height: fit-content;
		margin-bottom: 2rem;
		padding-inline: 1rem;
		background-color: var(--background-color);
		border-bottom: 1px solid var(--border-color);
	}

	/* Keyboard focus inside the header brings it back */
	header.hidden:not(:focus-within) {
		transform: translateY(-100%);
	}

	@media (prefers-reduced-motion: reduce) {
		header {
			transition: none;
		}
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
