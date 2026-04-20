<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokApi } from '$lib/storyblok';
	import { optimizeStoryblokImage } from '$lib/storyblokImage';
	export let blok: any = null;
	export let projects: any[] | undefined = undefined;
	$: void blok;

	const preloaded = Array.isArray(projects) && projects.length > 0;

	const isDraft =
		typeof window !== 'undefined' &&
		(new URLSearchParams(window.location.search).has('_storyblok') ||
			new URLSearchParams(window.location.search).get('version') === 'draft');

	let internalProjects: any[] = preloaded ? projects! : [];
	let loading = !preloaded;
	let error = '';
	let timedOut = false;

	$: displayProjects = preloaded ? projects! : internalProjects;

	onMount(async () => {
		if (preloaded) return;

		const timeout = setTimeout(() => {
			if (loading) {
				timedOut = true;
				error =
					'Het laden duurt te lang (8s). Controleer je internetverbinding of je Storyblok token.';
				loading = false;
			}
		}, 8000);
		try {
			const api = useStoryblokApi();
			const { data } = await api.get('cdn/stories', {
				starts_with: 'werk/',
				version: isDraft ? 'draft' : 'published',
				per_page: 6,
				sort_by: 'position:asc'
			});
			internalProjects = data.stories;
			if (!internalProjects || internalProjects.length === 0) {
				error =
					'Geen projecten gevonden. Controleer dat de folder "werk" heet, de stories gepubliceerd zijn, en (optioneel) het content type "project" is.';
			}
			clearTimeout(timeout);
		} catch (e: any) {
			error = 'Kon projecten niet laden. ' + (e?.message || '');
			clearTimeout(timeout);
			console.error(e);
		} finally {
			if (!timedOut) {
				loading = false;
			}
		}
	});
</script>

<section class="projects">
	<div class="container">
		{#if loading}
			<p class="muted">Laden…</p>
		{:else if error}
			<p class="error">{error}</p>
		{:else}
			<div class="grid">
				{#each displayProjects as p, i}
					<a class="card proj" href={'/werk/' + p.slug} aria-label={p.name}>
						<figure class="proj__media">
							{#if p.content?.hoofdAfbeelding?.filename}
								<img
									src={optimizeStoryblokImage(p.content.hoofdAfbeelding.filename, 1200)}
									alt={p.name}
									loading="eager"
									fetchpriority={i < 2 ? 'high' : 'auto'}
									decoding="async"
								/>
							{:else}
								<div class="proj__ph"></div>
							{/if}
						</figure>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.projects {
		padding: clamp(2rem, 8vw, 8rem) 10px;
		background: linear-gradient(to bottom, #FDFF96 0%, #FDFF96 25%, white 25%, white 100%);
		overflow-x: hidden;
		font-family: 'Outfit', sans-serif;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.5rem, 3vw, 2rem);
	}
	@media (max-width: 900px) {
		.projects {
			padding-inline: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.projects {
			padding-inline: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.projects {
			padding-inline: 0.5rem;
		}
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.card.proj {
			border-radius: 14px;
		}
	}

	.card.proj {
		display: block;
		position: relative;
		border-radius: 18px;
		text-decoration: none;
		color: inherit;
		overflow: hidden;
		max-width: 100%;
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card.proj:hover {
		border-radius: 60%;
		transform: scale(0.95) rotate(-25deg);
	}

	.proj__media {
		margin: 0;
		position: relative;
		width: 100%;
		overflow: hidden;
	}
	.proj__media img,
	.proj__ph {
		width: 100%;
		aspect-ratio: 16/9;
		object-fit: cover;
		display: block;
		box-sizing: border-box;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card.proj:hover .proj__media img,
	.card.proj:hover .proj__ph {
		transform: rotate(25deg) scale(1.2);
	}
	.proj__ph {
		background: #ece7e4;
	}

	@media (max-width: 768px) {
		.card.proj:hover {
			border-radius: 18px;
			transform: none;
		}

		.card.proj:hover .proj__media img,
		.card.proj:hover .proj__ph {
			transform: none;
		}
	}

	.muted {
		opacity: 0.7;
	}
	.error {
		color: tomato;
	}

	.container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
	}
</style>
