<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	$: status = $page.status;
	$: message = status === 404
		? 'deze pagina bestaat niet meer — of heeft misschien wel nooit bestaan.'
		: 'er ging iets mis aan onze kant. probeer het zo nog eens.';
</script>

<svelte:head>
	<title>{status} — Goof Design</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Header />

<main class="error-page">
	<div class="error-wrap">
		<div class="error-num">{status}</div>
		<p class="error-msg">{message}</p>
		<div class="error-actions">
			<a href="/" class="error-btn">terug naar home</a>
			<a href="/werk" class="error-btn error-btn--alt">bekijk werk</a>
		</div>
	</div>
</main>

<Footer />

<style>
	.error-page {
		background: #fdff96;
		min-height: 70vh;
		padding: clamp(5rem, 15vh, 10rem) 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Outfit', sans-serif;
	}

	.error-wrap {
		max-width: 600px;
		text-align: center;
	}

	.error-num {
		font-size: clamp(5rem, 20vw, 12rem);
		font-weight: 500;
		color: #4a5b4c;
		line-height: 1;
		margin-bottom: 1rem;
	}

	.error-msg {
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		font-weight: 300;
		color: #4a5b4c;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.error-btn {
		display: inline-block;
		padding: 16px 32px;
		border-radius: 50px;
		background: #4a5b4c;
		color: #fdff96;
		text-decoration: none;
		font-weight: 500;
		font-size: 1rem;
		transition: filter 0.2s ease;
	}

	.error-btn--alt {
		background: transparent;
		color: #4a5b4c;
		border: 1px solid #4a5b4c;
	}

	.error-btn:hover {
		filter: brightness(1.05);
	}
</style>
