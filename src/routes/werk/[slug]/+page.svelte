<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { StoryblokComponent } from '$lib/storyblok';

	export let data;

	$: story = data.story;
	$: project = story.content;
	$: moreProjects = data.moreProjects || [];

	// Collect all available images
	$: projectImages = [
		project.afbeelding1,
		project.afbeelding2,
		project.afbeelding3,
		project.afbeelding4,
		project.afbeelding5
	].filter(img => img?.filename);
</script>

<svelte:head>
	<title>{story.name} - Goof</title>
</svelte:head>

<Header />

<article class="project-detail">
	<!-- Hero Section with Title -->
	<section class="project-hero">
		<div class="container">
			<h1>{story.name}</h1>
		</div>
	</section>

	<!-- Cover Image -->
	{#if project.hoofdAfbeelding?.filename}
		<div class="project-cover">
			<div class="container-full">
				<img
					src={project.hoofdAfbeelding.filename}
					alt={story.name}
					loading="eager"
					decoding="async"
					fetchpriority="high"
				/>
			</div>
		</div>
	{/if}

	<!-- Project Info Box -->
	<section class="project-info">
		<div class="container">
			<div class="info-box">
				<div class="info-main">
					<h2>{project.projectTitel || 'lorem ipsum dolor sit amet'}</h2>
					{#if project.projectBeschrijving}
						{#each project.projectBeschrijving.split('\n') as paragraph}
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

	<!-- Additional Images Grid -->
	{#if projectImages.length > 0}
		<section class="project-images">
			<div class="container">
				<div class="images-grid" data-count={projectImages.length}>
					{#each projectImages as image, index}
						<img
							src={image.filename}
							alt={image.alt || story.name}
							loading="lazy"
							decoding="async"
							class="img-{index + 1}"
						/>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Project Content Blocks -->
	{#if project.body}
		<div class="project-content">
			<div class="container">
				{#each project.body as blok}
					<StoryblokComponent {blok} />
				{/each}
			</div>
		</div>
	{/if}
</article>

<!-- More Work Section -->
<section class="more-work">
	<div class="container-full">
		<h2>meer werk</h2>
		<div class="work-grid">
			{#each moreProjects.slice(0, 3) as otherProject}
				<a href="/werk/{otherProject.slug}" class="work-card">
					{#if otherProject.content?.hoofdAfbeelding?.filename}
						<img
							src={otherProject.content.hoofdAfbeelding.filename}
							alt={otherProject.name}
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

	.container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.container-full {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 10px;
		box-sizing: border-box;
	}

	/* Hero Section */
	.project-hero {
		background: #fdff96;
		padding: clamp(3rem, 6vw, 5rem) 0 0;
		overflow-x: hidden;
	}

	.project-hero h1 {
		color: #4a5b4c;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 400;
		line-height: 1.2;
	}

	/* Cover Image */
	.project-cover {
		background: linear-gradient(to bottom, #fdff96 0%, #fdff96 50%, white 50%, white 100%);
		padding-bottom: clamp(1rem, 2vw, 1.5rem);
		overflow-x: hidden;
	}

	.project-cover img {
		width: 100%;
		max-width: 100%;
		height: auto;
		display: block;
		border-radius: 20px;
		box-sizing: border-box;
	}

	/* Project Info Box */
	.project-info {
		padding: clamp(1rem, 2vw, 1.5rem) 0;
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
		font-weight: 600;
		margin: 0 0 2rem 0;
		line-height: 1;
		padding-top: 0;
	}

	.info-main p {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		font-weight: 400;
		line-height: 1.7;
		opacity: 0.95;
		margin: 0 0 1rem 0;
		padding: 0;
	}

	.info-main p:last-child {
		margin-bottom: 0;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-self: end;
		margin-bottom: 2rem;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.meta-item .label {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.4vw, 1.1rem);
		font-weight: 400;
		line-height: 1;
	}

	.meta-item .value {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		line-height: 1;
		font-weight: 400;
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
		font-weight: 400;
		white-space: nowrap;
		line-height: 1;
		display: inline-flex;
		align-items: center;
	}

	/* Project Images Grid */
	.project-images {
		padding: clamp(1rem, 2vw, 1.5rem) 0 clamp(2rem, 4vw, 3rem) 0;
		overflow-x: hidden;
	}

	.images-grid {
		display: grid;
		gap: clamp(1rem, 2vw, 2rem);
		max-width: 100%;
	}

	/* 3 images: all in one row */
	.images-grid[data-count="3"] {
		grid-template-columns: repeat(3, 1fr);
	}

	/* 4 images: 2 rows with 2 images each */
	.images-grid[data-count="4"] {
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
	}

	.images-grid[data-count="4"] img {
		aspect-ratio: 16/9;
		object-fit: cover;
	}

	/* 5 images: first row 2, second row 3 */
	.images-grid[data-count="5"] {
		grid-template-columns: repeat(6, 1fr);
	}

	.images-grid[data-count="5"] .img-1 {
		grid-column: span 3;
	}

	.images-grid[data-count="5"] .img-2 {
		grid-column: span 3;
	}

	.images-grid[data-count="5"] .img-3 {
		grid-column: span 2;
	}

	.images-grid[data-count="5"] .img-4 {
		grid-column: span 2;
	}

	.images-grid[data-count="5"] .img-5 {
		grid-column: span 2;
	}

	/* Default for 1-2 images */
	.images-grid[data-count="1"],
	.images-grid[data-count="2"] {
		grid-template-columns: repeat(2, 1fr);
	}

	.images-grid[data-count="1"] img {
		grid-column: span 2;
	}

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

	/* Project Content */
	.project-content {
		padding: clamp(2rem, 4vw, 3rem) 0;
		overflow-x: hidden;
	}

	/* More Work Section */
	.more-work {
		background: #4a5b4c;
		padding: clamp(1.5rem, 3vw, 2rem) 0 clamp(3rem, 6vw, 5rem) 0;
		overflow-x: hidden;
		font-family: 'Outfit', sans-serif;
	}

	.more-work h2 {
		color: #fdff96;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 400;
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

	.work-card:hover {
		border-radius: 60%;
		transform: scale(0.95) rotate(25deg);
	}

	.work-card img,
	.work-card .placeholder {
		width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		box-sizing: border-box;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.work-card:hover img,
	.work-card:hover .placeholder {
		transform: rotate(-25deg) scale(1.2);
	}

	.work-card .placeholder {
		background: #e8d9d9;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.info-box {
			grid-template-columns: 1fr 1fr;
			gap: clamp(1.5rem, 3vw, 3rem);
		}

		.info-tags {
			align-items: flex-start;
			flex-direction: row;
			flex-wrap: wrap;
			grid-column: 1 / -1;
		}

		.meta {
			flex-direction: row;
			gap: 2rem;
		}

		.work-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 900px) {
		.container {
			padding: 0 1.5rem;
		}

		.container-full {
			padding: 0 1.5rem;
		}

		.info-box {
			grid-template-columns: 1fr;
		}

		.project-cover img {
			border-radius: 16px;
		}

		.images-grid img {
			border-radius: 16px;
		}

		.work-card:hover {
			border-radius: 20px;
			transform: none;
		}

		.work-card:hover img,
		.work-card:hover .placeholder {
			transform: none;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 1rem;
		}

		.container-full {
			padding: 0 1rem;
		}

		.images-grid,
		.images-grid[data-count="3"],
		.images-grid[data-count="4"],
		.images-grid[data-count="5"] {
			grid-template-columns: 1fr !important;
		}

		.images-grid[data-count="5"] .img-1,
		.images-grid[data-count="5"] .img-2,
		.images-grid[data-count="5"] .img-3,
		.images-grid[data-count="5"] .img-4,
		.images-grid[data-count="5"] .img-5 {
			grid-column: span 1 !important;
		}

		.images-grid[data-count="1"] img {
			grid-column: span 1 !important;
		}

		.work-grid {
			grid-template-columns: 1fr;
		}

		.project-cover img {
			border-radius: 12px;
		}

		.images-grid img {
			border-radius: 12px;
		}
	}

	@media (max-width: 600px) {
		.info-box {
			padding: clamp(1.5rem, 4vw, 2.5rem);
			border-radius: 16px;
		}

		.tag {
			padding: 0.6rem 1.2rem;
			font-size: 0.9rem;
		}

		.work-card {
			border-radius: 16px;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 1rem;
		}

		.container-full {
			padding: 0 1rem;
		}

		.project-hero {
			padding: 2rem 0 1.5rem;
		}

		.project-hero h1 {
			font-size: 2rem;
		}

		.project-cover img {
			border-radius: 8px;
			max-height: 300px;
		}

		.info-box {
			padding: 1.5rem;
			gap: 1.5rem;
			border-radius: 12px;
		}

		.info-main h2 {
			font-size: 1.25rem;
		}

		.info-main p {
			font-size: 0.9rem;
		}

		.tag {
			padding: 0.5rem 1rem;
			font-size: 0.8rem;
		}

		.images-grid {
			gap: 0.75rem;
		}

		.images-grid img {
			border-radius: 8px;
		}

		.more-work {
			padding: 2.5rem 0;
		}

		.more-work h2 {
			font-size: 1.75rem;
		}

		.work-card {
			border-radius: 12px;
		}
	}
</style>
