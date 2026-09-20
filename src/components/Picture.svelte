<script>
	export let picture
	export let alt
</script>

<picture>
	{#each Object.entries(picture.sources) as [format, srcset] (format)}
		<source {srcset} type="image/{format}" />
	{/each}
	<img src={picture.img.src} width={picture.img.w} height={picture.img.h} {alt} {...$$restProps} />
</picture>
