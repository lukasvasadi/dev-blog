import { mdsvex } from 'mdsvex'
import remarkMath from 'remark-math'
import { describe, expect, it } from 'vitest'
import remarkDeflist from './remark-deflist.js'
import remarkMathTemml from './remark-math-temml.js'

async function compile(markdown: string) {
	const preprocessor = mdsvex({
		extensions: ['.md'],
		remarkPlugins: [remarkMath, remarkMathTemml, remarkDeflist]
	})
	const result = await preprocessor.markup({ content: markdown, filename: 'test.md' })
	if (!result) throw new Error('mdsvex markup() returned no result')
	return result.code.trim()
}

describe('remarkDeflist', () => {
	it('renders alternating term and definition lines as a definition list', async () => {
		const code = await compile('cat\n: Type out a file\nhead\n: Show first few lines of file')

		expect(code).toBe(
			'<dl><dt>cat</dt><dd>Type out a file</dd><dt>head</dt><dd>Show first few lines of file</dd></dl>'
		)
	})

	it('keeps inline code in terms and definitions', async () => {
		const code = await compile('`$PATH`\n: Paths separated by `:`')

		expect(code).toBe(
			'<dl><dt><code>$PATH</code></dt><dd>Paths separated by <code>:</code></dd></dl>'
		)
	})

	it('keeps links and emphasis in definitions', async () => {
		const code = await compile(
			'`man`\n: View *local* docs, or see [the manual](https://example.com)'
		)

		expect(code).toContain('<dd>View <em>local</em> docs, or see <a href="https://example.com"')
		expect(code).toContain('>the manual</a></dd>')
	})

	it('keeps math in definitions', async () => {
		const code = await compile('`ratio`\n: Computes $\\frac{a}{b}$')

		expect(code).toMatch(/<dd>Computes \{@html `<math>.*<mfrac>.*<\/math>`\}<\/dd>/s)
	})

	it('trims whitespace around terms and definitions', async () => {
		const code = await compile('`ls`  \n:   List files  ')

		expect(code).toBe('<dl><dt><code>ls</code></dt><dd>List files</dd></dl>')
	})

	it('renders separate paragraphs as separate lists', async () => {
		const code = await compile('a\n: one\n\nb\n: two')

		expect(code).toBe('<dl><dt>a</dt><dd>one</dd></dl>\n<dl><dt>b</dt><dd>two</dd></dl>')
	})

	it('leaves ordinary paragraphs untouched', async () => {
		const code = await compile('Note: this has a colon\nand a second line')

		expect(code).toBe('<p>Note: this has a colon\nand a second line</p>')
	})

	it('leaves paragraphs that do not strictly alternate untouched', async () => {
		for (const markdown of [
			': definition first\nterm',
			'term\n: definition\ndangling term',
			'term one\nterm two\n: definition',
			'term\n: one\n: two'
		]) {
			expect(await compile(markdown)).toMatch(/^<p>/)
		}
	})
})
