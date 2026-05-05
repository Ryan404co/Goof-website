<script lang="ts">
	import FooterInverse from '$lib/components/layout/FooterInverse.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import HeroOver from '$lib/components/over/HeroOver.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import OverGoof from '$lib/components/bloks/OverGoof.svelte';
	import { page } from '$app/stores';
	import { textString } from '$lib/cms/texts';

	$: t = $page.data.texts;
	$: blok = {
		title: textString(t, 'over.body.title', 'over goof'),
		intro: textString(t, 'over.body.intro', ''),
		body1: textString(t, 'over.body.body1', ''),
		body2: textString(t, 'over.body.body2', ''),
		image: { filename: textString(t, 'over.body.image_url', '') }
	};
</script>

<Seo
	title="Over — Goof Design"
	description="Over Goof: ontstaan vanuit fascinatie voor knulligheid en imperfectie. Creatieve concepten die oprecht, eerlijk en onderscheidend zijn."
/>

<Header />
<div id="main-content">
	<HeroOver />
	<OverGoof {blok} />
</div>

<FooterInverse />
