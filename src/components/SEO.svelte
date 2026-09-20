<script lang="ts">
	export let title: string
	export let image: string
	export let type: 'website' | 'article' = 'website'
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={image} />
</svelte:head>
