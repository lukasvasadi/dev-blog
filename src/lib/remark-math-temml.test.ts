import { mdsvex } from 'mdsvex'
import remarkMath from 'remark-math'
import { describe, expect, it } from 'vitest'
import remarkMathTemml from './remark-math-temml.js'

async function compile(markdown: string) {
	const preprocessor = mdsvex({
		extensions: ['.md'],
		remarkPlugins: [remarkMath, remarkMathTemml]
	})
	const result = await preprocessor.markup({ content: markdown, filename: 'test.md' })
	if (!result) throw new Error('mdsvex markup() returned no result')
	return result.code
}

describe('remarkMathTemml', () => {
	it('renders inline math to MathML without leaving raw braces for Svelte', async () => {
		const code = await compile('The ratio $\\frac{a}{b}$ matters.')

		expect(code).toContain('<mfrac>')
		expect(code).not.toContain('\\frac')
		expect(code).not.toMatch(/\{a\}/)
		expect(code).not.toContain('class="equation"')
	})

	it('renders display math as a numbered block equation', async () => {
		const code = await compile('$$\na = b\n$$\n\n$$\nc = d\n$$')

		expect(code).toContain('display="block"')
		expect(code).toContain('<div class="equation" id="eq-1">')
		expect(code).toContain('<span class="equation-number">(1)</span>')
		expect(code).toContain('<div class="equation" id="eq-2">')
		expect(code).toContain('<span class="equation-number">(2)</span>')
	})

	it('skips numbering for \\nonumber without consuming a number', async () => {
		const code = await compile('$$\na = b \\nonumber\n$$\n\n$$\nc = d\n$$')

		expect(code).toContain('<div class="equation">')
		expect(code).toContain('<span class="equation-number">(1)</span>')
		expect(code).not.toContain('(2)')
	})

	it('resolves \\eqref and \\ref to links, including forward references', async () => {
		const code = await compile(
			'See $\\eqref{eq:energy}$ or Eq. $\\ref{eq:energy}$.\n\n' +
				'$$\na = b\n$$\n\n$$\nE = mc^2 \\label{eq:energy}\n$$'
		)

		expect(code).toContain('<div class="equation" id="eq-energy">')
		expect(code).toContain('<a class="equation-ref" href="#eq-energy">(2)</a>')
		expect(code).toContain('<a class="equation-ref" href="#eq-energy">2</a>')
		expect(code).not.toContain('label')
	})

	it('fails the build on an unknown label', async () => {
		await expect(compile('See $\\eqref{eq:missing}$.')).rejects.toThrow(/Unknown equation label/)
	})

	it('fails the build on invalid LaTeX', async () => {
		await expect(compile('$$\n\\frac{a}{\n$$')).rejects.toThrow(/Invalid LaTeX/)
	})

	it('leaves an escaped dollar sign as text', async () => {
		const code = await compile('It costs \\$5 and \\$6.')

		expect(code).toContain('It costs $5 and $6.')
		expect(code).not.toContain('<math')
	})
})
