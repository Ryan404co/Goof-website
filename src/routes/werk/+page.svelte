<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	export let data;

	$: projects = data.projects;
</script>

<Header />

<section class="projects-page">
	<div class="container">
		<h1>Werk</h1>

		{#if projects.length === 0}
			<p class="error">Geen projecten gevonden.</p>
		{:else}
			<div class="grid">
				{#each projects as project}
					<a class="card proj" href="/werk/{project.slug}" aria-label={project.name}>
						<figure class="proj__media">
							{#if project.content?.hoofdAfbeelding?.filename}
								<img
									src={project.content.hoofdAfbeelding.filename}
									alt={project.name}
									loading="lazy"
									decoding="async"
								/>
							{:else}
								<div class="proj__ph"></div>
							{/if}
						</figure>
						<div class="proj__body">
							<h3 class="proj__title">{project.name}</h3>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<Footer />

<style>
	.projects-page {
		padding: clamp(2rem, 6vw, 4rem) 0;
		background: linear-gradient(to bottom, #fdff96 0%, #fdff96 10%, transparent 20%);
		overflow-x: hidden;
		min-height: 60vh;
		max-width: 100vw;
	}

	.container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 10px;
		box-sizing: border-box;
	}

	h1 {
		color: #4a5b4c;
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 400;
		margin-bottom: clamp(2rem, 4vw, 3rem);
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
	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.container {
			padding: 0 1rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 0.75rem;
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
		max-width: 100%;
	}
	.proj__media img,
	.proj__ph {
		width: 100%;
		max-width: 100%;
		aspect-ratio: 16/9;
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

	.error {
		color: tomato;
		font-size: 1.2rem;
		text-align: center;
		padding: 2rem;
	}
</style>
