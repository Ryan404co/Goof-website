<script lang="ts">
	import { optimizeImage, srcSet } from '$lib/storyblokImage';

	interface Project {
		id?: string;
		slug: string;
		name: string;
		hoofd_afbeelding_url: string | null;
		hoofd_afbeelding_alt?: string | null;
	}

	export let projects: Project[] = [];

	// Cards sit in a 2-column grid up to ~700px wide each on desktop, full-width on mobile
	const TILE_WIDTHS = [400, 600, 800, 1200];
	const TILE_SIZES = '(min-width: 769px) 50vw, 100vw';
</script>

<section class="projects">
	<div class="container">
		{#if projects.length === 0}
			<p class="muted">Geen projecten gevonden.</p>
		{:else}
			<div class="grid">
				{#each projects as p, i}
					<a class="card proj" href={'/werk/' + p.slug} aria-label={p.name}>
						<figure class="proj__media">
							{#if p.hoofd_afbeelding_url}
								<img
									src={optimizeImage(p.hoofd_afbeelding_url, 800)}
									srcset={srcSet(p.hoofd_afbeelding_url, TILE_WIDTHS)}
									sizes={TILE_SIZES}
									alt={p.hoofd_afbeelding_alt || p.name}
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
	@media (max-width: 900px) { .projects { padding-inline: 1.5rem; } }
	@media (max-width: 768px) {
		.projects { padding-inline: 0.5rem; }
		.grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .projects { padding-inline: 0.5rem; } }
	@media (max-width: 600px) { .card.proj { border-radius: 14px; } }

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
		aspect-ratio: 3/2;
		overflow: hidden;
		background: #ece7e4;
	}
	.proj__media img, .proj__ph {
		width: 100%;
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
	.muted { opacity: 0.7; }
	.container { width: 100%; max-width: 1400px; margin: 0 auto; }
</style>
