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
					<h3>faxen</h3>
					<p>wat is dat?</p>
				</div>

				<div class="footer-info-item">
					<h3>postduif</h3>
					<p>Oosterweg 87,<br />Groningen</p>
				</div>

				<div class="footer-social-icons">
				<a href="https://www.linkedin.com/company/106263260" target="_blank" rel="noopener noreferrer" class="footer-social-icon linkedin-icon" aria-label="LinkedIn">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="linkedin-logo"
							d="M8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/>
					</svg>
				</a>
				<a href="https://www.instagram.com/goofdesign.nl" target="_blank" rel="noopener noreferrer" class="footer-social-icon instagram-icon" aria-label="Instagram">
					<img src="/instagram-svg/instagram-green.svg" alt="Instagram" />
				</a>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="footer-bottom-text">&copy; {new Date().getFullYear()} Goof Design</div>

<style>
	.footer-section {
		background-color: #4a5b4c;
		padding: clamp(40px, 5vw, 60px) clamp(25px, 3vw, 40px);
		max-width: 1400px;
		margin: clamp(20px, 3vw, 40px) auto 0 auto;
		border-radius: 20px 20px 0 0;
		font-family: 'Outfit', sans-serif;
	}

	.footer-container {
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
		margin: 0 0 20px 0;
		font-weight: 600;
		line-height: 1;
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
	}

	.footer-info-item h3 {
		font-size: 1.2rem;
		margin: 0 0 10px 0;
		font-weight: 600;
		line-height: 1;
	}

	.footer-info-item p {
		font-size: 1rem;
		line-height: 1.5;
		font-weight: 200;
		margin: 0;
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
		grid-column: 3;
	}

	.footer-social-icon {
		width: 40px;
		height: 40px;
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
		width: 28px;
		height: 28px;
		fill: #4a5b4c;
	}

	.footer-social-icon img {
		width: 28px;
		height: 28px;
	}

	.footer-bottom-text {
		text-align: right;
		color: #666;
		font-size: 0.9rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: 20px clamp(25px, 3vw, 40px);
		background-color: #f0f0f0;
		font-family: 'Outfit', sans-serif;
	}

	@media (max-width: 1024px) {
		.footer-section {
			margin: 0 auto;
		}

		.footer-container {
			flex-direction: column;
			gap: 40px;
		}

		.footer-right {
			width: 100%;
			align-items: flex-start;
		}

		.footer-social-icons,
		.footer-info-grid {
			justify-content: flex-start;
		}

		.footer-bottom-text {
			text-align: left;
		}
	}

	@media (max-width: 768px) {
		.footer-section {
			margin: 20px auto 0 auto;
			padding: 40px 30px;
		}

		.footer-info-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 30px;
		}

		.footer-info-grid .footer-info-item:nth-child(n+4) {
			grid-column: auto;
		}
	}

	@media (max-width: 480px) {
		.footer-section {
			margin: 20px auto 0 auto;
			padding: 30px 1rem;
		}

		.footer-bottom-text {
			padding: 15px 1rem;
		}

		.footer-cta-button {
			padding: 15px 35px;
			font-size: 1rem;
		}

		.footer-info-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
