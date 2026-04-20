<section class="footer-section">
	<div class="footer-inner">
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
	</div>
</section>

<div class="footer-bottom">
<div class="footer-bottom-text">
	<span>&copy; {new Date().getFullYear()} Goof Design</span>
	<nav class="footer-legal" aria-label="Juridisch">
		<a href="/privacy">privacy</a>
		<a href="/cookies">cookies</a>
		<a href="/voorwaarden">voorwaarden</a>
	</nav>
	<a href="https://404co.nl" target="_blank" rel="noopener noreferrer">Ontwikkeld door 404 collective</a>
</div>
</div>

<style>
	.footer-section {
		background-color: #4a5b4c;
		padding: clamp(40px, 5vw, 60px) clamp(25px, 3vw, 40px);
		width: calc(100% - 20px);
		max-width: 1400px;
		margin: clamp(20px, 3vw, 40px) auto 0 auto;
		border-radius: 20px 20px 0 0;
		font-family: 'Outfit', sans-serif;
		box-sizing: border-box;
	}

	.footer-inner {
		width: 100%;
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
		font-weight: 500;
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
		font-weight: 500;
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
		font-weight: 500;
		line-height: 1;
	}

	.footer-info-item p {
		font-size: 1rem;
		line-height: 1.5;
		font-weight: 300;
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

	.footer-bottom {
		background-color: #f0f0f0;
		width: calc(100% - 20px);
		max-width: 1400px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.footer-bottom-text {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		color: #666;
		font-size: 0.9rem;
		padding: 20px clamp(25px, 3vw, 40px);
		font-family: 'Outfit', sans-serif;
	}

	.footer-bottom-text a {
		color: inherit;
		text-decoration: none;
	}

	.footer-bottom-text a:hover {
		text-decoration: underline;
	}

	.footer-legal {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
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

		.footer-social-icons,
		.footer-info-grid {
			justify-content: flex-start;
		}
	}

	@media (max-width: 900px) {
		.footer-section {
			width: calc(100% - 48px);
			padding: clamp(30px, 5vw, 50px) clamp(20px, 3vw, 35px);
		}

		.footer-bottom {
			width: calc(100% - 48px);
		}

		.footer-container {
			gap: 2.5rem;
		}

		.footer-info-grid {
			grid-template-columns: repeat(3, auto);
			gap: clamp(18px, 2.5vw, 30px);
		}
	}

	@media (max-width: 768px) {
		.footer-section {
			width: calc(100% - 32px);
			padding: 40px 30px;
		}

		.footer-bottom {
			width: calc(100% - 32px);
		}

		.footer-info-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 30px;
		}

		.footer-info-grid .footer-info-item:nth-child(n+4) {
			grid-column: auto;
		}
	}

	@media (max-width: 600px) {
		.footer-section {
			padding: 2.5rem 1.5rem;
			border-radius: 16px 16px 0 0;
		}

		.footer-left h2 {
			font-size: 1.75rem;
		}

		.footer-cta-button {
			padding: 16px 40px;
			font-size: 1.05rem;
		}

		.footer-info-item h3 {
			font-size: 1.05rem;
		}

		.footer-info-item p {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		.footer-section {
			padding: 2.5rem 1.5rem;
		}

		.footer-container {
			gap: 2.5rem;
		}

		.footer-bottom-text {
			padding: 15px 1.5rem;
		}

		.footer-cta-button {
			padding: 15px 35px;
			font-size: 1rem;
		}

		.footer-info-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}

		.footer-social-icons {
			grid-column: auto;
		}
	}
</style>
