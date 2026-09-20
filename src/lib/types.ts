export type Post = {
	title: string
	slug: string
	description: string
	date: string
	image: string
	categories: string[]
	published: boolean
}

export type CommandList = {
	cmd: string
	desc: string
}
