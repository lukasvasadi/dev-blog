<script>
	import { math, display } from 'mathlifier'
	import 'temml/dist/Temml-Latin-Modern.css'

	export let expr = ''
	export let mode = 'display' // Alternative "inline"
</script>

{#if mode == 'display'}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- mathlifier renders trusted author-written expr into MathML, not user input -->
	{@html display(expr)}
{:else}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- mathlifier renders trusted author-written expr into MathML, not user input -->
	{@html math(expr)}
{/if}
