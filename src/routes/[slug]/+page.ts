import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const post = await import(`../../posts/${params.slug}.md`)

	if (!post) error(404)

	return {
		content: post.default,
		meta: post.metadata
	}
}
