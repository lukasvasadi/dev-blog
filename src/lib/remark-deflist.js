import { visit } from 'unist-util-visit'

const DEF_PREFIX = ': '

/**
 * Turns a paragraph of alternating term and ": definition" lines into a
 * definition list (<dl>), following the Pandoc / PHP Markdown Extra syntax:
 *
 *     `cat`
 *     : Type out a file
 *     `head`
 *     : Show first few lines of file
 *
 * Terms and definitions keep their inline markdown (code, links, emphasis,
 * math). A paragraph that does not strictly alternate, starting with a term
 * and ending with a definition, is left untouched.
 */
export default function remarkDeflist() {
	/** @param {any} tree */
	return function transformer(tree) {
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || index === undefined) return

			const lines = splitLines(node.children)
			if (lines.length < 2 || lines.length % 2) return
			if (!lines.every((line, i) => isDefinition(line) === (i % 2 === 1))) return

			parent.children[index] = {
				type: 'definitionList',
				data: { hName: 'dl' },
				children: lines.map((line, i) =>
					i % 2
						? {
								type: 'definitionDescription',
								data: { hName: 'dd' },
								children: trim(stripPrefix(line))
							}
						: { type: 'definitionTerm', data: { hName: 'dt' }, children: trim(line) }
				)
			}
		})
	}
}

/**
 * Splits a paragraph's inline nodes into lines. Line breaks at this level are
 * either newlines in text nodes or hard breaks (a line ending in two spaces);
 * other inline nodes (code, emphasis, links) are kept whole on their line.
 *
 * @param {any[]} children
 * @returns {any[][]}
 */
function splitLines(children) {
	/** @type {any[][]} */
	const lines = [[]]
	for (const child of children) {
		if (child.type === 'break') {
			lines.push([])
			continue
		}
		if (child.type !== 'text') {
			lines[lines.length - 1].push(child)
			continue
		}
		child.value.split('\n').forEach((/** @type {string} */ part, /** @type {number} */ i) => {
			if (i > 0) lines.push([])
			if (part) lines[lines.length - 1].push({ type: 'text', value: part })
		})
	}
	return lines.filter((line) => line.length > 0)
}

/** @param {any[]} line */
function isDefinition(line) {
	return line[0]?.type === 'text' && line[0].value.startsWith(DEF_PREFIX)
}

/** @param {any[]} line */
function stripPrefix([first, ...rest]) {
	const value = first.value.slice(DEF_PREFIX.length)
	return value ? [{ ...first, value }, ...rest] : rest
}

/**
 * Removes whitespace at the edges of a line.
 *
 * @param {any[]} line
 */
function trim(line) {
	const out = [...line]
	if (out[0]?.type === 'text') out[0] = { ...out[0], value: out[0].value.trimStart() }
	const last = out.length - 1
	if (out[last]?.type === 'text') out[last] = { ...out[last], value: out[last].value.trimEnd() }
	return out.filter((n) => n.type !== 'text' || n.value)
}
