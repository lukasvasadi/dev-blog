type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari gets upset over dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}

// Post frontmatter can only store a path string, not an import, so OG image
// URLs are resolved from the bundled asset at request time via this glob.
const images = import.meta.glob('/src/lib/images/**/*.{jpg,jpeg,png}', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>

export function resolveImage(path: string) {
	// Some posts reference a fully-qualified remote image (e.g. an external
	// wiki asset) instead of a bundled one — pass those straight through.
	if (path.startsWith('http://') || path.startsWith('https://')) return path

	const url = images[`/src/lib/images/${path}`]
	if (!url) throw new Error(`Image not found: ${path}`)
	return url
}
