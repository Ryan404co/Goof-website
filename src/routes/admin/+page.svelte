<script lang="ts">
	let { data } = $props();
</script>

<svelte:head><title>Dashboard — Goof Admin</title></svelte:head>

<header class="page-head">
	<h1>welkom terug</h1>
	<p>Beheer hier teksten, projecten en media van goof.design.</p>
</header>

<div class="cards">
	<a href="/admin/teksten" class="card">
		<span class="card__num">{data.stats.textCount}</span>
		<span class="card__label">teksten</span>
		<span class="card__hint">Bewerk losse teksten op pagina's →</span>
	</a>
	<a href="/admin/projecten" class="card">
		<span class="card__num">{data.stats.projectsTotal}</span>
		<span class="card__label">projecten</span>
		<span class="card__hint">{data.stats.projectsPublished} live · {data.stats.projectsDraft} concept →</span>
	</a>
	<a href="/admin/media" class="card">
		<span class="card__num">{data.stats.mediaCount}</span>
		<span class="card__label">media</span>
		<span class="card__hint">Upload en beheer afbeeldingen →</span>
	</a>
</div>

<style>
	.page-head { margin-bottom: 32px; }
	.page-head h1 {
		font-size: 2.5rem;
		font-weight: 500;
		text-transform: lowercase;
		color: #4a5b4c;
		margin: 0 0 8px;
	}
	.page-head p {
		color: #4a5b4c;
		opacity: 0.7;
		font-weight: 300;
		margin: 0;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 16px;
		max-width: 900px;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 24px;
		background: white;
		border: 1px solid #e8e6dc;
		border-radius: 16px;
		text-decoration: none;
		color: #4a5b4c;
		transition: all 0.15s ease;
	}
	.card:hover {
		border-color: #4a5b4c;
		transform: translateY(-2px);
	}
	.card__num {
		font-size: 2.5rem;
		font-weight: 500;
		line-height: 1;
	}
	.card__label {
		font-size: 1.1rem;
		font-weight: 400;
		text-transform: lowercase;
	}
	.card__hint {
		font-size: 0.8rem;
		opacity: 0.6;
		margin-top: 8px;
	}
</style>
