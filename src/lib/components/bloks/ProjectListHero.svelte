<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokApi } from '$lib/storyblok';
	export let blok: any = null;
	$: void blok;

	const isDraft =
		typeof window !== 'undefined' &&
		(new URLSearchParams(window.location.search).has('_storyblok') ||
			new URLSearchParams(window.location.search).get('version') === 'draft');

	let projects: any[] = [];
	let loading = true;
	let error = '';
	let timedOut = false;

	onMount(async () => {
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
				// Temporarily remove content_type filter to avoid mismatches during setup
				// content_type: 'project',
				version: isDraft ? 'draft' : 'published',
				per_page: 6,
				sort_by: 'position:asc'
			});
			projects = data.stories;
			if (!projects || projects.length === 0) {
				error =
					'Geen projecten gevonden. Controleer dat de folder "werk" heet, de stories gepubliceerd zijn, en (optioneel) het content type "project" is.';
			}
			clearTimeout(timeout);
		} catch (e) {
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
				{#each projects as p}
					<a class="card proj" href={'/werk/' + p.slug} aria-label={p.name}>
						<figure class="proj__media">
							{#if p.content?.hoofdAfbeelding?.filename}
								<img
									src={p.content.hoofdAfbeelding.filename}
									alt={p.name}
									loading="lazy"
									decoding="async"
								/>
							{:else}
								<div class="proj__ph"></div>
							{/if}
						</figure>
						<div class="proj__body">
							<h3 class="proj__title">{p.name}</h3>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.projects {
		padding: clamp(2rem, 8vw, 8rem) 0;
		background: linear-gradient(to bottom, #FDFF96 0%, #FDFF96 25%, white 25%, white 100%);
		overflow-x: hidden;
		font-family: 'Outfit', sans-serif;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.5rem, 3vw, 2rem);
	}
	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 1rem;
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
	}

	.proj__media {
		margin: 0;
		position: relative;
		width: 100%;
	}
	.proj__media img,
	.proj__ph {
		width: 100%;
		aspect-ratio: 16/8;
		object-fit: cover;
		display: block;
		box-sizing: border-box;
	}
	.proj__ph {
		background: #ece7e4;
	}

	.proj__body {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 2rem 1.5rem 1.5rem;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transform: translateY(100%);
		transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: flex-end;
	}

	.card.proj:hover .proj__body {
		transform: translateY(0);
	}

	.proj__title {
		margin: 0;
		font-size: clamp(1.2rem, 2vw, 1.5rem);
		font-weight: 600;
		color: #ffffff;
		font-family: 'Outfit', sans-serif;
		line-height: 1.3;
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
		padding: 0 10px;
	}
</style>
