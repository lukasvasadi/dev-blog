<script>
	import { Info, CircleAlert } from '@lucide/svelte'

	const variants = {
		info: { icon: Info, color: '#5d3af7' },
		warning: { icon: CircleAlert, color: '#ceb301' }
	}

	/** @type {{ type?: keyof typeof variants, children?: import('svelte').Snippet }} */
	let { type = 'info', children } = $props()
	let { icon: Icon, color } = $derived(variants[type] ?? variants.info)
</script>

<aside class="tag {type}" role="note">
	<span aria-hidden="true"><Icon fill={color} size="34px" /></span>
	{@render children?.()}
</aside>

<style>
	aside {
		position: relative;
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 10px;
	}

	aside > :global(p) {
		margin: 0;
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
