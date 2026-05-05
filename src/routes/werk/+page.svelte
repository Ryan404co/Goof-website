<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { page } from '$app/stores';
	import { textValue } from '$lib/cms/texts';
	import { optimizeImage, srcSet } from '$lib/storyblokImage';
	import type { PageData } from './$types';

	export let data: PageData;

	$: projects = data.projects;
	$: title = textValue($page.data.texts, 'werk.title', 'Werk') as string;
	$: empty = textValue($page.data.texts, 'werk.empty_text', 'Geen projecten gevonden.') as string;

	const TILE_WIDTHS = [400, 600, 800, 1200];
	const TILE_SIZES = '(min-width: 769px) 50vw, 100vw';
</script>

<Seo
	title="Werk — Goof Design"
	description="Een selectie van het werk van Goof: branding, grafisch ontwerp en webdesign voor merken met een eigen, eerlijk verhaal."
/>

<Header />

<section id="main-content" class="projects-page">
	<div class="container">
		<h1>{title}</h1>

		{#if projects.length === 0}
			<p class="error">{empty}</p>
		{:else}
			<div class="grid">
				{#each projects as project, i}
					<a class="card proj" href="/werk/{project.slug}" aria-label={project.name}>
						<figure class="proj__media">
							{#if project.hoofd_afbeelding_url}
								<img
									src={optimizeImage(project.hoofd_afbeelding_url, 800)}
									srcset={srcSet(project.hoofd_afbeelding_url, TILE_WIDTHS)}
									sizes={TILE_SIZES}
									alt={project.hoofd_afbeelding_alt || project.name}
									width="800"
									height="450"
									loading={i < 2 ? 'eager' : 'lazy'}
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

<Footer />

<style>
	.projects-page {
		padding: 90px 10px 120px;
		background: linear-gradient(to bottom, #FDFF96 0%, #FDFF96 25%, white 25%, white 100%);
		overflow-x: hidden;
		min-height: 60vh;
		max-width: 100%;
		width: 100%;
	}
	.container { width: 100%; max-width: 1400px; margin: 0 auto; box-sizing: border-box; }
	h1 {
		color: #4a5b4c;
		font-size: 2.5rem;
		font-weight: 500;
		margin-bottom: 20px;
		text-transform: lowercase;
		font-family: 'Outfit', sans-serif;
		max-width: 100%;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.5rem, 3vw, 2rem);
		max-width: 100%;
	}
	@media (max-width: 900px) { .projects-page { padding: 80px 1.5rem; } }
	@media (max-width: 768px) {
		.projects-page { padding: 40px 1rem; }
		.grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 600px) {
		.projects-page { padding: 35px 1rem; }
		.card.proj { border-radius: 14px; }
		h1 { font-size: 2rem; }
	}
	@media (max-width: 480px) { .projects-page { padding: 30px 1rem; } }

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
	@media (hover: hover) {
		.card.proj:hover { border-radius: 60%; transform: scale(0.95) rotate(-25deg); }
		.card.proj:hover .proj__media img, .card.proj:hover .proj__ph { transform: rotate(25deg) scale(1.2); }
	}
	.proj__media {
		margin: 0;
		position: relative;
		width: 100%;
		max-width: 100%;
		aspect-ratio: 3/2;
		overflow: hidden;
		background: #ece7e4;
	}
	.proj__media img, .proj__ph {
		width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		box-sizing: border-box;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.proj__ph { background: #ece7e4; }
	@media (max-width: 768px) {
		.card.proj:hover { border-radius: 18px; transform: none; }
		.card.proj:hover .proj__media img, .card.proj:hover .proj__ph { transform: none; }
	}
	.error { color: tomato; font-size: 1.2rem; text-align: center; padding: 2rem; }
</style>
