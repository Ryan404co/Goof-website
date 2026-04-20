<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import ProjectList from '$lib/components/bloks/ProjectListHero.svelte';
	import TilesHero from '$lib/components/home/TilesHero.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { optimizeStoryblokImage } from '$lib/storyblokImage';

	export let data;
</script>

<Seo
	title="Goof Design — Merken met een echt verhaal"
	description="Goof brengt merken de wereld in die echt zijn. Branding, grafisch ontwerp en webdesign vanuit Groningen, met een knipoog en een rauw randje."
/>

<svelte:head>
	{#each (data.projects ?? []).slice(0, 2) as p}
		{#if p.content?.hoofdAfbeelding?.filename}
			<link
				rel="preload"
				as="image"
				href={optimizeStoryblokImage(p.content.hoofdAfbeelding.filename, 1200)}
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
