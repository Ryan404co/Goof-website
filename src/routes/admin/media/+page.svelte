<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Media } from '$lib/cms/database.types';

	let { data } = $props();
	let media = $state<Media[]>(data.media as Media[]);
	let uploading = $state(false);
	let errorMsg = $state('');

	async function upload(event: Event) {
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (!files || files.length === 0) return;

		uploading = true;
		errorMsg = '';
		try {
			for (const file of Array.from(files)) {
				const fd = new FormData();
				fd.append('file', file);
				const res = await fetch('/api/media', { method: 'POST', body: fd });
				if (!res.ok) {
					const err = await res.json().catch(() => ({}));
					throw new Error(err.message || `Upload van ${file.name} mislukt`);
				}
				const data = await res.json();
				media = [data.media as Media, ...media];
			}
			input.value = '';
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Upload mislukt';
		} finally {
			uploading = false;
		}
	}

	async function remove(item: Media) {
		if (!confirm(`"${item.filename}" verwijderen?`)) return;
		const res = await fetch(`/api/media/${item.id}`, { method: 'DELETE' });
		if (!res.ok) {
			alert('Kon niet verwijderen');
			return;
		}
		media = media.filter((m) => m.id !== item.id);
	}

	async function copyUrl(url: string) {
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			// noop
		}
	}
</script>

<svelte:head><title>Media — Goof Admin</title></svelte:head>

<header class="page-head">
	<div>
		<h1>media</h1>
		<p>Upload afbeeldingen die je in projecten of teksten gebruikt.</p>
	</div>
	<label class="upload">
		{uploading ? 'Uploaden…' : '+ Upload'}
		<input type="file" accept="image/*" multiple onchange={upload} disabled={uploading} hidden />
	</label>
</header>

{#if errorMsg}<div class="err">{errorMsg}</div>{/if}

<div class="grid">
	{#if media.length === 0}
		<p class="muted">Nog geen media. Upload je eerste afbeelding hierboven.</p>
	{:else}
		{#each media as m}
			<div class="tile">
				<img src={m.public_url} alt={m.alt_text || m.filename} loading="lazy" />
				<div class="tile__meta">
					<span class="tile__name" title={m.filename}>{m.filename}</span>
					<div class="tile__actions">
						<button onclick={() => copyUrl(m.public_url)}>URL kopiëren</button>
						<button class="danger" onclick={() => remove(m)}>Verwijder</button>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

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
	.upload {
		background: #4a5b4c;
		color: #fdff96;
		padding: 12px 24px;
		border-radius: 50px;
		font-size: 0.9rem;
		cursor: pointer;
	}
	.upload:hover { background: #3a4f44; }
	.err {
		background: #4a5b4c;
		color: #fdff96;
		padding: 12px 16px;
		border-radius: 12px;
		margin-bottom: 16px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 16px;
	}
	.muted {
		grid-column: 1 / -1;
		color: #4a5b4c;
		opacity: 0.6;
		text-align: center;
		padding: 60px;
	}
	.tile {
		background: white;
		border: 1px solid #e8e6dc;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.tile img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}
	.tile__meta {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.tile__name {
		font-size: 0.8rem;
		color: #4a5b4c;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tile__actions {
		display: flex;
		gap: 6px;
	}
	.tile__actions button {
		flex: 1;
		font-family: inherit;
		font-size: 0.7rem;
		padding: 6px 8px;
		border: 1px solid #e0ddc8;
		background: #faf9f4;
		color: #4a5b4c;
		border-radius: 6px;
		cursor: pointer;
	}
	.tile__actions button:hover { background: #fdff96; }
	.tile__actions .danger { border-color: #e8c4c4; color: #b23a3a; }
	.tile__actions .danger:hover { background: #fcebeb; }
</style>
