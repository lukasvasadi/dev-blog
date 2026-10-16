import { mdsvex } from 'mdsvex'
import { describe, expect, it } from 'vitest'
import remarkHeadingLinks from './remark-heading-links.js'

async function compile(markdown: string) {
	const preprocessor = mdsvex({
		extensions: ['.md'],
		remarkPlugins: [remarkHeadingLinks]
	})
	const result = await preprocessor.markup({ content: markdown, filename: 'test.md' })
	if (!result) throw new Error('mdsvex markup() returned no result')
	return result.code.trim()
}

/** Drops the icon markup so assertions can focus on structure */
const withoutIcon = (code: string) => code.replace(/<svg .*?<\/svg>/g, '')

describe('remarkHeadingLinks', () => {
	it('gives a heading a slug id and wraps its text in a link to it', async () => {
		const code = await compile('## Basic utilities')

		expect(withoutIcon(code)).toBe(
			'<h2 id="basic-utilities"><a href="#basic-utilities" class="heading-link">Basic utilities</a></h2>'
		)
	})

	it('puts a decorative link icon inside the link', async () => {
		const code = await compile('## Setup')

		expect(code).toMatch(/<a [^>]*class="heading-link"><svg class="heading-link-icon"/)
		expect(code).toContain('aria-hidden="true"')
	})

	it('processes h2 to h4 only by default', async () => {
		const code = await compile('# One\n\n## Two\n\n### Three\n\n#### Four\n\n##### Five')

		expect(code).toContain('<h1>One</h1>')
		expect(code).toContain('<h2 id="two">')
		expect(code).toContain('<h3 id="three">')
		expect(code).toContain('<h4 id="four">')
		expect(code).toContain('<h5>Five</h5>')
	})

	it('drops punctuation from slugs', async () => {
		const code = await compile('## C/C++ SDK setup: part 1 (draft)')

		expect(code).toContain('<h2 id="cc-sdk-setup-part-1-draft">')
	})

	it('keeps inline markdown in the heading and uses its text for the slug', async () => {
		const code = await compile('### Configure `git` *globally*')

		expect(withoutIcon(code)).toBe(
			'<h3 id="configure-git-globally"><a href="#configure-git-globally" class="heading-link">Configure <code>git</code> <em>globally</em></a></h3>'
		)
	})

	it('suffixes repeated headings within a post', async () => {
		const code = await compile('## Setup\n\n## Setup\n\n## Setup')

		expect(code).toContain('<h2 id="setup">')
		expect(code).toContain('<h2 id="setup-1">')
		expect(code).toContain('<h2 id="setup-2">')
	})

	it('only adds the id to a heading that already contains a link', async () => {
		const code = await compile('## See [the docs](https://example.com)')

		expect(code).toMatch(
			/^<h2 id="see-the-docs">See <a href="https:\/\/example.com"[^>]*>the docs<\/a><\/h2>$/
		)
	})

	it('does not nest a link around a raw HTML anchor', async () => {
		const code = await compile('## <a href="/elsewhere">Elsewhere</a>')

		expect(code).toBe('<h2 id="elsewhere"><a href="/elsewhere">Elsewhere</a></h2>')
	})

	it('falls back to a generic slug when the heading has no text', async () => {
		const code = await compile('## ???')

		expect(code).toContain('<h2 id="section">')
	})
})
