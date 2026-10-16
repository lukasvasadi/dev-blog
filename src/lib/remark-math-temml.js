import temml from 'temml'
import { escapeSvelte } from 'mdsvex'
import { visit } from 'unist-util-visit'

const RE_LABEL = /\\label\{([^}]+)\}/
const RE_NO_NUMBER = /\\(?:nonumber|notag)\b/
const RE_REF = /^\\(eqref|ref)\{([^}]+)\}$/

/** @param {string} label */
const toId = (label) => label.replace(/[^\w-]+/g, '-')

/**
 * Renders the math nodes produced by remark-math into MathML at build time, so
 * no math library ships to the browser. Requires remark-math to run first.
 *
 * Display equations ($$ on their own lines) are numbered in document order.
 * Add \nonumber (or \notag) to skip one. A \label{key} in a display equation
 * can be referenced from prose with $\eqref{key}$, giving a linked "(n)", or
 * $\ref{key}$, giving a linked "n".
 */
export default function remarkMathTemml() {
	/**
	 * @param {any} tree
	 * @param {any} file
	 */
	return function transformer(tree, file) {
		/**
		 * @param {string} tex
		 * @param {boolean} displayMode
		 * @param {any} node
		 */
		const render = (tex, displayMode, node) => {
			try {
				return temml.renderToString(tex, { displayMode, throwOnError: true })
			} catch (err) {
				file.fail(`Invalid LaTeX: ${/** @type {Error} */ (err).message}`, node.position)
			}
		}

		// Number display equations first so references can point forward as well as back
		/** @type {Map<string, { id: string, number: number }>} */
		const labels = new Map()
		let count = 0

		visit(tree, 'math', (node) => {
			let tex = node.value
			const numbered = !RE_NO_NUMBER.test(tex)
			const label = tex.match(RE_LABEL)?.[1]
			tex = tex.replace(RE_LABEL, '').replace(RE_NO_NUMBER, '')

			let id = ''
			let tag = ''
			if (numbered) {
				count += 1
				id = label ? toId(label) : `eq-${count}`
				tag = `<span class="equation-number">(${count})</span>`
				if (label) {
					if (labels.has(label)) file.fail(`Duplicate equation label "${label}"`, node.position)
					labels.set(label, { id, number: count })
				}
			} else if (label) {
				file.fail(`Equation label "${label}" is on an unnumbered equation`, node.position)
			}

			const html =
				`<div class="equation"${id ? ` id="${id}"` : ''}>` +
				`<div class="math">${render(tex, true, node)}</div>${tag}</div>`
			node.type = 'html'
			node.value = `{@html \`${escapeSvelte(html)}\`}`
		})

		visit(tree, 'inlineMath', (node) => {
			const ref = node.value.trim().match(RE_REF)
			let html
			if (ref) {
				const target = labels.get(ref[2])
				if (!target) file.fail(`Unknown equation label "${ref[2]}"`, node.position)
				const text = ref[1] === 'eqref' ? `(${target?.number})` : `${target?.number}`
				html = `<a class="equation-ref" href="#${target?.id}">${text}</a>`
			} else {
				html = render(node.value, false, node)
			}
			node.type = 'html'
			node.value = `{@html \`${escapeSvelte(html ?? '')}\`}`
		})
	}
}
