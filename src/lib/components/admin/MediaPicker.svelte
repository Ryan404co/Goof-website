<script lang="ts">
	import { onMount } from 'svelte';
	import type { Media } from '$lib/cms/database.types';

	interface Props {
		open: boolean;
		multiple?: boolean;
		onclose: () => void;
		onpick: (items: Media[]) => void;
	}

	let { open, multiple = false, onclose, onpick }: Props = $props();

	let media = $state<Media[]>([]);
	let loading = $state(false);
	let uploading = $state(false);
	let errorMsg = $state('');
	let selected = $state<Set<string>>(new Set());

	$effect(() => {
		if (open) load();
		else selected = new Set();
	});

	async function load() {
		loading = true;
		errorMsg = '';
		try {
			const res = await fetch('/api/media');
			if (!res.ok) throw new Error('Laden mislukt');
			const data = await res.json();
			media = data.media as Media[];
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Onbekende fout';
		} finally {
			loading = false;
		}
	}

	function toggle(id: string) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else {
			if (!multiple) next.clear();
			next.add(id);
		}
		selected = next;
	}

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

	function confirm() {
		const picked = media.filter((m) => selected.has(m.id));
		onpick(picked);
		onclose();
	}
</script>

{#if open}
	<div
		class="overlay"
		role="button"
		tabindex="0"
		onclick={onclose}
		onkeydown={(e) => e.key === 'Escape' && onclose()}
	>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<header class="modal__head">
				<h2>Media kiezen</h2>
				<label class="upload-btn">
					{uploading ? 'Uploaden…' : '+ Upload'}
					<input type="file" accept="image/*" multiple onchange={upload} disabled={uploading} hidden />
				</label>
				<button class="close" onclick={onclose} aria-label="Sluiten">×</button>
			</header>

			{#if errorMsg}<div class="err">{errorMsg}</div>{/if}

			<div class="grid">
				{#if loading}
					<p class="muted">Laden…</p>
				{:else if media.length === 0}
					<p class="muted">Nog geen media. Upload een afbeelding hierboven.</p>
				{:else}
					{#each media as m}
						<button
							type="button"
							class="tile"
							class:selected={selected.has(m.id)}
							onclick={() => toggle(m.id)}
						>
							<img src={m.public_url} alt={m.alt_text || m.filename} loading="lazy" />
							<span class="tile__name" title={m.filename}>{m.filename}</span>
						</button>
					{/each}
				{/if}
			</div>

			<footer class="modal__foot">
				<button class="btn-secondary" onclick={onclose}>Annuleer</button>
				<button class="btn-primary" disabled={selected.size === 0} onclick={confirm}>
					Kies ({selected.size})
				</button>
			</footer>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(37, 48, 43, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		padding: 24px;
	}
	.modal {
		background: white;
		border-radius: 16px;
		width: min(900px, 100%);
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.modal__head {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border-bottom: 1px solid #e8e6dc;
	}
	.modal__head h2 {
		font-size: 1.2rem;
		font-weight: 500;
		text-transform: lowercase;
		color: #4a5b4c;
		margin: 0;
		flex: 1;
	}
	.upload-btn {
		background: #4a5b4c;
		color: #fdff96;
		padding: 8px 16px;
		border-radius: 50px;
		font-size: 0.85rem;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
	}
	.upload-btn:hover { background: #3a4f44; }
	.close {
		background: none;
		border: none;
		font-size: 1.6rem;
		line-height: 1;
		color: #4a5b4c;
		cursor: pointer;
		padding: 4px 10px;
	}
	.err {
		background: #4a5b4c;
		color: #fdff96;
		padding: 10px 20px;
		font-size: 0.9rem;
	}
	.grid {
		flex: 1;
		overflow-y: auto;
		padding: 16px 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 12px;
	}
	.muted {
		grid-column: 1 / -1;
		color: #4a5b4c;
		opacity: 0.6;
		text-align: center;
		padding: 40px;
	}
	.tile {
		background: #faf9f4;
		border: 2px solid transparent;
		border-radius: 10px;
		padding: 6px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 4px;
		transition: border-color 0.15s ease;
	}
	.tile:hover { border-color: #e0ddc8; }
	.tile.selected { border-color: #4a5b4c; background: #fdff96; }
	.tile img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 6px;
		display: block;
	}
	.tile__name {
		font-size: 0.7rem;
		color: #4a5b4c;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.modal__foot {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		padding: 14px 20px;
		border-top: 1px solid #e8e6dc;
	}
	.btn-primary, .btn-secondary {
		padding: 10px 20px;
		border-radius: 50px;
		font-family: inherit;
		font-size: 0.9rem;
		cursor: pointer;
		border: none;
	}
	.btn-primary { background: #4a5b4c; color: #fdff96; }
	.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
	.btn-secondary { background: #e8e6dc; color: #4a5b4c; }
</style>
