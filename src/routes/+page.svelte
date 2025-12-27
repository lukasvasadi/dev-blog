<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'

	export let data
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta property="og:image" content={'/images/macbook-lifestyle.jpg'} />
</svelte:head>

<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post (post.title)}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
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
		border-bottom: 1px solid #ced4da;
		padding-bottom: 2rem;
	}

	.title {
		font-size: clamp(2rem, 9vw, 3.5rem);
		font-family: 'Lato', sans-serif;
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

	@media (min-width: 960px) {
		.post {
			max-inline-size: 600px;
		}
	}
</style>
