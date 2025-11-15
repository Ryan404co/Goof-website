<section class="footer-section">
	<div class="footer-container">
		<div class="footer-left">
			<h2>samenwerken?</h2>
			<p>
				Neem contact op voor een vrijblijvende offerte, een kennismakingsgesprek, of als je gewoon
				een vraag hebt!
			</p>
			<a href="/contact" class="footer-cta-button">let's goof</a>
		</div>

		<div class="footer-right">
			<div class="footer-info-grid">
				<div class="footer-info-item">
					<h3>mailen</h3>
					<p><a href="mailto:info@goof.design">info@goof.design</a></p>
				</div>

				<div class="footer-info-item">
					<h3>bellen</h3>
					<p><a href="tel:+31624576082">+31 6 24576082</a></p>
				</div>

				<div class="footer-info-item">
					<h3>sliden</h3>
					<p>@goofdesign.nl</p>
				</div>

				<div class="footer-info-item">
					<h3>postduif</h3>
					<p>Oosterweg 87,<br />Groningen</p>
				</div>

				<div class="footer-info-item">
					<h3>faxen</h3>
					<p>wat is dat?</p>
				</div>
			</div>

			<div class="footer-social-icons">
				<a href="/" class="footer-social-icon linkedin-icon" aria-label="LinkedIn">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="linkedin-logo"
							d="M8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/>
					</svg>
				</a>
				<a href="/" class="footer-social-icon instagram-icon" aria-label="Instagram">
					<img src="/instagram-svg/instagram-green.svg" alt="Instagram" />
				</a>
			</div>
		</div>
	</div>
</section>

<div class="footer-bottom-text">Algemene voorwaarden | Bedrijfsgegevens</div>

<style>
	.footer-section {
		background-color: #4a5b4c;
		padding: clamp(40px, 5vw, 60px) clamp(20px, 3vw, 40px);
		margin: clamp(20px, 3vw, 40px) 10px 0px 10px;
		border-radius: 20px 20px 0 0;
		font-family: 'Outfit', sans-serif;
	}

	.footer-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 60px;
	}

	.footer-left {
		flex: 0 0 auto;
		max-width: 500px;
	}

	.footer-left h2 {
		color: #fdff96;
		font-size: clamp(2rem, 4vw, 2.5rem);
		margin-bottom: 20px;
		font-weight: 400;
	}

	.footer-left p {
		color: #fdff96;
		font-size: clamp(0.9rem, 1.5vw, 1rem);
		line-height: 1.6;
		margin-bottom: 30px;
		font-weight: 300;
	}

	.footer-cta-button {
		display: inline-block;
		background-color: #fdff96;
		color: #4a5b4c;
		padding: 18px 45px;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 400;
		font-size: 1.1rem;
		transition: filter 0.2s ease;
	}

	.footer-cta-button:hover {
		filter: brightness(0.95);
	}

	.footer-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 20px;
		margin-left: auto;
	}

	.footer-info-grid {
		display: grid;
		grid-template-columns: repeat(3, auto);
		gap: clamp(20px, 3vw, 40px);
		justify-content: flex-end;
	}

	.footer-info-grid .footer-info-item:nth-child(4) {
		grid-column: 2;
	}

	.footer-info-grid .footer-info-item:nth-child(5) {
		grid-column: 3;
	}

	.footer-info-item {
		color: #fdff96;
		display: block !important;
		flex-direction: initial !important;
	}

	.footer-info-item h3 {
		font-size: 1.2rem;
		margin-bottom: 10px;
		font-weight: 400;
		margin: 0 0 10px 0 !important;
	}

	.footer-info-item p {
		font-size: 1rem;
		line-height: 1.5;
		font-weight: 200;
		margin: 0 !important;
	}

	.footer-info-item a {
		color: #fdff96;
		text-decoration: none;
	}

	.footer-info-item a:hover {
		text-decoration: underline;
	}

	.footer-social-icons {
		display: flex;
		gap: 15px;
		justify-content: flex-end;
	}

	.footer-social-icon {
		width: 50px;
		height: 50px;
		background-color: #fdff96;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		transition: filter 0.2s ease;
	}

	.footer-social-icon:hover {
		filter: brightness(0.95);
	}

	.footer-social-icon svg {
		width: 36px;
		height: 36px;
		fill: #4a5b4c;
	}

	.footer-social-icon img {
		width: 36px;
		height: 36px;
	}

	.footer-bottom-text {
		text-align: right;
		color: #666;
		font-size: 0.9rem;
		margin: 0;
		padding: 20px 90px;
		background-color: #f0f0f0;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	@media (max-width: 1024px) {
		
		.footer-container {
			flex-direction: column;
			gap: 40px;
		}

		.footer-right {
			width: 100%;
			align-items: flex-start;
		}

		.footer-social-icons {
			justify-content: flex-start;
		}

		.footer-info-grid {
			width: 100%;
		}

		.footer-bottom-text {
			text-align: left;
		}
	}

	@media (max-width: 768px) {
		.footer-section {
			margin: 20px;
			padding: 40px 30px;
		}

		.footer-left h2 {
			font-size: 2rem;
		}

		.footer-info-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 30px;
		}

		.footer-info-grid .footer-info-item:nth-child(4) {
			grid-column: auto;
		}

		.footer-info-grid .footer-info-item:nth-child(5) {
			grid-column: auto;
		}
	}

	@media (max-width: 480px) {
		.footer-bottom-text {
			padding: 20px 20px;
		}

		.footer-section {
			margin: 20px 10px 0 10px;
			padding: 30px 20px;
		}

		.footer-cta-button {
			padding: 15px 35px;
			font-size: 1rem;
		}

		.footer-left h2 {
			font-size: 1.5rem;
		}

		.footer-info-grid {
			grid-template-columns: 1fr;
		}

		.footer-info-grid .footer-info-item:nth-child(4) {
			grid-column: auto;
		}

		.footer-info-grid .footer-info-item:nth-child(5) {
			grid-column: auto;
		}
	}
</style>
