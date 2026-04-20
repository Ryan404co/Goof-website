<script lang="ts">
	import HeaderInverse from '$lib/components/layout/HeaderInverse.svelte';
	import FooterInverse from '$lib/components/layout/FooterInverse.svelte';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Algemene voorwaarden — Goof Design"
	description="Algemene voorwaarden van Goof Design voor branding, grafisch ontwerp en webdesign opdrachten."
	noindex
/>

<HeaderInverse />

<main id="main-content" class="legal">
	<div class="legal__wrap">
		<h1>algemene voorwaarden</h1>
		<p class="lead">
			Laatst bijgewerkt: april 2026. Deze voorwaarden gelden voor elke opdracht die met Goof Design
			wordt gesloten, tenzij schriftelijk anders overeengekomen.
		</p>

		<section>
			<h2>1. wie we zijn</h2>
			<p>
				Goof Design, gevestigd aan Oosterweg 87, Groningen. KVK-nummer 90939670. BTW-nummer
				NL004067438B58. In deze voorwaarden aangeduid als "Goof" of "opdrachtnemer".
			</p>
		</section>

		<section>
			<h2>2. toepasselijkheid</h2>
			<p>
				Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van Goof.
				Algemene voorwaarden van de opdrachtgever worden uitdrukkelijk van de hand gewezen.
			</p>
		</section>

		<section>
			<h2>3. offertes</h2>
			<p>
				Offertes zijn 30 dagen geldig. Kennelijke vergissingen binden Goof niet. De in de offerte
				genoemde prijzen zijn exclusief BTW en exclusief eventuele drukkosten, licenties of
				materiaal van derden, tenzij anders vermeld.
			</p>
		</section>

		<section>
			<h2>4. uitvoering</h2>
			<p>
				Goof voert de opdracht naar beste inzicht uit. De opdrachtgever zorgt voor tijdige en
				volledige aanlevering van de benodigde informatie en materialen. Vertraging aan de zijde van
				de opdrachtgever kan doorlooptijden beïnvloeden.
			</p>
		</section>

		<section>
			<h2>5. wijzigingen en meerwerk</h2>
			<p>
				Wijzigingen op het oorspronkelijke opdracht worden als meerwerk beschouwd en apart in
				rekening gebracht, tenzij anders overeengekomen. Goof informeert de opdrachtgever vooraf
				over eventuele meerkosten.
			</p>
		</section>

		<section>
			<h2>6. oplevering en goedkeuring</h2>
			<p>
				Het ontwerp wordt in fases opgeleverd ter goedkeuring. De opdrachtgever reageert binnen een
				redelijke termijn. Na eindoplevering en goedkeuring wordt een eventueel gewenste aanpassing
				als meerwerk gefactureerd.
			</p>
		</section>

		<section>
			<h2>7. facturatie en betaling</h2>
			<p>
				Bij opdrachten boven €1.500 wordt 30% bij aanvang gefactureerd. De betalingstermijn is 14
				dagen na factuurdatum. Bij niet-tijdige betaling is wettelijke handelsrente verschuldigd en
				komen incassokosten voor rekening van de opdrachtgever.
			</p>
		</section>

		<section>
			<h2>8. intellectueel eigendom</h2>
			<p>
				Tot volledige betaling berusten alle intellectuele eigendomsrechten bij Goof. Na betaling
				verkrijgt de opdrachtgever een niet-exclusief gebruiksrecht voor het overeengekomen doel.
				Goof behoudt het recht het werk te gebruiken voor eigen promotie (portfolio, social media).
			</p>
		</section>

		<section>
			<h2>9. aansprakelijkheid</h2>
			<p>
				Goof is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst. De totale
				aansprakelijkheid is beperkt tot het factuurbedrag van de betreffende opdracht.
			</p>
		</section>

		<section>
			<h2>10. ontbinding</h2>
			<p>
				Bij ontbinding van de overeenkomst worden reeds verrichte werkzaamheden naar verhouding
				gefactureerd. Goof heeft het recht de overeenkomst op te schorten of te beëindigen wanneer
				de opdrachtgever niet aan zijn verplichtingen voldoet.
			</p>
		</section>

		<section>
			<h2>11. toepasselijk recht</h2>
			<p>
				Op alle overeenkomsten met Goof is Nederlands recht van toepassing. Geschillen worden
				voorgelegd aan de bevoegde rechter in het arrondissement Noord-Nederland.
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

	.legal p {
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.7;
		margin-bottom: 0.75rem;
	}

	.legal a {
		color: #fdff96;
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.legal h1 {
			font-size: 2rem;
		}
	}
</style>
