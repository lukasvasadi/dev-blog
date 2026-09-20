import { mdsvex } from 'mdsvex'
import { describe, expect, it } from 'vitest'
import remarkPictureImages from './remark-picture-images.js'

async function compile(markdown: string, options = {}) {
	const preprocessor = mdsvex({
		extensions: ['.md'],
		remarkPlugins: [[remarkPictureImages, options]]
	})
	const result = await preprocessor.markup({ content: markdown, filename: 'test.md' })
	if (!result) throw new Error('mdsvex markup() returned no result')
	return result.code
}

describe('remarkPictureImages', () => {
	it('rewrites a relative image into a vite-imagetools import and a Picture tag', async () => {
		const code = await compile('![A board](./board.jpg)')

		expect(code).toContain("import Picture from '../components/Picture.svelte'")
		expect(code).toMatch(
			/import _img\w+ from '\.\/board\.jpg\?w=750;1500&format=avif;webp;jpg&as=picture'/
		)
		expect(code).toMatch(/<Picture picture=\{_img\w+\} alt="A board"/)
	})

	it('picks the correct fallback format from the file extension', async () => {
		const code = await compile('![Alt](./diagram.png)')

		expect(code).toContain('format=avif;webp;png&as=picture')
	})

	it('leaves non-relative image URLs untouched', async () => {
		const code = await compile('![Remote](https://example.com/image.jpg)')

		expect(code).not.toContain('Picture')
		expect(code).toContain('<img src="https://example.com/image.jpg" alt="Remote">')
	})

	it('applies configured attributes to the generated tag', async () => {
		const code = await compile('![Alt](./photo.jpg)', { attributes: { loading: 'eager' } })

		expect(code).toContain('loading="eager"')
	})

	it('escapes double quotes in alt text', async () => {
		const code = await compile('![Say "hi"](./photo.jpg)')

		expect(code).toContain('alt="Say &quot;hi&quot;"')
	})
})
