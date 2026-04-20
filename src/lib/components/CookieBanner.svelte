<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const COOKIE_NAME = 'cookie-consent';
	const COOKIE_DAYS = 365;

	let visible = $state(false);
	let showDetails = $state(false);
	let analytics = $state(false);

	type Consent = { analytics: boolean; marketing: boolean };

	function readCookie(): Consent | null {
		if (!browser) return null;
		const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
		if (!match) return null;
		try {
			return JSON.parse(decodeURIComponent(match[1]));
		} catch {
			return null;
		}
	}

	function writeCookie(consent: Consent) {
		const value = encodeURIComponent(JSON.stringify(consent));
		const expires = new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000).toUTCString();
		const secure = location.protocol === 'https:' ? '; Secure' : '';
		document.cookie = `${COOKIE_NAME}=${value}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
	}

	function applyConsent(consent: Consent) {
		writeCookie(consent);
		window.dispatchEvent(new CustomEvent('cookie-consent-applied', { detail: consent }));
		visible = false;
	}

	function acceptAll() {
		applyConsent({ analytics: true, marketing: false });
	}

	function rejectAll() {
		applyConsent({ analytics: false, marketing: false });
	}

	function saveChoice() {
		applyConsent({ analytics, marketing: false });
	}

	onMount(() => {
		const existing = readCookie();
		if (!existing) {
			visible = true;
		}
	});
</script>

{#if visible}
	<div
		class="cookie-banner"
		role="dialog"
		aria-labelledby="cookie-title"
		aria-describedby="cookie-desc"
	>
		<div class="cookie-banner__inner">
			<div class="cookie-banner__text">
				<h2 id="cookie-title">cookies</h2>
				<p id="cookie-desc">
					Goof plaatst zelf geen cookies. Met jouw toestemming gebruiken we wel Google Analytics om
					anoniem bezoek te meten en de site te verbeteren. Meer info in ons
					<a href="/cookies">cookiebeleid</a>.
				</p>

				{#if showDetails}
					<div class="cookie-banner__options">
						<label class="cookie-banner__toggle">
							<input type="checkbox" checked disabled />
							<span>
								<strong>noodzakelijk</strong>
								<em>Altijd actief — nodig voor basisfunctionaliteit.</em>
							</span>
						</label>

						<label class="cookie-banner__toggle">
							<input type="checkbox" bind:checked={analytics} />
							<span>
								<strong>analytics</strong>
								<em>Google Analytics met geanonimiseerd IP-adres.</em>
							</span>
						</label>
					</div>
				{/if}
			</div>

			<div class="cookie-banner__actions">
				{#if showDetails}
					<button type="button" class="cookie-banner__btn cookie-banner__btn--ghost" onclick={rejectAll}>
						weigeren
					</button>
					<button type="button" class="cookie-banner__btn" onclick={saveChoice}>
						opslaan
					</button>
				{:else}
					<button
						type="button"
						class="cookie-banner__btn cookie-banner__btn--link"
						onclick={() => (showDetails = true)}
					>
						voorkeuren
					</button>
					<button
						type="button"
						class="cookie-banner__btn cookie-banner__btn--ghost"
						onclick={rejectAll}
					>
						weigeren
					</button>
					<button type="button" class="cookie-banner__btn" onclick={acceptAll}>
						accepteren
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.cookie-banner {
		position: fixed;
		bottom: 16px;
		left: 16px;
		right: 16px;
		z-index: 9999;
		background: #4a5b4c;
		color: #fdff96;
		border-radius: 20px;
		padding: clamp(1.25rem, 2.5vw, 1.75rem);
		box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
		font-family: 'Outfit', sans-serif;
		max-width: 1400px;
		margin: 0 auto;
		animation: slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.cookie-banner__inner {
		display: flex;
		gap: clamp(1rem, 3vw, 2rem);
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.cookie-banner__text {
		flex: 1 1 320px;
		min-width: 0;
	}

	.cookie-banner h2 {
		font-size: 1rem;
		font-weight: 500;
		text-transform: lowercase;
		margin: 0 0 0.4rem;
	}

	.cookie-banner p {
		font-size: 0.9rem;
		font-weight: 300;
		line-height: 1.55;
		margin: 0;
		max-width: 62ch;
	}

	.cookie-banner a {
		color: #fdff96;
		text-decoration: underline;
	}

	.cookie-banner__options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.cookie-banner__toggle {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		font-size: 0.85rem;
		font-weight: 300;
		cursor: pointer;
	}

	.cookie-banner__toggle input[type='checkbox'] {
		margin-top: 0.2rem;
		width: 16px;
		height: 16px;
		accent-color: #fdff96;
		cursor: pointer;
	}

	.cookie-banner__toggle input[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.cookie-banner__toggle strong {
		display: block;
		font-weight: 500;
		text-transform: lowercase;
	}

	.cookie-banner__toggle em {
		display: block;
		font-style: normal;
		font-weight: 300;
		opacity: 0.8;
		margin-top: 0.1rem;
	}

	.cookie-banner__actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		flex-shrink: 0;
	}

	.cookie-banner__btn {
		padding: 0.7rem 1.4rem;
		border-radius: 50px;
		background: #fdff96;
		color: #4a5b4c;
		border: 1px solid #fdff96;
		font-family: 'Outfit', sans-serif;
		font-size: 0.9rem;
		font-weight: 500;
		text-transform: lowercase;
		cursor: pointer;
		transition: filter 0.2s ease;
	}

	.cookie-banner__btn:hover {
		filter: brightness(0.92);
	}

	.cookie-banner__btn--ghost {
		background: transparent;
		color: #fdff96;
		border-color: rgba(253, 255, 150, 0.5);
	}

	.cookie-banner__btn--ghost:hover {
		filter: none;
		background: rgba(253, 255, 150, 0.08);
	}

	.cookie-banner__btn--link {
		background: transparent;
		color: #fdff96;
		border-color: transparent;
		text-decoration: underline;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.cookie-banner__btn--link:hover {
		filter: none;
		opacity: 0.85;
	}

	@media (max-width: 600px) {
		.cookie-banner {
			bottom: 8px;
			left: 8px;
			right: 8px;
			padding: 0.9rem 1rem;
			border-radius: 16px;
		}

		.cookie-banner__inner {
			flex-direction: column;
			align-items: stretch;
			justify-content: flex-start;
			gap: 0.75rem;
		}

		.cookie-banner__text {
			flex: 0 1 auto;
		}

		.cookie-banner h2 {
			display: none;
		}

		.cookie-banner p {
			font-size: 0.95rem;
			line-height: 1.5;
		}

		.cookie-banner__actions {
			flex-wrap: nowrap;
			align-items: center;
			gap: 0.5rem;
		}

		.cookie-banner__btn {
			padding: 0.7rem 1.1rem;
			font-size: 0.95rem;
		}

		.cookie-banner__btn--ghost,
		.cookie-banner__btn:not(.cookie-banner__btn--link) {
			flex: 1;
			min-width: 0;
		}

		.cookie-banner__btn--link {
			flex: 0 0 auto;
			padding: 0.4rem 0;
			font-size: 0.9rem;
		}

		.cookie-banner__options {
			gap: 0.5rem;
			margin-top: 0.5rem;
		}

		.cookie-banner__toggle {
			font-size: 0.8rem;
		}
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
