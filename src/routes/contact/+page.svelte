<script lang="ts">
	import HeaderInverse from '$lib/components/layout/HeaderInverse.svelte';
	import FooterInverse from '$lib/components/layout/FooterInverse.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
</script>

<Seo
	title="Contact — Goof Design"
	description="Neem contact op met Goof voor een kennismakingsgesprek of vrijblijvende offerte. Gevestigd in Groningen."
/>

<HeaderInverse />

<main class="contact-page">
	<!-- Hero Section -->
	<section class="contact-hero">
		<div class="container-hero">
			<h1>kennismaken?</h1>
			<p class="subtitle">leuk! neem contact op en we<br> plannen een gesprek.</p>

			<div class="hero-content">
				<div class="contact-info">
					<div class="info-item">
						<span class="label">mailen</span>
						<a href="mailto:info@goof.design" class="value">info@goof.design</a>
					</div>

					<div class="info-item">
						<span class="label">bellen</span>
						<a href="tel:+31624576082" class="value">+31 6 24576082</a>
					</div>
				</div>

				<div class="boring-stuff">
					<span class="boring-label">boring stuff</span>
					<p>KVK: 90939670</p>
					<p>BTW: NL004067438B58</p>
					<p>IBAN: NL89 KNAB 0776 3092 85</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Form Section -->
	<section class="contact-form-section">
		<div class="container-form">
			<div class="form-wrapper">
				<div class="form-intro">
					<h2>of stuur een bericht via het formulier</h2>
					<p>en ik neem zo snel<br>mogelijk contact<br>met je op!</p>
				</div>

				{#if form?.success}
					<div class="form-success">
						<h3>bedankt voor je bericht!</h3>
						<p>ik neem zo snel mogelijk contact met je op.</p>
					</div>
				{:else}
					<form
						class="contact-form"
						method="POST"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update({ reset: false });
								submitting = false;
							};
						}}
					>
						<input type="hidden" name="_ts" value={data.renderedAt} />
						<div class="honeypot" aria-hidden="true">
							<label>
								Laat dit veld leeg
								<input type="text" name="website" tabindex="-1" autocomplete="off" />
							</label>
						</div>
						<div class="form-row">
							<input
								type="text"
								name="naam"
								placeholder="naam"
								value={form?.naam ?? ''}
								required
							/>
							<input
								type="text"
								name="achternaam"
								placeholder="achternaam"
								value={form?.achternaam ?? ''}
								required
							/>
						</div>

						<div class="form-row">
							<input
								type="tel"
								name="telefoon"
								placeholder="telefoon"
								value={form?.telefoon ?? ''}
								required
							/>
							<input
								type="email"
								name="e-mail"
								placeholder="e-mail"
								value={form?.email ?? ''}
								required
							/>
						</div>

						<div class="form-group">
							<textarea name="bericht" placeholder="bericht" rows="8" required
								>{form?.bericht ?? ''}</textarea
							>
						</div>

						{#if form?.error}
							<p class="form-error">{form.error}</p>
						{/if}

						<button type="submit" class="submit-btn" disabled={submitting}>
							{submitting ? 'verzenden...' : 'bericht verzenden'}
						</button>

						<p class="form-privacy">
							Door dit formulier te verzenden ga je akkoord met de verwerking van je gegevens zoals
							beschreven in ons <a href="/privacy">privacybeleid</a>.
						</p>
					</form>
				{/if}
			</div>
		</div>
	</section>
</main>

<FooterInverse />

<style>
	.contact-page {
		background: #4a5b4c;
		font-family: 'Outfit', sans-serif;
	}

	.container-hero {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.container-form {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Hero Section */
	.contact-hero {
		background: #4a5b4c;
		color: #fdff96;
		padding: clamp(3rem, 6vw, 6rem) 10px clamp(3rem, 5vw, 5rem);
		overflow-x: hidden;
	}

	.contact-hero h1 {
		font-size: 2.5rem;
		font-weight: 500;
		margin-bottom: 1rem;
		text-transform: lowercase;
		color: #fdff96;
	}

	.subtitle {
		font-size: clamp(1.2rem, 2vw, 1.8rem);
		font-weight: 300;
		margin-bottom: clamp(2rem, 4vw, 4rem);
		color: #fdff96;
	}

	.hero-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: clamp(2rem, 4vw, 4rem);
		max-width: 100%;
		overflow: hidden;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-width: 0;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item .label {
		font-size: clamp(0.95rem, 1.2vw, 1.1rem);
		font-weight: 500;
		color: #fdff96;
		text-transform: lowercase;
	}

	.info-item .value {
		font-size: clamp(1rem, 1.3vw, 1.2rem);
		font-weight: 300;
		color: #fdff96;
		text-decoration: none;
	}

	.info-item .value:hover {
		text-decoration: underline;
	}

	.boring-stuff {
		text-align: right;
		min-width: 0;
		overflow-wrap: break-word;
	}

	.boring-label {
		display: block;
		font-size: clamp(1rem, 1.3vw, 1.2rem);
		font-weight: 500;
		color: #fdff96;
		margin-bottom: 0.5rem;
		text-transform: lowercase;
	}

	.boring-stuff p {
		font-size: clamp(0.9rem, 1.1vw, 1rem);
		font-weight: 300;
		color: #fdff96;
		margin: 0.25rem 0;
	}

	/* Form Section */
	.contact-form-section {
		background: #ffffff;
		padding: clamp(3rem, 6vw, 6rem) 10px;

	}

	.form-wrapper {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: clamp(2rem, 4vw, 4rem);
		align-items: start;
	}

	.form-intro h2 {
		font-size: clamp(2rem, 3vw, 2.5rem);
		font-weight: 500;
		color: #4a5b4c;
		margin-bottom: 1rem;
		text-transform: lowercase;
	}

	.form-intro p {
		font-size: clamp(1.7rem, 2vw, 1.7rem);
		font-weight: 300;
		color: #4a5b4c;
		line-height: 1.2;
		text-transform: lowercase;
	}

	.contact-form {
		background: #fdff96;
		padding: clamp(2rem, 4vw, 3rem);
		border-radius: 20px;
		max-width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.form-privacy {
		font-size: 0.8rem;
		font-weight: 300;
		color: #4a5b4c;
		opacity: 0.8;
		margin: 0.5rem 0 0;
		line-height: 1.5;
		text-align: center;
	}

	.form-privacy a {
		color: #4a5b4c;
		text-decoration: underline;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.form-group {
		display: flex;
		margin-top: -1rem;
	}

	.form-group textarea {
		flex: 1;
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		padding: 1rem 1.5rem;
		border: 1px solid #4a5b4c;
		border-radius: 12px;
		background: #fdff96;
		color: #4a5b4c;
		font-size: clamp(0.95rem, 1.1vw, 1.05rem);
		font-family: inherit;
		font-weight: 300;
		transition: border-color 0.2s ease;
		box-sizing: border-box;
	}

	.contact-form input::placeholder,
	.contact-form textarea::placeholder {
		color: #4a5b4c;
		opacity: 0.7;
		text-transform: lowercase;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: none;
		border-color: #25302b;
	}

	.contact-form textarea {
		resize: vertical;
		min-height: 150px;
	}

	.submit-btn {
		width: 100%;
		margin-top: 0.5rem;
		padding: 1.2rem 2rem;
		background: #4a5b4c;
		color: #fdff96;
		border: 1px solid #4a5b4c;
		border-radius: 12px;
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		font-weight: 500;
		font-family: 'Outfit', sans-serif;
		text-transform: lowercase;
		cursor: pointer;
		transition: filter 0.2s ease;
	}

	.submit-btn:hover {
		filter: brightness(1.1);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-error {
		color: #b23a3a;
		font-size: clamp(0.9rem, 1.1vw, 1rem);
		font-weight: 400;
		margin: 0 0 1rem;
		text-transform: lowercase;
	}

	.form-success {
		background: #fdff96;
		padding: clamp(2rem, 4vw, 3rem);
		border-radius: 20px;
		color: #4a5b4c;
		text-align: center;
	}

	.form-success h3 {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 500;
		margin: 0 0 0.75rem;
		text-transform: lowercase;
	}

	.form-success p {
		font-size: clamp(1rem, 1.3vw, 1.2rem);
		font-weight: 300;
		margin: 0;
		text-transform: lowercase;
	}

	/* Responsive */
	@media (max-width: 968px) {
		.hero-content {
			flex-direction: column;
		}

		.boring-stuff {
			text-align: left;
		}

		.form-wrapper {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 900px) {
		.contact-hero {
			padding: clamp(3rem, 6vw, 6rem) 1.5rem clamp(3rem, 5vw, 5rem);
		}

		.contact-form-section {
			padding: clamp(2.5rem, 5vw, 5rem) 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.form-row {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.contact-hero {
			padding: clamp(2rem, 5vw, 4rem) 1rem clamp(2rem, 4vw, 3rem);
		}

		.contact-hero h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: clamp(1rem, 2vw, 1.3rem);
		}

		.form-intro h2 {
			font-size: clamp(1.5rem, 3vw, 2rem);
		}

		.form-intro p {
			font-size: clamp(1rem, 2vw, 1.3rem);
		}

		.contact-form {
			padding: clamp(1.5rem, 3vw, 2.5rem);
			border-radius: 16px;
		}
	}

	@media (max-width: 480px) {
		.contact-hero {
			padding: 2.5rem 1rem 2rem;
		}

		.contact-hero h1 {
			font-size: 2rem;
			margin-bottom: 0.75rem;
		}

		.subtitle {
			font-size: 1rem;
			margin-bottom: 2rem;
		}

		.hero-content {
			gap: 2rem;
		}

		.contact-info {
			gap: 1.25rem;
		}

		.info-item .label {
			font-size: 0.9rem;
		}

		.info-item .value {
			font-size: 1rem;
		}

		.boring-stuff p {
			font-size: 0.85rem;
		}

		.contact-form-section {
			padding: 2.5rem 1rem;
		}

		.form-wrapper {
			gap: 2rem;
		}

		.form-intro {
			margin-bottom: 0.5rem;
			padding: 0 1rem;
		}

		.form-intro h2 {
			font-size: 1.5rem;
			margin-bottom: 0.75rem;
		}

		.form-intro p {
			font-size: 0.95rem;
		}

		.contact-form {
			padding: 1rem;
			border-radius: 16px;
			gap: 0.875rem;
		}

		.form-row {
			gap: 0.875rem;
		}

		.contact-form input,
		.contact-form textarea {
			padding: 0.75rem 1rem;
			font-size: 1rem;
			border-radius: 10px;
		}

		.contact-form textarea {
			min-height: 120px;
		}

		.submit-btn {
			padding: 1rem 1.5rem;
			font-size: 0.95rem;
			border-radius: 10px;
		}
	}
</style>
