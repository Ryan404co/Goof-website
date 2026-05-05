<script lang="ts">
	import { page } from '$app/stores';
	import { textString, textList } from '$lib/cms/texts';

	$: t = $page.data.texts;
	$: title = textString(t, 'diensten.detail.title', 'werkwijze');
	$: intro = textString(t, 'diensten.detail.intro', '');

	$: brandingTitle = textString(t, 'diensten.detail.branding.title', 'branding');
	$: brandingStep1 = textString(t, 'diensten.detail.branding.step1_text', '');
	$: brandingStep3 = textString(t, 'diensten.detail.branding.step3_text', '');
	$: brandingStep4 = textString(t, 'diensten.detail.branding.step4_text', '');
	$: brandingStep5 = textString(t, 'diensten.detail.branding.step5_text', '');
	$: brandingFooter = textString(t, 'diensten.detail.branding.footer', '');

	$: grafischTitle = textString(t, 'diensten.detail.grafisch.title', 'grafisch ontwerp');
	$: grafischStep1 = textString(t, 'diensten.detail.grafisch.step1_text', '');
	$: grafischStep3 = textString(t, 'diensten.detail.grafisch.step3_text', '');
	$: grafischStep4 = textString(t, 'diensten.detail.grafisch.step4_text', '');
	$: grafischTypesTitle = textString(t, 'diensten.detail.grafisch.types_title', '');
	$: grafischTypes = textList(t, 'diensten.detail.grafisch.types_list', []);

	$: webdesignTitle = textString(t, 'diensten.detail.webdesign.title', 'webdesign');
	$: webdesignStep1 = textString(t, 'diensten.detail.webdesign.step1_text', '');
	$: webdesignStep3 = textString(t, 'diensten.detail.webdesign.step3_text', '');
	$: webdesignStep4 = textString(t, 'diensten.detail.webdesign.step4_text', '');
	$: webdesignStep5 = textString(t, 'diensten.detail.webdesign.step5_text', '');
</script>

<section class="workflow-section">
	<div class="workflow-container">
		<div class="workflow-header">
			<h1>{title}</h1>
			<p class="workflow-intro">{intro}</p>
		</div>

		<div class="workflow-cards">
			<div class="workflow-card">
				<h2>{brandingTitle}</h2>

				<div class="workflow-step">
					<h3>1. kennismaking</h3>
					<p>{brandingStep1}</p>
				</div>
				<div class="workflow-step"><h3>2. offerte</h3></div>
				<div class="workflow-step">
					<h3>3. intake</h3>
					<p>{brandingStep3}</p>
				</div>
				<div class="workflow-step">
					<h3>4. concepting en visuele verkenning</h3>
					<p>{brandingStep4}</p>
				</div>
				<div class="workflow-step">
					<h3>5. oplevering</h3>
					<p>{brandingStep5}</p>
				</div>
				{#if brandingFooter}
					<div class="workflow-footer"><p>{brandingFooter}</p></div>
				{/if}
			</div>

			<div class="workflow-card">
				<h2>{grafischTitle}</h2>

				<div class="workflow-step">
					<h3>1. kennismaking</h3>
					<p>{grafischStep1}</p>
				</div>
				<div class="workflow-step"><h3>2. offerte</h3></div>
				<div class="workflow-step">
					<h3>3. ontwerpfase</h3>
					<p>{grafischStep3}</p>
				</div>
				<div class="workflow-step">
					<h3>4. oplevering en drukwerk</h3>
					<p>{grafischStep4}</p>
				</div>

				{#if grafischTypes.length > 0}
					<div class="design-types">
						<h4>{grafischTypesTitle}</h4>
						<div class="design-list">
							{#each grafischTypes as type}
								<p>{type}</p>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<div class="workflow-card">
				<h2>{webdesignTitle}</h2>

				<div class="workflow-step">
					<h3>1. kennismaking</h3>
					<p>{webdesignStep1}</p>
				</div>
				<div class="workflow-step"><h3>2. offerte</h3></div>
				<div class="workflow-step">
					<h3>3. tweede gesprek</h3>
					<p>{webdesignStep3}</p>
				</div>
				<div class="workflow-step">
					<h3>4. webdesign</h3>
					<p>{webdesignStep4}</p>
				</div>
				<div class="workflow-step">
					<h3>5. back-end development</h3>
					<p>{webdesignStep5}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.workflow-section {
		padding: 80px 10px;
		margin: 0;
		font-family: 'Outfit', sans-serif;
	}
	.workflow-container { max-width: 1400px; margin: 0 auto; }
	.workflow-header { margin-bottom: 40px; }
	.workflow-header h1 {
		color: #4a5b4c;
		font-size: 3rem;
		margin-bottom: 20px;
		font-weight: 500;
	}
	.workflow-intro {
		color: #4a5b4c;
		font-size: 1rem;
		line-height: 1.8;
		max-width: 1200px;
	}
	.workflow-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 30px;
		margin-top: 40px;
	}
	.workflow-card {
		background-color: #fdff96;
		border-radius: 20px;
		padding: 40px;
	}
	.workflow-card h2 {
		color: #4a5b4c;
		font-size: 2rem;
		margin-bottom: 30px;
		font-weight: 500;
	}
	.workflow-step { margin-bottom: 25px; }
	.workflow-step h3 {
		color: #4a5b4c;
		font-size: 1.1rem;
		margin-bottom: 10px;
		font-weight: 500;
	}
	.workflow-step p {
		color: #4a5b4c;
		line-height: 1.6;
		font-size: 0.95rem;
	}
	.design-types { margin-top: 20px; }
	.design-types h4 {
		color: #4a5b4c;
		font-size: 1rem;
		margin-bottom: 15px;
		font-weight: 500;
	}
	.design-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}
	.design-list p { color: #4a5b4c; font-size: 0.9rem; }
	.workflow-footer {
		margin-top: 25px;
		padding-top: 20px;
		border-top: 1px solid rgba(74, 91, 76, 0.2);
	}
	.workflow-footer p {
		color: #4a5b4c;
		line-height: 1.6;
		font-size: 0.95rem;
	}

	@media (max-width: 1024px) { .workflow-cards { grid-template-columns: 1fr; } }
	@media (max-width: 900px) {
		.workflow-section { padding: 60px 1.5rem; }
		.workflow-header h1 { font-size: 2.75rem; }
		.workflow-card { padding: 35px; }
	}
	@media (max-width: 768px) {
		.workflow-section { padding: 40px 1rem; }
		.workflow-header h1 { font-size: 2.5rem; }
		.workflow-card { padding: 30px; }
		.workflow-card h2 { font-size: 1.8rem; }
		.design-list { grid-template-columns: 1fr; }
	}
	@media (max-width: 600px) {
		.workflow-section { padding: 35px 1rem; }
		.workflow-header h1 { font-size: 2.25rem; }
		.workflow-card { padding: 26px; border-radius: 16px; }
		.workflow-card h2 { font-size: 1.6rem; margin-bottom: 25px; }
	}
	@media (max-width: 480px) {
		.workflow-section { padding: 30px 1rem; }
		.workflow-header h1 { font-size: 2rem; }
		.workflow-card { padding: 24px; border-radius: 16px; }
		.workflow-card h2 { font-size: 1.5rem; margin-bottom: 20px; }
		.workflow-step { margin-bottom: 20px; }
		.workflow-step h3 { font-size: 1rem; }
		.workflow-step p, .workflow-card p { font-size: 0.9rem; }
		.design-list { grid-template-columns: 1fr; }
	}
</style>
