import { visit } from 'unist-util-visit'

const RE_RAW_LINK = /^<a[\s>]/i

// Lucide "link" icon, decorative since the heading text names the link
const LINK_ICON =
	'<svg class="heading-link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
	'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
	'<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' +
	'</svg>'

/**
 * Gives headings a slug id and wraps their text in a link to that id, so any
 * section can be linked to:
 *
 *     ## Basic utilities
 *
 * renders as
 *
 *     <h2 id="basic-utilities"><a class="heading-link" href="#basic-utilities">
 *       <svg …/>Basic utilities</a></h2>
 *
 * Repeated headings within a post get -1, -2, … suffixes. A heading that
 * already contains a link (markdown or raw <a>) only gets the id, since links
 * cannot be nested.
 *
 * @param {{ depths?: number[] }} [options] Heading levels to process
 */
export default function remarkHeadingLinks({ depths = [2, 3, 4] } = {}) {
	/** @param {any} tree */
	return function transformer(tree) {
		/** @type {Map<string, number>} */
		const seen = new Map()

		visit(tree, 'heading', (node) => {
			if (!depths.includes(node.depth)) return

			const base = slugify(textOf(node)) || 'section'
			const count = seen.get(base) ?? 0
			seen.set(base, count + 1)
			const id = count ? `${base}-${count}` : base

			node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }

			let hasLink = false
			visit(node, (child) => {
				if (child.type === 'link' || (child.type === 'html' && RE_RAW_LINK.test(child.value))) {
					hasLink = true
				}
			})
			if (hasLink) return

			node.children = [
				{
					type: 'link',
					url: `#${id}`,
					data: { hProperties: { className: ['heading-link'] } },
					children: [{ type: 'html', value: LINK_ICON }, ...node.children]
				}
			]
		})
	}
}

/**
 * Plain text of a node, from its text and inline code descendants.
 *
 * @param {any} node
 * @returns {string}
 */
function textOf(node) {
	if (node.type === 'text' || node.type === 'inlineCode') return node.value
	return (node.children ?? []).map(textOf).join('')
}

/**
 * Lowercases, drops punctuation, and joins words with hyphens, e.g.
 * "C/C++ SDK setup" becomes "cc-sdk-setup".
 *
 * @param {string} text
 */
function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.trim()
		.replace(/[\s-]+/g, '-')
}
