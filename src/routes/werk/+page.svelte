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
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<Footer />

<style>
	.projects-page {
		padding: clamp(2rem, 8vw, 8rem) 0;
		background: linear-gradient(to bottom, #FDFF96 0%, #FDFF96 25%, white 25%, white 100%);
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
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card.proj:hover {
		border-radius: 60%;
		transform: scale(0.95);
	}

	.proj__media {
		margin: 0;
		position: relative;
		width: 100%;
		max-width: 100%;
		overflow: hidden;
	}
	.proj__media img,
	.proj__ph {
		width: 100%;
		max-width: 100%;
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

	.error {
		color: tomato;
		font-size: 1.2rem;
		text-align: center;
		padding: 2rem;
	}
</style>
