import { error } from '@sveltejs/kit'
import { resolveImage } from '$lib/utils'

export async function load({ params }) {
	const post = await import(`../../posts/${params.slug}.md`)

	if (!post) error(404)

	return {
		content: post.default,
		meta: { ...post.metadata, image: resolveImage(post.metadata.image) }
	}
}
