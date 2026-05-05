<script lang="ts">
	import ProjectForm from '$lib/components/admin/ProjectForm.svelte';
	let { data } = $props();
</script>

<svelte:head><title>{data.project.name} — Goof Admin</title></svelte:head>

<header class="page-head">
	<a href="/admin/projecten" class="back">← Projecten</a>
	<h1>{data.project.name}</h1>
	<span class="status" class:status--live={data.project.status === 'published'}>
		{data.project.status === 'published' ? 'live' : 'concept'}
	</span>
</header>

<ProjectForm mode="edit" project={data.project} />

<style>
	.page-head {
		margin-bottom: 24px;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas: "back back" "title status";
		gap: 4px 12px;
		align-items: center;
	}
	.back {
		grid-area: back;
		display: inline-block;
		font-size: 0.85rem;
		color: #4a5b4c;
		text-decoration: none;
		opacity: 0.6;
		margin-bottom: 4px;
	}
	.back:hover { opacity: 1; }
	h1 {
		grid-area: title;
		font-size: 2.5rem;
		font-weight: 500;
		text-transform: lowercase;
		color: #4a5b4c;
		margin: 0;
	}
	.status {
		grid-area: status;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 6px 12px;
		border-radius: 50px;
		background: #e8e6dc;
		color: #4a5b4c;
	}
	.status--live { background: #4a5b4c; color: #fdff96; }
</style>
