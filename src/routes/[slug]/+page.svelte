<script lang="ts">
	import { formatDate } from '$lib/utils'
	import SEO from '../../components/SEO.svelte'

	export let data

	// Code blocks are injected as raw HTML by the highlighter in svelte.config.js, so their
	// copy buttons are handled with one delegated listener
	function copyCode(node: HTMLElement) {
		const timers = new WeakMap<Element, ReturnType<typeof setTimeout>>()

		async function onClick(event: MouseEvent) {
			const button = (event.target as Element).closest('.copy-code')
			const code = button?.closest('.code-block')?.querySelector('pre')?.textContent
			if (!button || code == null) return

			try {
				await navigator.clipboard.writeText(code.replace(/\n$/, ''))
			} catch {
				return // Clipboard unavailable (e.g. insecure context)
			}

			button.classList.add('copied')
			button.setAttribute('aria-label', 'Copied')
			clearTimeout(timers.get(button))
			timers.set(
				button,
				setTimeout(() => {
					button.classList.remove('copied')
					button.setAttribute('aria-label', 'Copy code')
				}, 2000)
			)
		}

		node.addEventListener('click', onClick)
		return { destroy: () => node.removeEventListener('click', onClick) }
	}
</script>

<SEO title={data.meta.title} image={data.meta.image} type="article" />

<article>
	<!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published {formatDate(data.meta.date)}</p>
	</hgroup>

	<!-- Post -->
	<div class="prose" use:copyCode>
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: 100%;
		margin-inline: auto;
	}

	h1 {
		font-size: 50px;
	}

	h1 + p {
		margin: 0.5rem auto 1.5rem auto;
		color: var(--text-color-subheading);
	}

	@media (min-width: 600px) {
		h1 {
			font-size: 60px;
		}

		article {
			max-inline-size: 660px;
		}
	}
</style>
