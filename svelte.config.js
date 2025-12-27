import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { createHighlighter, bundledLanguages } from 'shiki'
import { mdsvex, escapeSvelte } from 'mdsvex'

// Markdown enhanced image library @ https://github.com/lzinga/mdsvex-enhanced-images
// Refer to the Svelte documentation on image rendering @ https://svelte.dev/docs/kit/images
import enhancedImage from '@lzinga/mdsvex-enhanced-images'

const highlighter = await createHighlighter({
	themes: ['one-dark-pro'],
	langs: Object.keys(bundledLanguages) // Load all supported languages
})

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = highlighter.codeToHtml(code, { lang, theme: 'one-dark-pro' })
			return `{@html \`${escapeSvelte(html)}\`}`
		}
	},
	remarkPlugins: [
		[
			enhancedImage,
			{
				// Optional: Attributes to add to **all** `img` tags
				attributes: {
					fetchpriority: 'auto', // Browser default
					loading: 'eager', // Browser default
					decoding: 'auto' // Browser default
				}
				// Optional: imagetools directives to add to **all** `img` tags
				// imagetoolsDirectives: {
				// 	tint: 'rgba(10,33,127)',
				// 	blur: 10
				// }
			}
		]
	]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
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
