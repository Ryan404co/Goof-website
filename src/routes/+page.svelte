<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import ProjectList from '$lib/components/bloks/ProjectListHero.svelte';
	import TilesHero from '$lib/components/home/TilesHero.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { optimizeImage, srcSet } from '$lib/storyblokImage';
	import type { PageData } from './$types';

	export let data: PageData;

	const TILE_WIDTHS = [400, 600, 800, 1200];
	const TILE_SIZES = '(min-width: 769px) 50vw, 100vw';
</script>

<Seo
	title="Goof Design — Merken met een echt verhaal"
	description="Goof brengt merken de wereld in die echt zijn. Branding, grafisch ontwerp en webdesign vanuit Groningen, met een knipoog en een rauw randje."
/>

<svelte:head>
	{#each (data.projects ?? []).slice(0, 2) as p}
		{#if p.hoofd_afbeelding_url}
			<link
				rel="preload"
				as="image"
				href={optimizeImage(p.hoofd_afbeelding_url, 800)}
				imagesrcset={srcSet(p.hoofd_afbeelding_url, TILE_WIDTHS)}
				imagesizes={TILE_SIZES}
				fetchpriority="high"
			/>
		{/if}
	{/each}
</svelte:head>

<Header />
<div id="main-content">
	<Hero />
	<ProjectList projects={data.projects} />
	<TilesHero />
</div>

<Footer />
