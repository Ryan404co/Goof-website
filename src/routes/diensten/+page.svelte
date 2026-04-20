<script>
	import DienstenDetail from "$lib/components/diensten/DienstenDetail.svelte";
	import DienstenTiles from "$lib/components/diensten/DienstenTiles.svelte";
	import FooterInverse from "$lib/components/layout/FooterInverse.svelte";
	import HeaderInverse from "$lib/components/layout/HeaderInverse.svelte";
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Diensten — Goof Design"
	description="Branding, grafisch ontwerp en webdesign van Goof. Ontdek de werkwijze en dienst die past bij jouw merk."
/>

<HeaderInverse />
<div id="main-content">
<DienstenTiles />
<DienstenDetail />
</div>
<FooterInverse />