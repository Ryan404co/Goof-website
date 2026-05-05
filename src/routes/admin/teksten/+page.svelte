<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page as pageStore } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { SiteText } from '$lib/cms/database.types';

	let { data } = $props();

	type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
	const saveStatus = $state<Record<string, SaveStatus>>({});
	const errorMsg = $state<Record<string, string>>({});
	// Local edit buffer: key → current (possibly unsaved) value
	const buffer = $state<Record<string, unknown>>({});

	function getValue(t: SiteText): unknown {
		return Object.prototype.hasOwnProperty.call(buffer, t.key) ? buffer[t.key] : t.value;
	}

	function setValue(t: SiteText, value: unknown) {
		buffer[t.key] = value;
		saveStatus[t.key] = 'idle';
	}

	async function save(t: SiteText) {
		saveStatus[t.key] = 'saving';
		errorMsg[t.key] = '';
		try {
			const res = await fetch(`/api/texts/${encodeURIComponent(t.key)}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ value: getValue(t) })
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.message || 'Kon niet opslaan');
			}
			saveStatus[t.key] = 'saved';
			setTimeout(() => {
				if (saveStatus[t.key] === 'saved') saveStatus[t.key] = 'idle';
			}, 1500);
		} catch (e) {
			saveStatus[t.key] = 'error';
			errorMsg[t.key] = e instanceof Error ? e.message : 'Onbekende fout';
		}
	}

	function selectPage(key: string) {
		const url = new URL($pageStore.url);
		url.searchParams.set('page', key);
		goto(url, { keepFocus: true, noScroll: true, replaceState: true });
	}

	const activeGroup = $derived(data.pages.find((p) => p.key === data.activePage) ?? data.pages[0]);

	// List item helpers (for field_type === 'list')
	function addListItem(t: SiteText) {
		const current = (getValue(t) as string[]) ?? [];
		setValue(t, [...current, '']);
	}
	function updateListItem(t: SiteText, index: number, value: string) {
		const current = [...((getValue(t) as string[]) ?? [])];
		current[index] = value;
		setValue(t, current);
	}
	function removeListItem(t: SiteText, index: number) {
		const current = [...((getValue(t) as string[]) ?? [])];
		current.splice(index, 1);
		setValue(t, current);
	}
</script>

<svelte:head><title>Teksten — Goof Admin</title></svelte:head>

<header class="page-head">
	<h1>teksten</h1>
	<p>Bewerk losse teksten op de website. Wijzigingen zijn direct live na opslaan.</p>
</header>

<div class="tabs">
	{#each data.pages as group}
		<button
			class="tab"
			class:active={group.key === activeGroup?.key}
			onclick={() => selectPage(group.key)}
		>
			{group.label}
			<span class="tab__count">{group.texts.length}</span>
		</button>
	{/each}
</div>

{#if activeGroup}
	<section class="fields">
		{#each activeGroup.texts as t (t.key)}
			<div class="field">
				<div class="field__head">
					<label class="field__label" for={`f-${t.key}`}>{t.label}</label>
					<code class="field__key">{t.key}</code>
				</div>

				{#if t.field_type === 'textarea' || t.field_type === 'rich'}
					<textarea
						id={`f-${t.key}`}
						class="field__input field__input--area"
						rows="4"
						value={String(getValue(t) ?? '')}
						oninput={(e) => setValue(t, e.currentTarget.value)}
					></textarea>
				{:else if t.field_type === 'list'}
					<div class="list">
						{#each (getValue(t) as string[]) ?? [] as item, i}
							<div class="list__row">
								<input
									type="text"
									class="field__input"
									value={item}
									oninput={(e) => updateListItem(t, i, e.currentTarget.value)}
								/>
								<button type="button" class="list__remove" onclick={() => removeListItem(t, i)} aria-label="Verwijder">
									×
								</button>
							</div>
						{/each}
						<button type="button" class="list__add" onclick={() => addListItem(t)}>
							+ regel toevoegen
						</button>
					</div>
				{:else}
					<input
						id={`f-${t.key}`}
						type={t.field_type === 'email' ? 'email' : t.field_type === 'tel' ? 'tel' : t.field_type === 'url' ? 'url' : 'text'}
						class="field__input"
						value={String(getValue(t) ?? '')}
						oninput={(e) => setValue(t, e.currentTarget.value)}
					/>
				{/if}

				<div class="field__actions">
					<button
						type="button"
						class="field__save"
						onclick={() => save(t)}
						disabled={saveStatus[t.key] === 'saving'}
					>
						{#if saveStatus[t.key] === 'saving'}Opslaan…
						{:else if saveStatus[t.key] === 'saved'}✓ Opgeslagen
						{:else}Opslaan{/if}
					</button>
					{#if saveStatus[t.key] === 'error'}
						<span class="field__error">{errorMsg[t.key]}</span>
					{/if}
				</div>
			</div>
		{/each}
	</section>
{/if}

<style>
	.page-head { margin-bottom: 24px; }
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
	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 24px;
		border-bottom: 1px solid #e8e6dc;
		padding-bottom: 0;
	}
	.tab {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 16px;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: #4a5b4c;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 400;
		text-transform: lowercase;
		cursor: pointer;
		transition: all 0.15s ease;
		opacity: 0.6;
	}
	.tab:hover { opacity: 1; }
	.tab.active {
		opacity: 1;
		font-weight: 500;
		border-bottom-color: #4a5b4c;
	}
	.tab__count {
		background: #e8e6dc;
		color: #4a5b4c;
		font-size: 0.7rem;
		padding: 2px 6px;
		border-radius: 10px;
	}
	.fields {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 800px;
	}
	.field {
		background: white;
		border: 1px solid #e8e6dc;
		border-radius: 12px;
		padding: 20px;
	}
	.field__head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 8px;
		margin-bottom: 8px;
	}
	.field__label {
		font-weight: 500;
		color: #4a5b4c;
		font-size: 0.95rem;
	}
	.field__key {
		font-size: 0.7rem;
		color: #4a5b4c;
		opacity: 0.5;
		font-family: monospace;
	}
	.field__input {
		width: 100%;
		padding: 12px 14px;
		border: 1px solid #e0ddc8;
		border-radius: 8px;
		background: #fdff96;
		color: #25302b;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 300;
		box-sizing: border-box;
		transition: border-color 0.15s ease;
	}
	.field__input:focus {
		outline: none;
		border-color: #4a5b4c;
	}
	.field__input--area {
		font-family: inherit;
		min-height: 80px;
		resize: vertical;
		line-height: 1.5;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.list__row {
		display: flex;
		gap: 6px;
	}
	.list__remove {
		background: none;
		border: 1px solid #e0ddc8;
		color: #4a5b4c;
		width: 38px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.2rem;
		line-height: 1;
		flex-shrink: 0;
	}
	.list__remove:hover { background: #fdff96; }
	.list__add {
		align-self: flex-start;
		background: none;
		border: 1px dashed #4a5b4c;
		color: #4a5b4c;
		padding: 8px 14px;
		border-radius: 8px;
		font-family: inherit;
		font-size: 0.85rem;
		font-weight: 300;
		cursor: pointer;
	}
	.list__add:hover { background: #fdff96; }
	.field__actions {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 12px;
	}
	.field__save {
		background: #4a5b4c;
		color: #fdff96;
		border: none;
		padding: 8px 18px;
		border-radius: 50px;
		font-family: inherit;
		font-size: 0.85rem;
		font-weight: 400;
		cursor: pointer;
		transition: background-color 0.15s;
		text-transform: lowercase;
	}
	.field__save:hover:not(:disabled) { background: #3a4f44; }
	.field__save:disabled { opacity: 0.5; cursor: not-allowed; }
	.field__error {
		color: #b23a3a;
		font-size: 0.85rem;
	}
</style>
