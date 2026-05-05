<script lang="ts">
	import ProjectForm from '$lib/components/admin/ProjectForm.svelte';
</script>

<svelte:head><title>Nieuw project — Goof Admin</title></svelte:head>

<header class="page-head">
	<a href="/admin/projecten" class="back">← Projecten</a>
	<h1>nieuw project</h1>
</header>

<ProjectForm mode="create" />

<style>
	.page-head { margin-bottom: 24px; }
	.back {
		display: inline-block;
		font-size: 0.85rem;
		color: #4a5b4c;
		text-decoration: none;
		opacity: 0.6;
		margin-bottom: 8px;
	}
	.back:hover { opacity: 1; }
	h1 {
		font-size: 2.5rem;
		font-weight: 500;
		text-transform: lowercase;
		color: #4a5b4c;
		margin: 0;
	}
</style>
