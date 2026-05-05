<script lang="ts">
	import { page } from '$app/stores';
	import { textString } from '$lib/cms/texts';

	$: t = $page.data.texts;
	$: sectionTitle = textString(t, 'diensten.tiles.section_title', 'diensten');
	$: brandingTitle = textString(t, 'diensten.tiles.branding_title', 'branding');
	$: brandingText = textString(t, 'diensten.tiles.branding_text', '');
	$: grafischTitle = textString(t, 'diensten.tiles.grafisch_title', 'grafisch ontwerp');
	$: grafischText = textString(t, 'diensten.tiles.grafisch_text', '');
	$: webdesignTitle = textString(t, 'diensten.tiles.webdesign_title', 'webdesign');
	$: webdesignText = textString(t, 'diensten.tiles.webdesign_text', '');
</script>

<section class="services-section">
	<div class="services-wrapper">
		<h2 class="section-title">{sectionTitle}</h2>
		<div class="services-container">
			<div class="service-wrapper">
				<div class="service-card">
					<h2>{brandingTitle}</h2>
					<p>{brandingText}</p>
				</div>
			</div>

			<div class="service-wrapper">
				<div class="service-card">
					<h2>{grafischTitle}</h2>
					<p>{grafischText}</p>
				</div>
			</div>

			<div class="service-wrapper">
				<div class="service-card">
					<h2>{webdesignTitle}</h2>
					<p>{webdesignText}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.services-section {
		background-color: #4a5b4c;
		padding: 90px 10px 80px;
		font-family: 'Outfit', sans-serif;
	}
	.services-wrapper { max-width: 1400px; margin: 0 auto; }
	.section-title {
		color: #fdff96;
		font-size: 2.5rem;
		font-weight: 500;
		margin-bottom: 20px;
		text-align: left;
	}
	.services-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 40px;
	}
	.service-wrapper { display: flex; flex-direction: column; gap: 20px; }
	.service-card {
		background-color: transparent;
		border: 1px solid #fdff96;
		border-radius: 20px;
		padding: 40px;
		transition: transform 0.3s ease;
		flex-grow: 1;
	}
	.service-wrapper:hover .service-card { transform: translateY(-5px); }
	.service-card h2 { color: #fdff96; font-size: 2rem; margin-bottom: 20px; font-weight: 500; }
	.service-card p { color: #fdff96; line-height: 1.6; margin-bottom: 0; font-size: 1rem; font-weight: 300; }

	@media (max-width: 900px) {
		.services-section { padding: 80px 1.5rem; }
		.services-container { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
		.service-card { padding: 35px; }
	}
	@media (max-width: 768px) {
		.services-section { padding: 40px 1rem; }
		.services-container { gap: 30px; }
		.service-card { padding: 30px; }
		.service-card h2 { font-size: 1.5rem; }
	}
	@media (max-width: 600px) {
		.services-section { padding: 35px 1rem; }
		.service-card { padding: 28px; border-radius: 16px; }
		.service-card h2 { font-size: 1.4rem; }
		.section-title { font-size: 2rem; }
	}
	@media (max-width: 480px) {
		.services-section { padding: 30px 1rem; }
		.service-card { padding: 24px; }
		.service-card h2 { font-size: 1.35rem; }
	}
</style>
