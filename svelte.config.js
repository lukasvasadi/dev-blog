import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { createHighlighter, bundledLanguages } from 'shiki'
import { mdsvex, escapeSvelte } from 'mdsvex'
import remarkPictureImages from './src/lib/remark-picture-images.js'

const highlighter = await createHighlighter({
	themes: ['one-dark-pro'],
	langs: Object.keys(bundledLanguages) // Load all supported languages
})

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = highlighter.codeToHtml(code, { lang, theme: 'one-dark-pro' })
			return `{@html \`${escapeSvelte(html)}\`}`
		}
	},
	remarkPlugins: [
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
				'script-src': ['self'] // Only allow scripts from own domain
			}
		}
	}
}

export default config
