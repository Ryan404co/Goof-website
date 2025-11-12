<script lang="ts">
	import HeaderInverse from '$lib/components/layout/HeaderInverse.svelte';
	import FooterInverse from '$lib/components/layout/FooterInverse.svelte';
</script>

<svelte:head>
	<title>Contact - Goof</title>
</svelte:head>

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
					<p>KVK: XXXXXXXXXX</p>
					<p>BTW: XXXXXXXXXX</p>
					<p>IBAN: XXXXXXXXXX</p>
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

				<form class="contact-form" method="POST">
					<div class="form-row">
						<input type="text" name="naam" placeholder="naam" required />
						<input type="text" name="achternaam" placeholder="achternaam" required />
					</div>

					<div class="form-row">
						<input type="tel" name="telefoon" placeholder="telefoon" required />
						<input type="email" name="e-mail" placeholder="e-mail" required />
					</div>

					<div class="form-group">
						<textarea name="bericht" placeholder="bericht" rows="8" required></textarea>
					</div>

					<button type="submit" class="submit-btn">bericht verzenden</button>
				</form>
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
		padding: 0 10px;
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
		padding: clamp(3rem, 6vw, 6rem) 0 clamp(3rem, 5vw, 5rem);
	}

	.contact-hero h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 400;
		margin-bottom: 1rem;
		text-transform: lowercase;
		color: #fdff96;
	}

	.subtitle {
		font-size: clamp(1.2rem, 2vw, 1.8rem);
		font-weight: 400;
		margin-bottom: clamp(2rem, 4vw, 4rem);
		color: #fdff96;
	}

	.hero-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: clamp(2rem, 4vw, 4rem);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item .label {
		font-size: clamp(0.95rem, 1.2vw, 1.1rem);
		font-weight: 400;
		color: #fdff96;
		text-transform: lowercase;
	}

	.info-item .value {
		font-size: clamp(1rem, 1.3vw, 1.2rem);
		font-weight: 400;
		color: #fdff96;
		text-decoration: none;
	}

	.info-item .value:hover {
		text-decoration: underline;
	}

	.boring-stuff {
		text-align: right;
	}

	.boring-label {
		display: block;
		font-size: clamp(1rem, 1.3vw, 1.2rem);
		font-weight: 600;
		color: #fdff96;
		margin-bottom: 0.5rem;
		text-transform: lowercase;
	}

	.boring-stuff p {
		font-size: clamp(0.9rem, 1.1vw, 1rem);
		font-weight: 400;
		color: #fdff96;
		margin: 0.25rem 0;
	}

	/* Form Section */
	.contact-form-section {
		background: #ffffff;
		padding: clamp(3rem, 6vw, 6rem) 0;
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
		font-weight: 400;
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
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		padding: 1rem 1.5rem;
		border: 2px solid #4a5b4c;
		border-radius: 12px;
		background: #fdff96;
		color: #4a5b4c;
		font-size: clamp(0.95rem, 1.1vw, 1.05rem);
		font-family: inherit;
		font-weight: 400;
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
		padding: 1.2rem 2rem;
		background: #4a5b4c;
		color: #fdff96;
		border: 2px solid #4a5b4c;
		border-radius: 12px;
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		font-weight: 600;
		font-family: 'Outfit', sans-serif;
		text-transform: lowercase;
		cursor: pointer;
		transition: filter 0.2s ease;
	}

	.submit-btn:hover {
		filter: brightness(1.1);
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

	@media (max-width: 768px) {
		.form-row {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.container-hero {
			padding: 0 1rem;
			width: 90%;
		}

		.contact-hero {
			padding: 2.5rem 0 2rem;
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
			padding: 2.5rem 0;
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
		}

		.form-row {
			gap: 0.875rem;
			margin-bottom: 0.875rem;
		}

		.form-group {
			margin-bottom: 1.25rem;
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
