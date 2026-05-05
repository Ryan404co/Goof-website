<script lang="ts">
	import { goto } from '$app/navigation';
	import MediaPicker from './MediaPicker.svelte';
	import type { Project, ProjectImage, Media } from '$lib/cms/database.types';

	interface Props {
		project?: Project;
		mode: 'create' | 'edit';
	}

	let { project, mode }: Props = $props();

	let slug = $state(project?.slug ?? '');
	let name = $state(project?.name ?? '');
	let klant = $state(project?.klant ?? '');
	let jaar = $state(project?.jaar ?? '');
	let projectTitel = $state(project?.project_titel ?? '');
	let projectBeschrijving = $state(project?.project_beschrijving ?? '');
	let hoofdAfbeeldingUrl = $state(project?.hoofd_afbeelding_url ?? '');
	let hoofdAfbeeldingAlt = $state(project?.hoofd_afbeelding_alt ?? '');
	let afbeeldingen = $state<ProjectImage[]>(project?.afbeeldingen ?? []);
	let tagsCsv = $state((project?.tags ?? []).join(', '));
	let metaDescription = $state(project?.meta_description ?? '');
	let status = $state<'draft' | 'published'>(project?.status ?? 'draft');
	let sortOrder = $state(project?.sort_order ?? 0);

	let saving = $state(false);
	let errorMsg = $state('');

	let pickerOpen = $state(false);
	let pickerTarget = $state<'cover' | 'gallery'>('gallery');

	function slugify(s: string) {
		return s.toLowerCase()
			.normalize('NFKD')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 80);
	}

	function autoSlugFromName() {
		if (mode === 'create' && !slug) slug = slugify(name);
	}

	function openPicker(target: 'cover' | 'gallery') {
		pickerTarget = target;
		pickerOpen = true;
	}

	function onPick(items: Media[]) {
		if (pickerTarget === 'cover') {
			const m = items[0];
			if (m) {
				hoofdAfbeeldingUrl = m.public_url;
				if (!hoofdAfbeeldingAlt && m.alt_text) hoofdAfbeeldingAlt = m.alt_text;
			}
		} else {
			afbeeldingen = [
				...afbeeldingen,
				...items.map((m) => ({ url: m.public_url, alt: m.alt_text ?? '' }))
			];
		}
	}

	function removeImage(index: number) {
		afbeeldingen = afbeeldingen.filter((_, i) => i !== index);
	}

	function moveImage(index: number, dir: -1 | 1) {
		const next = [...afbeeldingen];
		const target = index + dir;
		if (target < 0 || target >= next.length) return;
		[next[index], next[target]] = [next[target], next[index]];
		afbeeldingen = next;
	}

	async function save() {
		saving = true;
		errorMsg = '';

		const tags = tagsCsv
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);

		const payload = {
			slug,
			name,
			klant: klant || null,
			jaar: jaar || null,
			tags,
			project_titel: projectTitel || null,
			project_beschrijving: projectBeschrijving || null,
			hoofd_afbeelding_url: hoofdAfbeeldingUrl || null,
			hoofd_afbeelding_alt: hoofdAfbeeldingAlt || null,
			afbeeldingen,
			meta_description: metaDescription || null,
			...(mode === 'edit' ? { status, sort_order: sortOrder } : {})
		};

		try {
			const url = mode === 'create' ? '/api/projects' : `/api/projects/${project!.id}`;
			const method = mode === 'create' ? 'POST' : 'PATCH';
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.message || 'Opslaan mislukt');
			}

			if (mode === 'create') {
				const data = await res.json();
				goto(`/admin/projecten/${data.project.id}`);
			} else {
				saving = false;
				// brief flash via state, no redirect
			}
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Onbekende fout';
		} finally {
			if (mode === 'edit') saving = false;
		}
	}
</script>

<form
	onsubmit={(e) => { e.preventDefault(); save(); }}
	class="form"
>
	{#if errorMsg}<div class="err">{errorMsg}</div>{/if}

	<section class="card">
		<h2>basis</h2>
		<div class="row">
			<label class="field">
				<span>Naam (h1)</span>
				<input bind:value={name} onblur={autoSlugFromName} required maxlength="300" />
			</label>
			<label class="field">
				<span>Slug (URL)</span>
				<div class="slug-row">
					<span class="slug-prefix">/werk/</span>
					<input bind:value={slug} required pattern="[a-z0-9\-]+" maxlength="80" />
				</div>
			</label>
		</div>
		<div class="row">
			<label class="field">
				<span>Klant</span>
				<input bind:value={klant} maxlength="200" />
			</label>
			<label class="field">
				<span>Jaar</span>
				<input bind:value={jaar} maxlength="20" placeholder="2024" />
			</label>
		</div>
		<label class="field">
			<span>Tags (komma-gescheiden)</span>
			<input bind:value={tagsCsv} placeholder="logo ontwerp, visuele identiteit" />
		</label>
	</section>

	<section class="card">
		<h2>info-blok</h2>
		<label class="field">
			<span>Project titel</span>
			<input bind:value={projectTitel} maxlength="500" />
		</label>
		<label class="field">
			<span>Project beschrijving</span>
			<textarea bind:value={projectBeschrijving} rows="6" maxlength="20000"></textarea>
			<small>Gebruik lege regels om paragrafen te scheiden.</small>
		</label>
	</section>

	<section class="card">
		<h2>hoofdafbeelding</h2>
		{#if hoofdAfbeeldingUrl}
			<div class="cover">
				<img src={hoofdAfbeeldingUrl} alt={hoofdAfbeeldingAlt} />
				<button type="button" class="btn-secondary" onclick={() => openPicker('cover')}>Vervang</button>
				<button type="button" class="btn-secondary danger" onclick={() => { hoofdAfbeeldingUrl = ''; hoofdAfbeeldingAlt = ''; }}>Verwijder</button>
			</div>
		{:else}
			<button type="button" class="btn-secondary" onclick={() => openPicker('cover')}>+ Kies afbeelding</button>
		{/if}
		<label class="field">
			<span>Alt-tekst (toegankelijkheid)</span>
			<input bind:value={hoofdAfbeeldingAlt} maxlength="300" />
		</label>
	</section>

	<section class="card">
		<h2>galerij</h2>
		{#if afbeeldingen.length > 0}
			<div class="gallery">
				{#each afbeeldingen as img, i}
					<div class="gallery__item">
						<img src={img.url} alt={img.alt} />
						<input
							class="gallery__alt"
							placeholder="alt-tekst"
							value={img.alt}
							oninput={(e) => {
								const next = [...afbeeldingen];
								next[i] = { ...next[i], alt: e.currentTarget.value };
								afbeeldingen = next;
							}}
						/>
						<div class="gallery__controls">
							<button type="button" onclick={() => moveImage(i, -1)} disabled={i === 0} aria-label="Naar boven">↑</button>
							<button type="button" onclick={() => moveImage(i, 1)} disabled={i === afbeeldingen.length - 1} aria-label="Naar onder">↓</button>
							<button type="button" class="danger" onclick={() => removeImage(i)} aria-label="Verwijder">×</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
		<button type="button" class="btn-secondary" onclick={() => openPicker('gallery')}>+ Afbeeldingen toevoegen</button>
		<small>Volgorde bepaalt hoe ze op de pagina verschijnen. Ondersteunt 1–5 afbeeldingen voor optimale lay-out.</small>
	</section>

	<section class="card">
		<h2>SEO</h2>
		<label class="field">
			<span>Meta beschrijving</span>
			<textarea bind:value={metaDescription} rows="2" maxlength="500" placeholder="Korte beschrijving voor zoekmachines (155 tekens)."></textarea>
		</label>
	</section>

	{#if mode === 'edit'}
		<section class="card">
			<h2>publicatie</h2>
			<div class="row">
				<label class="field">
					<span>Status</span>
					<select bind:value={status}>
						<option value="draft">Concept</option>
						<option value="published">Live</option>
					</select>
				</label>
				<label class="field">
					<span>Sortering (lager = eerder)</span>
					<input type="number" bind:value={sortOrder} min="0" max="10000" />
				</label>
			</div>
		</section>
	{/if}

	<div class="actions">
		<a href="/admin/projecten" class="btn-secondary">Annuleer</a>
		<button type="submit" class="btn-primary" disabled={saving}>
			{saving ? 'Opslaan…' : (mode === 'create' ? 'Project aanmaken' : 'Wijzigingen opslaan')}
		</button>
	</div>
</form>

<MediaPicker
	open={pickerOpen}
	multiple={pickerTarget === 'gallery'}
	onclose={() => (pickerOpen = false)}
	onpick={onPick}
/>

<style>
	.form { display: flex; flex-direction: column; gap: 20px; max-width: 900px; }
	.card {
		background: white;
		border: 1px solid #e8e6dc;
		border-radius: 12px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.card h2 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 500;
		color: #4a5b4c;
		text-transform: lowercase;
	}
	.row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
	.field { display: flex; flex-direction: column; gap: 6px; }
	.field > span {
		font-size: 0.8rem;
		font-weight: 500;
		color: #4a5b4c;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.field input, .field textarea, .field select {
		padding: 10px 12px;
		border: 1px solid #e0ddc8;
		border-radius: 8px;
		background: #fdff96;
		color: #25302b;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 300;
		box-sizing: border-box;
	}
	.field input:focus, .field textarea:focus, .field select:focus { outline: none; border-color: #4a5b4c; }
	.field small { font-size: 0.75rem; color: #4a5b4c; opacity: 0.6; }
	.slug-row { display: flex; align-items: center; }
	.slug-prefix {
		padding: 10px 12px;
		background: #e8e6dc;
		border: 1px solid #e0ddc8;
		border-right: none;
		border-radius: 8px 0 0 8px;
		font-size: 0.9rem;
		color: #4a5b4c;
		opacity: 0.7;
	}
	.slug-row input { border-radius: 0 8px 8px 0; flex: 1; }
	.cover { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
	.cover img { max-width: 240px; max-height: 160px; border-radius: 8px; display: block; }
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}
	.gallery__item {
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: #faf9f4;
		padding: 8px;
		border-radius: 8px;
	}
	.gallery__item img {
		width: 100%;
		aspect-ratio: 16/9;
		object-fit: cover;
		border-radius: 6px;
	}
	.gallery__alt {
		font-size: 0.8rem;
		padding: 6px 8px;
		border: 1px solid #e0ddc8;
		border-radius: 6px;
		font-family: inherit;
	}
	.gallery__controls { display: flex; gap: 4px; }
	.gallery__controls button {
		flex: 1;
		font-family: inherit;
		font-size: 0.85rem;
		padding: 4px 8px;
		border: 1px solid #e0ddc8;
		background: white;
		color: #4a5b4c;
		border-radius: 6px;
		cursor: pointer;
	}
	.gallery__controls button:disabled { opacity: 0.4; cursor: not-allowed; }
	.gallery__controls .danger { color: #b23a3a; border-color: #e8c4c4; }
	.actions { display: flex; gap: 8px; justify-content: flex-end; }
	.btn-primary, .btn-secondary {
		padding: 12px 24px;
		border-radius: 50px;
		font-family: inherit;
		font-size: 0.9rem;
		cursor: pointer;
		border: none;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
	}
	.btn-primary { background: #4a5b4c; color: #fdff96; }
	.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
	.btn-primary:hover:not(:disabled) { background: #3a4f44; }
	.btn-secondary { background: #e8e6dc; color: #4a5b4c; }
	.btn-secondary.danger { background: #fcebeb; color: #b23a3a; }
	.btn-secondary:hover { background: #d8d6cc; }
	.err {
		background: #fcebeb;
		border: 1px solid #e8c4c4;
		color: #b23a3a;
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 0.9rem;
	}
	@media (max-width: 700px) {
		.row { grid-template-columns: 1fr; }
	}
</style>
