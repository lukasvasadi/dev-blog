<script lang="ts">
	import { formatDate } from '$lib/utils'
	import SEO from '../../components/SEO.svelte'

	export let data
</script>

<SEO title={data.meta.title} image={data.meta.image} type="article" />

<article>
	<!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published {formatDate(data.meta.date)}</p>
	</hgroup>

	<!-- Post -->
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: 90vw;
		margin-inline: auto;
	}

	h1 {
		font-size: 50px;
	}

	h1 + p {
		margin: 0.5rem auto 1.5rem auto;
		color: var(--text-color-subheading);
	}

	@media (min-width: 600px) {
		h1 {
			font-size: 60px;
		}

		article {
			max-inline-size: 700px;
		}
	}
</style>
