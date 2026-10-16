import { error } from '@sveltejs/kit'
import { resolveImage } from '$lib/utils'

export async function load({ params }) {
	// A missing post rejects the import, which would otherwise surface as a 500
	const post = await import(`../../posts/${params.slug}.md`).catch(() => error(404))

	return {
		content: post.default,
		meta: {
			...post.metadata,
			image: post.metadata.image ? resolveImage(post.metadata.image) : undefined
		}
	}
}
