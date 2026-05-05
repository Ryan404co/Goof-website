<script lang="ts">
	let { data } = $props();
	let projects = $state(data.projects);

	async function remove(id: string, name: string) {
		if (!confirm(`Project "${name}" verwijderen? Dit kan niet ongedaan gemaakt worden.`)) return;
		const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
		if (!res.ok) { alert('Kon niet verwijderen'); return; }
		projects = projects.filter((p) => p.id !== id);
	}
</script>

<svelte:head><title>Projecten — Goof Admin</title></svelte:head>

<header class="page-head">
	<div>
		<h1>projecten</h1>
		<p>Beheer projecten die op /werk verschijnen.</p>
	</div>
	<a href="/admin/projecten/new" class="new-btn">+ Nieuw project</a>
</header>

{#if projects.length === 0}
	<div class="empty">
		<p>Nog geen projecten.</p>
		<a href="/admin/projecten/new" class="new-btn">+ Eerste project toevoegen</a>
	</div>
{:else}
	<div class="list">
		{#each projects as p}
			<div class="row">
				<div class="row__thumb">
					{#if p.hoofd_afbeelding_url}
						<img src={p.hoofd_afbeelding_url} alt="" loading="lazy" />
					{:else}
						<div class="row__ph"></div>
					{/if}
				</div>
				<div class="row__info">
					<a href={`/admin/projecten/${p.id}`} class="row__name">{p.name}</a>
					<span class="row__meta">
						/{p.slug}
						{#if p.klant}· {p.klant}{/if}
						{#if p.jaar}· {p.jaar}{/if}
					</span>
				</div>
				<span class="badge" class:badge--published={p.status === 'published'}>
					{p.status === 'published' ? 'live' : 'concept'}
				</span>
				<div class="row__actions">
					<a href={`/admin/projecten/${p.id}`} class="action">Bewerk</a>
					{#if p.status === 'published'}
						<a href={`/werk/${p.slug}`} target="_blank" class="action">Bekijk</a>
					{/if}
					<button class="action danger" onclick={() => remove(p.id, p.name)}>Verwijder</button>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.page-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}
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
	.new-btn {
		background: #4a5b4c;
		color: #fdff96;
		padding: 12px 24px;
		border-radius: 50px;
		text-decoration: none;
		font-size: 0.9rem;
	}
	.new-btn:hover { background: #3a4f44; }
	.empty {
		background: white;
		border: 1px dashed #e0ddc8;
		border-radius: 16px;
		padding: 60px 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: #4a5b4c;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.row {
		display: grid;
		grid-template-columns: 60px 1fr auto auto;
		gap: 16px;
		align-items: center;
		background: white;
		border: 1px solid #e8e6dc;
		border-radius: 12px;
		padding: 12px;
	}
	.row__thumb img, .row__ph {
		width: 60px; height: 60px;
		object-fit: cover;
		border-radius: 8px;
		display: block;
		background: #f0eedf;
	}
	.row__info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
	.row__name {
		color: #4a5b4c;
		text-decoration: none;
		font-weight: 500;
		font-size: 1rem;
	}
	.row__name:hover { text-decoration: underline; }
	.row__meta {
		font-size: 0.8rem;
		color: #4a5b4c;
		opacity: 0.6;
	}
	.badge {
		font-size: 0.7rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 4px 10px;
		border-radius: 50px;
		background: #e8e6dc;
		color: #4a5b4c;
	}
	.badge--published { background: #4a5b4c; color: #fdff96; }
	.row__actions { display: flex; gap: 6px; }
	.action {
		font-family: inherit;
		font-size: 0.8rem;
		padding: 6px 12px;
		border: 1px solid #e0ddc8;
		background: #faf9f4;
		color: #4a5b4c;
		border-radius: 50px;
		cursor: pointer;
		text-decoration: none;
	}
	.action:hover { background: #fdff96; }
	.action.danger { border-color: #e8c4c4; color: #b23a3a; }
	.action.danger:hover { background: #fcebeb; }
	@media (max-width: 700px) {
		.row { grid-template-columns: 60px 1fr; grid-template-rows: auto auto; }
		.badge, .row__actions { grid-column: 1 / -1; }
		.row__actions { flex-wrap: wrap; }
	}
</style>
