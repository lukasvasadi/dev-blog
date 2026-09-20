import { describe, expect, it } from 'vitest'
import { formatDate, resolveImage } from './utils'

describe('formatDate', () => {
	it('formats an ISO date string using the given locale and style', () => {
		expect(formatDate('2023-06-10')).toBe('Jun 10, 2023')
	})

	it('formats using a custom dateStyle', () => {
		expect(formatDate('2023-06-10', 'long')).toBe('June 10, 2023')
	})
})

describe('resolveImage', () => {
	it('resolves a bundled image path to a URL', () => {
		const url = resolveImage('rp2040.jpeg')
		expect(typeof url).toBe('string')
		expect(url.length).toBeGreaterThan(0)
	})

	it('passes remote URLs through unchanged', () => {
		const remote = 'https://upload.wikimedia.org/wikipedia/commons/d/db/Julia1.1.1.jpg'
		expect(resolveImage(remote)).toBe(remote)
	})

	it('throws for a path with no matching bundled image', () => {
		expect(() => resolveImage('missing.jpeg')).toThrow(/Image not found/)
	})
})
