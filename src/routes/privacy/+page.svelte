<script lang="ts">
	import HeaderInverse from '$lib/components/layout/HeaderInverse.svelte';
	import FooterInverse from '$lib/components/layout/FooterInverse.svelte';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Privacybeleid — Goof Design"
	description="Privacybeleid van Goof Design. Hoe we omgaan met jouw gegevens, bewaartermijnen en jouw rechten onder de AVG."
	noindex
/>

<HeaderInverse />

<main id="main-content" class="legal">
	<div class="legal__wrap">
		<h1>privacybeleid</h1>
		<p class="lead">
			Laatst bijgewerkt: april 2026. Dit privacybeleid legt uit welke persoonsgegevens Goof
			verzamelt, waarom we dat doen en welke rechten je hebt.
		</p>

		<section>
			<h2>wie we zijn</h2>
			<p>
				Goof Design, gevestigd aan Oosterweg 87, Groningen. KVK-nummer 90939670. BTW-nummer
				NL004067438B58. Voor vragen over dit beleid: <a href="mailto:info@goof.design">info@goof.design</a>.
			</p>
		</section>

		<section>
			<h2>welke gegevens we verzamelen</h2>
			<p>Via het contactformulier verzamelen we:</p>
			<ul>
				<li>voor- en achternaam</li>
				<li>telefoonnummer</li>
				<li>e-mailadres</li>
				<li>inhoud van je bericht</li>
			</ul>
			<p>
				We verzamelen verder geen gegevens via de website. Er worden geen analytische of
				tracking-cookies geplaatst.
			</p>
		</section>

		<section>
			<h2>waarom we deze gegevens gebruiken</h2>
			<p>
				We gebruiken je gegevens uitsluitend om contact met je op te nemen, je vraag te
				beantwoorden of een samenwerking voor te bereiden. De grondslag hiervoor is jouw expliciete
				toestemming door het versturen van het formulier.
			</p>
		</section>

		<section>
			<h2>hoe lang we gegevens bewaren</h2>
			<p>
				Berichten via het contactformulier bewaren we maximaal 12 maanden na het laatste contact,
				tenzij uit de correspondentie een samenwerking ontstaat. In dat laatste geval gelden de
				wettelijke bewaartermijnen voor fiscale en administratieve doeleinden (7 jaar).
			</p>
		</section>

		<section>
			<h2>derde partijen</h2>
			<p>Voor de werking van de website schakelen we deze verwerkers in:</p>
			<ul>
				<li><strong>Resend</strong> — verzendt het contactformulier als e-mail. Gevestigd in de VS, verwerkt data volgens hun privacybeleid.</li>
				<li><strong>Vercel</strong> — host de website en verwerkt server-logs. Gevestigd in de VS.</li>
				<li><strong>Storyblok</strong> — contentbeheersysteem. Gevestigd in Oostenrijk/EU.</li>
				<li><strong>Google Fonts</strong> — lettertypen worden geladen via fonts.googleapis.com. Hierbij wordt je IP-adres kortstondig gedeeld met Google.</li>
			</ul>
		</section>

		<section>
			<h2>jouw rechten</h2>
			<p>Onder de AVG heb je het recht om:</p>
			<ul>
				<li>inzage te vragen in jouw gegevens</li>
				<li>gegevens te laten corrigeren of verwijderen</li>
				<li>de verwerking te beperken of bezwaar te maken</li>
				<li>je gegevens over te dragen</li>
				<li>je toestemming in te trekken</li>
			</ul>
			<p>
				Stuur een verzoek naar <a href="mailto:info@goof.design">info@goof.design</a>. We reageren
				binnen 30 dagen.
			</p>
		</section>

		<section>
			<h2>klachten</h2>
			<p>
				Ben je niet tevreden over hoe we met jouw gegevens omgaan? Dan kun je een klacht indienen
				bij de Autoriteit Persoonsgegevens via
				<a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer"
					>autoriteitpersoonsgegevens.nl</a
				>.
			</p>
		</section>

		<section>
			<h2>beveiliging</h2>
			<p>
				De website gebruikt HTTPS voor versleutelde verbindingen. Formulierinvoer wordt server-side
				gevalideerd en tegen misbruik beschermd. Toegang tot gegevens is beperkt tot Goof Design.
			</p>
		</section>
	</div>
</main>

<FooterInverse />

<style>
	.legal {
		background: #4a5b4c;
		color: #fdff96;
		min-height: 60vh;
		padding: clamp(5rem, 10vh, 8rem) 10px clamp(3rem, 6vh, 5rem);
		font-family: 'Outfit', sans-serif;
	}

	.legal__wrap {
		max-width: 780px;
		margin: 0 auto;
		padding: 0 clamp(15px, 2vw, 30px);
	}

	.legal h1 {
		font-size: 2.5rem;
		font-weight: 500;
		text-transform: lowercase;
		margin-bottom: 1rem;
	}

	.legal .lead {
		font-size: 1.05rem;
		font-weight: 300;
		line-height: 1.6;
		opacity: 0.9;
		margin-bottom: 2.5rem;
	}

	.legal section {
		margin-bottom: 2rem;
	}

	.legal h2 {
		font-size: 1.25rem;
		font-weight: 500;
		text-transform: lowercase;
		margin-bottom: 0.6rem;
	}

	.legal p,
	.legal li {
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.7;
	}

	.legal p {
		margin-bottom: 0.75rem;
	}

	.legal ul {
		margin: 0 0 0.75rem 1.25rem;
		padding: 0;
	}

	.legal li {
		margin-bottom: 0.25rem;
	}

	.legal a {
		color: #fdff96;
		text-decoration: underline;
	}

	.legal strong {
		font-weight: 500;
	}

	@media (max-width: 600px) {
		.legal h1 {
			font-size: 2rem;
		}
	}
</style>
