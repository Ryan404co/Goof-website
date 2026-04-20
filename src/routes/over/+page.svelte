<script lang="ts">
	import FooterInverse from "$lib/components/layout/FooterInverse.svelte";
	import Header from "$lib/components/layout/Header.svelte";
	import HeroOver from "$lib/components/over/HeroOver.svelte";
	import Seo from '$lib/components/Seo.svelte';
	import { StoryblokComponent } from '$lib/storyblok';

	export let data;

	$: story = data.story;
</script>

<Seo
	title="Over — Goof Design"
	description="Over Goof: ontstaan vanuit fascinatie voor knulligheid en imperfectie. Creatieve concepten die oprecht, eerlijk en onderscheidend zijn."
/>

<Header />
<HeroOver />

{#if story?.content}
	{#each story.content.body || [] as blok}
		<StoryblokComponent {blok} />
	{/each}
{:else}
	<p style="padding: 2rem; text-align: center;">No content found. Make sure the "over" page exists in Storyblok.</p>
{/if}

<FooterInverse />