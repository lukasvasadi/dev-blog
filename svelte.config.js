import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { createHighlighter, bundledLanguages } from 'shiki'
import { mdsvex, escapeSvelte } from 'mdsvex'
import remarkMath from 'remark-math'
import remarkMathTemml from './src/lib/remark-math-temml.js'
import remarkDeflist from './src/lib/remark-deflist.js'
import remarkHeadingLinks from './src/lib/remark-heading-links.js'
import remarkPictureImages from './src/lib/remark-picture-images.js'

const dev = process.env.NODE_ENV === 'development'

const highlighter = await createHighlighter({
	themes: ['one-dark-pro'],
	langs: Object.keys(bundledLanguages) // Load all supported languages
})

// Lucide "copy" and "check" icons; the click handler lives in src/routes/[slug]/+page.svelte
const icon = (/** @type {string} */ name, /** @type {string} */ paths) =>
	`<svg class="${name}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`
const copyButton =
	'<button class="copy-code" type="button" aria-label="Copy code">' +
	icon(
		'copy',
		'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
	) +
	icon('check', '<path d="M20 6 9 17l-5-5"/>') +
	'</button>'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		// A fence like ```lang title="Some caption" renders as a numbered listing. The title cannot
		// contain backticks (CommonMark forbids backticks in the info string of a backtick fence).
		highlighter: async (code, lang = 'text', meta) => {
			let html = highlighter.codeToHtml(code, { lang: lang ?? 'text', theme: 'one-dark-pro' })
			html = `<div class="code-block">${html}${copyButton}</div>`
			const title = meta?.match(/title="([^"]*)"/)?.[1]
			if (title) {
				const caption = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
				// Listing number comes from a CSS counter (see app.css)
				html = `<figure class="listing"><figcaption>${caption}</figcaption>${html}</figure>`
			}
			return `{@html \`${escapeSvelte(html)}\`}`
		}
	},
	remarkPlugins: [
		remarkMath, // Parses $...$ and $$...$$; must run before remarkMathTemml
		remarkMathTemml,
		remarkDeflist, // Turns "term\n: definition" paragraphs into <dl>
		remarkHeadingLinks, // Gives h2-h4 a slug id and a link to themselves
		[
			remarkPictureImages,
			{
				// Attributes to add to every generated Picture / img
				attributes: {
					fetchpriority: 'auto', // Browser default
					loading: 'eager', // Browser default
					decoding: 'auto' // Browser default
				}
			}
		]
	]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'script-src': ['self'], // Only allow scripts from own domain
				// Vite's dev client pings a restarting server from a blob worker
				'worker-src': dev ? ['self', 'blob:'] : ['self']
			}
		}
	}
}

export default config
