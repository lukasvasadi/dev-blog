/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
	plugins: [imagetools(), sveltekit()],
	resolve: {
		alias: [
			{
				// temml's Latin Modern stylesheet references this font that is not shipped with the package
				find: /^\.\/latinmodernmath\.woff2$/,
				replacement: fileURLToPath(
					new URL('./src/lib/fonts/latinmodernmath.woff2', import.meta.url)
				)
			}
		]
	},
	test: {
		environment: 'node'
	}
})
