<script lang="ts">
	import HeaderInverse from '$lib/components/layout/HeaderInverse.svelte';
	import FooterInverse from '$lib/components/layout/FooterInverse.svelte';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Cookiebeleid — Goof Design"
	description="Cookiebeleid van Goof Design. Welke cookies we wel en niet gebruiken op onze website."
	noindex
/>

<HeaderInverse />

<main id="main-content" class="legal">
	<div class="legal__wrap">
		<h1>cookiebeleid</h1>
		<p class="lead">
			Laatst bijgewerkt: april 2026. Dit cookiebeleid legt uit welke cookies en vergelijkbare
			technieken Goof gebruikt.
		</p>

		<section>
			<h2>wat zijn cookies</h2>
			<p>
				Cookies zijn kleine tekstbestanden die op je apparaat worden opgeslagen wanneer je een
				website bezoekt. Ze worden gebruikt om voorkeuren te onthouden of om bezoek te analyseren.
			</p>
		</section>

		<section>
			<h2>welke cookies we gebruiken</h2>
			<p>
				Goof plaatst <strong>geen</strong> eigen cookies voor analyse, marketing of tracking. De
				website functioneert volledig zonder cookies van Goof zelf.
			</p>
		</section>

		<section>
			<h2>externe diensten</h2>
			<p>
				Bij het laden van de pagina kan je browser verbinding maken met deze externe diensten:
			</p>
			<ul>
				<li>
					<strong>Google Fonts</strong> — laadt het lettertype "Outfit" via fonts.googleapis.com.
					Hierbij wordt je IP-adres kortstondig aan Google doorgegeven. Google plaatst zelf geen
					cookies via deze dienst, maar logt de request.
				</li>
				<li>
					<strong>Storyblok CDN</strong> — afbeeldingen worden geserveerd vanuit het Storyblok
					image-CDN.
				</li>
			</ul>
		</section>

		<section>
			<h2>cookies uitzetten</h2>
			<p>
				Je kunt cookies weigeren of verwijderen via de instellingen van je browser. Zie de
				hulppagina van je browser voor instructies. Het uitzetten van cookies heeft geen invloed op
				het gebruik van deze website.
			</p>
		</section>

		<section>
			<h2>meer informatie</h2>
			<p>
				Zie ook ons <a href="/privacy">privacybeleid</a> voor meer informatie over hoe we omgaan met
				persoonsgegevens.
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
