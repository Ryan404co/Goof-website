<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { optimizeImage, srcSet } from '$lib/storyblokImage';
	import type { PageData } from './$types';

	export let data: PageData;

	$: project = data.project;
	$: moreProjects = data.moreProjects ?? [];

	$: projectImages = (project.afbeeldingen ?? []).filter((img: { url: string }) => img?.url);

	$: seoDescription =
		project.meta_description ??
		project.project_beschrijving?.split('\n')[0]?.slice(0, 155) ??
		`Een project van Goof: ${project.name}. Branding, grafisch ontwerp of webdesign met een eigen verhaal.`;
	$: seoImage = project.hoofd_afbeelding_url
		? optimizeImage(project.hoofd_afbeelding_url, 1200)
		: 'https://goof.design/og-default.jpg';

	// Hero is full-bleed up to 1400px container; gallery cells vary by count
	const HERO_WIDTHS = [800, 1200, 1600, 2000];
	const HERO_SIZES = '(min-width: 1400px) 1400px, 100vw';
	const GALLERY_WIDTHS = [400, 800, 1200, 1600];
	const GALLERY_SIZES = '(min-width: 1024px) 700px, 100vw';
	const MOREWORK_WIDTHS = [400, 600, 800];
	const MOREWORK_SIZES = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
</script>

<svelte:head>
	{#if project.hoofd_afbeelding_url}
		<link
			rel="preload"
			as="image"
			href={optimizeImage(project.hoofd_afbeelding_url, 1600)}
			imagesrcset={srcSet(project.hoofd_afbeelding_url, HERO_WIDTHS)}
			imagesizes={HERO_SIZES}
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<Seo
	title={`${project.name.toLowerCase()} — Goof Design`}
	description={seoDescription}
	image={seoImage}
	type="article"
/>

<Header />

<article id="main-content" class="project-detail">
	<section class="project-hero">
		<div class="container">
			<h1>{project.name}</h1>
		</div>
	</section>

	{#if project.hoofd_afbeelding_url}
		<div class="project-cover">
			<div class="container-full">
				<img
					src={optimizeImage(project.hoofd_afbeelding_url, 1600)}
					srcset={srcSet(project.hoofd_afbeelding_url, HERO_WIDTHS)}
					sizes={HERO_SIZES}
					alt={project.hoofd_afbeelding_alt || project.name}
					width="1600"
					height="900"
					loading="eager"
					decoding="async"
					fetchpriority="high"
				/>
			</div>
		</div>
	{/if}

	<section class="project-info">
		<div class="container">
			<div class="info-box">
				<div class="info-main">
					<h2>{project.project_titel || 'lorem ipsum dolor sit amet'}</h2>
					{#if project.project_beschrijving}
						{#each project.project_beschrijving.split('\n') as paragraph}
							{#if paragraph.trim()}
								<p>{paragraph}</p>
							{/if}
						{/each}
					{/if}
				</div>

				<div class="meta">
					{#if project.klant}
						<div class="meta-item">
							<span class="label">klant</span>
							<span class="value">{project.klant}</span>
						</div>
					{/if}
					{#if project.jaar}
						<div class="meta-item">
							<span class="label">jaar</span>
							<span class="value">{project.jaar}</span>
						</div>
					{/if}
				</div>

				<div class="info-tags">
					{#if project.tags && project.tags.length > 0}
						{#each project.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					{:else}
						<span class="tag">logo ontwerp</span>
						<span class="tag">visuele identiteit</span>
					{/if}
				</div>
			</div>
		</div>
	</section>

	{#if projectImages.length > 0}
		<section class="project-images">
			<div class="container">
				<div class="images-grid" data-count={projectImages.length}>
					{#each projectImages as image, index}
						<img
							src={optimizeImage(image.url, 1200)}
							srcset={srcSet(image.url, GALLERY_WIDTHS)}
							sizes={GALLERY_SIZES}
							alt={image.alt || project.name}
							loading="lazy"
							decoding="async"
							class="img-{index + 1}"
						/>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</article>

<section class="more-work">
	<div class="container-full">
		<h2>meer werk</h2>
		<div class="work-grid">
			{#each moreProjects.slice(0, 3) as otherProject}
				<a href="/werk/{otherProject.slug}" class="work-card">
					{#if otherProject.hoofd_afbeelding_url}
						<img
							src={optimizeImage(otherProject.hoofd_afbeelding_url, 600)}
							srcset={srcSet(otherProject.hoofd_afbeelding_url, MOREWORK_WIDTHS)}
							sizes={MOREWORK_SIZES}
							alt={otherProject.hoofd_afbeelding_alt || otherProject.name}
							width="600"
							height="375"
							loading="lazy"
							decoding="async"
						/>
					{:else}
						<div class="placeholder"></div>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</section>

<Footer />

<style>
	.project-detail {
		background: #ffffff;
		overflow-x: hidden;
		max-width: 100%;
		width: 100%;
		font-family: 'Outfit', sans-serif;
	}
	.container { width: 100%; max-width: 1400px; margin: 0 auto; box-sizing: border-box; }
	.container-full { width: 100%; max-width: 1400px; margin: 0 auto; box-sizing: border-box; }

	.project-hero {
		background: #fdff96;
		padding: 90px 10px 0;
		overflow-x: hidden;
	}
	.project-hero h1 {
		color: #4a5b4c;
		font-size: 2.5rem;
		font-weight: 500;
		line-height: 1.2;
		text-transform: lowercase;
		margin-bottom: 20px;
	}

	.project-cover {
		background: linear-gradient(to bottom, #fdff96 0%, #fdff96 50%, white 50%, white 100%);
		padding: 0 10px clamp(1rem, 2vw, 1.5rem);
		overflow-x: hidden;
	}
	.project-cover img {
		width: 100%;
		max-width: 100%;
		height: auto;
		display: block;
		border-radius: 20px;
		background: white;
		box-sizing: border-box;
	}

	.project-info {
		padding: clamp(1rem, 2vw, 1.5rem) 10px;
		overflow-x: hidden;
	}
	.info-box {
		background: #4a5b4c;
		border-radius: 20px;
		padding: clamp(2rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: 1.7fr 1fr 0.5fr;
		gap: clamp(2rem, 4vw, 4rem);
		align-items: flex-end;
		max-width: 100%;
		box-sizing: border-box;
	}
	.info-main h2 {
		color: #fdff96;
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 500;
		margin: 0 0 2rem 0;
		line-height: 1;
		padding-top: 0;
	}
	.info-main p {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		font-weight: 300;
		line-height: 1.7;
		opacity: 0.95;
		margin: 0 0 1rem 0;
		padding: 0;
	}
	.info-main p:last-child { margin-bottom: 0; }
	.meta {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-self: end;
		margin-bottom: 2rem;
	}
	.meta-item { display: flex; flex-direction: column; gap: 0.1rem; }
	.meta-item .label {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.4vw, 1.1rem);
		font-weight: 500;
		line-height: 1;
	}
	.meta-item .value {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		line-height: 1;
		font-weight: 300;
		padding-top: 8px;
	}
	.info-tags {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: flex-end;
		justify-content: flex-end;
	}
	.tag {
		background: transparent;
		border: 1px solid #fdff96;
		color: #fdff96;
		padding: clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.2rem, 2vw, 2rem);
		border-radius: 50px;
		font-size: clamp(1rem, 1.5vw, 1.3rem);
		font-weight: 300;
		white-space: nowrap;
		line-height: 1;
		display: inline-flex;
		align-items: center;
	}

	.project-images {
		padding: clamp(1rem, 2vw, 1.5rem) 10px clamp(2rem, 4vw, 3rem);
		overflow-x: hidden;
	}
	.images-grid {
		display: grid;
		gap: clamp(1rem, 2vw, 2rem);
		max-width: 100%;
	}
	.images-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
	.images-grid[data-count="4"] {
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
	}
	.images-grid[data-count="4"] img { aspect-ratio: 16/9; object-fit: contain; }
	.images-grid[data-count="5"] { grid-template-columns: repeat(6, 1fr); }
	.images-grid[data-count="5"] .img-1 { grid-column: span 3; }
	.images-grid[data-count="5"] .img-2 { grid-column: span 3; }
	.images-grid[data-count="5"] .img-3 { grid-column: span 2; }
	.images-grid[data-count="5"] .img-4 { grid-column: span 2; }
	.images-grid[data-count="5"] .img-5 { grid-column: span 2; }
	.images-grid[data-count="1"], .images-grid[data-count="2"] { grid-template-columns: repeat(2, 1fr); }
	.images-grid[data-count="1"] img { grid-column: span 2; }
	.images-grid img {
		width: 100%;
		max-width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		border-radius: 20px;
		background: #f5f5f5;
		box-sizing: border-box;
	}

	.more-work {
		background: #4a5b4c;
		padding: clamp(1.5rem, 3vw, 2rem) 10px clamp(3rem, 6vw, 5rem);
		overflow-x: hidden;
		font-family: 'Outfit', sans-serif;
	}
	.more-work h2 {
		color: #fdff96;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 500;
		margin-bottom: clamp(2rem, 3vw, 3rem);
		text-transform: lowercase;
	}
	.work-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(1rem, 2vw, 1.5rem);
		max-width: 100%;
	}
	.work-card {
		display: block;
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		background: #e8d9d9;
		aspect-ratio: 8/5;
		max-width: 100%;
		text-decoration: none;
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.work-card img, .work-card .placeholder {
		width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		box-sizing: border-box;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
	@media (hover: hover) {
		.work-card:hover {
			border-radius: 60%;
			transform: scale(0.95) rotate(-25deg);
		}
		.work-card:hover img, .work-card:hover .placeholder {
			transform: rotate(25deg) scale(1.2);
		}
	}
	.work-card .placeholder { background: #e8d9d9; }

	@media (max-width: 1024px) {
		.info-box { grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 3vw, 3rem); }
		.info-tags { align-items: flex-start; flex-direction: row; flex-wrap: wrap; grid-column: 1 / -1; }
		.meta { flex-direction: row; gap: 2rem; }
		.work-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 900px) {
		.project-hero { padding: 80px 1.5rem 0; }
		.project-cover { padding-inline: 1.5rem; }
		.project-info { padding-inline: 1.5rem; }
		.project-images { padding-inline: 1.5rem; }
		.more-work { padding-inline: 1.5rem; }
		.info-box { grid-template-columns: 1fr; }
		.project-cover img { border-radius: 16px; }
		.images-grid img { border-radius: 16px; }
		.work-card:hover { border-radius: 20px; transform: none; }
		.work-card:hover img, .work-card:hover .placeholder { transform: none; }
	}
	@media (max-width: 768px) {
		.project-hero { padding: 40px 1rem 0; }
		.project-cover { padding-inline: 1rem; }
		.project-info { padding-inline: 1rem; }
		.project-images { padding-inline: 1rem; }
		.more-work { padding-inline: 1rem; }
		.images-grid, .images-grid[data-count="3"], .images-grid[data-count="4"], .images-grid[data-count="5"] { grid-template-columns: 1fr !important; }
		.images-grid[data-count="5"] .img-1, .images-grid[data-count="5"] .img-2, .images-grid[data-count="5"] .img-3, .images-grid[data-count="5"] .img-4, .images-grid[data-count="5"] .img-5 { grid-column: span 1 !important; }
		.images-grid[data-count="1"] img { grid-column: span 1 !important; }
		.work-grid { grid-template-columns: 1fr; }
		.project-cover img { border-radius: 12px; }
		.images-grid img { border-radius: 12px; }
	}
	@media (max-width: 600px) {
		.project-hero { padding: 35px 1rem 0; }
		.project-hero h1 { font-size: 2rem; }
		.info-box { padding: clamp(1.5rem, 4vw, 2.5rem); border-radius: 16px; }
		.tag { padding: 0.6rem 1.2rem; font-size: 0.9rem; }
		.work-card { border-radius: 16px; }
	}
	@media (max-width: 480px) {
		.project-hero { padding: 30px 1rem 0; }
		.project-cover img { border-radius: 8px; max-height: 300px; }
		.info-box { padding: 1.5rem; gap: 1.5rem; border-radius: 12px; }
		.info-main h2 { font-size: 1.25rem; }
		.info-main p { font-size: 0.9rem; }
		.tag { padding: 0.5rem 1rem; font-size: 0.8rem; }
		.images-grid { gap: 0.75rem; }
		.images-grid img { border-radius: 8px; }
		.more-work { padding: 2.5rem 1rem; }
		.more-work h2 { font-size: 1.75rem; }
		.work-card { border-radius: 12px; }
	}
</style>
