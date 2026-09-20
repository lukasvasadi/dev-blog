<script lang="ts">
	import { resolve } from '$app/paths'
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import ogImage from '$lib/images/macbook-lifestyle.jpeg?url'
	import SEO from '../components/SEO.svelte'

	export let data
</script>

<SEO title={config.title} image={ogImage} />

<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post (post.title)}
			<li class="post">
				<a href={resolve('/[slug]', { slug: post.slug })} class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
		gap: 3rem;
	}

	.post {
		inline-size: 100%;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.post:not(:last-child) {
		border-bottom: 1px solid rgba(206, 212, 218, 0.2);
		padding-bottom: 2rem;
	}

	.title {
		font-size: clamp(2rem, 9vw, 3.5rem);
		font-family: 'Archivo', sans-serif;
		/*text-transform: capitalize;*/
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	.date {
		color: var(--text-color-subheading);
	}

	@media (min-width: 600px) {
		.post {
			max-inline-size: 700px;
		}
	}
</style>
