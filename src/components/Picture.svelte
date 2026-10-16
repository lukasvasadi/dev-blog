<script>
	export let picture
	export let alt

	// Listed explicitly rather than spread. Svelte adds inline onload/onerror handlers to an
	// <img> with spread attributes, which the CSP in svelte.config.js blocks.
	/** @type {'high' | 'low' | 'auto' | undefined} */
	export let fetchpriority = undefined
	/** @type {'eager' | 'lazy' | undefined} */
	export let loading = undefined
	/** @type {'sync' | 'async' | 'auto' | undefined} */
	export let decoding = undefined
</script>

<picture>
	{#each Object.entries(picture.sources) as [format, srcset] (format)}
		<source {srcset} type="image/{format}" />
	{/each}
	<img
		src={picture.img.src}
		width={picture.img.w}
		height={picture.img.h}
		{alt}
		{fetchpriority}
		{loading}
		{decoding}
	/>
</picture>
