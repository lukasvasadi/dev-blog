import { visit } from 'unist-util-visit'

const RE_SCRIPT_START = /<script(?:\s[^>]*)?>/

// vite-imagetools needs a fallback format per source extension when generating
// the <picture> "img" tag (mirrors @sveltejs/enhanced-img's own mapping).
/** @type {Record<string, string>} */
const FALLBACK_FORMAT = {
	'.avif': 'png',
	'.gif': 'gif',
	'.heif': 'jpg',
	'.jpeg': 'jpg',
	'.jpg': 'jpg',
	'.png': 'png',
	'.tiff': 'jpg',
	'.webp': 'png'
}

/**
 * Rewrites relative markdown images into vite-imagetools imports rendered
 * through the picture component, instead of relying on <enhanced:img>.
 *
 * @param {{ widths?: number[], attributes?: Record<string, string> }} [options]
 */
export default function remarkPictureImages({ widths = [750, 1500], attributes = {} } = {}) {
	const attrsStr = Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ')

	/** @param {any} tree */
	return function transformer(tree) {
		let scripts = ''

		visit(tree, 'image', (node) => {
			if (!node.url.startsWith('.')) return

			const ext = node.url.slice(node.url.lastIndexOf('.')).toLowerCase()
			const fallback = FALLBACK_FORMAT[ext] ?? 'jpg'
			const importName = `_img${Math.random().toString(36).slice(2, 11)}`

			scripts += `import ${importName} from '${node.url}?w=${widths.join(';')}&format=avif;webp;${fallback}&as=picture';\n`

			const alt = (node.alt ?? '').replace(/"/g, '&quot;')
			node.type = 'html'
			node.value = `<Picture picture={${importName}} alt="${alt}" ${attrsStr} />`
		})

		if (!scripts) return

		let scriptFound = false
		visit(tree, 'html', (node) => {
			if (RE_SCRIPT_START.test(node.value)) {
				scriptFound = true
				node.value = node.value.replace(
					RE_SCRIPT_START,
					/** @param {string} match */
					(match) => `${match}\nimport Picture from '../components/Picture.svelte'\n${scripts}`
				)
			}
		})

		if (!scriptFound) {
			tree.children.push({
				type: 'html',
				value: `<script>\nimport Picture from '../components/Picture.svelte'\n${scripts}</script>`
			})
		}
	}
}
