<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	// Check if a link is active
	function isActive(path: string): boolean {
		return $page.url.pathname.startsWith(path);
	}

	// Close menu on escape key
	onMount(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') menuOpen = false;
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	});
</script>

<header class="header">
	<div class="shell">
		<a href="/" class="brand" aria-label="Goof">
			<img src="/logo/goof-logo-geel.png" alt="Goof" class="logo" />
		</a>

		<nav class="navpill" aria-label="Primary">
			<a href="/werk" class:active={isActive('/werk')}>werk</a>
			<a href="/diensten" class:active={isActive('/diensten')}>diensten</a>
			<a href="/over" class:active={isActive('/over')}>over</a>
			<a href="/contact" class:active={isActive('/contact')}>contact</a>
		</nav>

		<a href="/contact" class="cta">let's goof</a>

		<!-- Mobile menu button -->
		<button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="mobile-menu" on:click={closeMenu} on:keydown={(e) => e.key === 'Enter' && closeMenu()} role="button" tabindex="0">
			<nav class="mobile-nav">
				<a href="/werk" on:click={closeMenu} class:active={isActive('/werk')}>werk</a>
				<a href="/diensten" on:click={closeMenu} class:active={isActive('/diensten')}>diensten</a>
				<a href="/over" on:click={closeMenu} class:active={isActive('/over')}>over</a>
				<a href="/contact" on:click={closeMenu} class:active={isActive('/contact')}>contact</a>
				<a href="/contact" class="mobile-cta" on:click={closeMenu}>let's goof</a>
			</nav>
		</div>
	{/if}
</header>

<style>
	.header {
		background: #4a5b4c;
		padding: 0 10px;
		view-transition-name: header;
		position: relative;
		z-index: 1000;
	}

	.shell {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(1rem, 1.5vw, 1.5rem) 0;
	}

	.brand {
		justify-self: start;
		text-decoration: none;
	}

	.logo {
		height: clamp(40px, 5vw, 60px);
		width: auto;
	}

	.navpill {
		justify-self: center;
		display: inline-flex;
		align-items: center;
		gap: clamp(1.5rem, 2.5rem, 2.5rem);
		padding: clamp(0.5rem, 0.75rem, 0.75rem) clamp(1.5rem, 2.5rem, 2.5rem);
		border-radius: 9999px;
		border: 1px solid #fdff96;
	}

	.navpill a {
		font-size: clamp(0.9rem, 1.2vw, 1.2rem);
		font-weight: 400;
		color: #fdff96;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 50px;
		border: 1px solid transparent;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		font-family: 'Outfit', sans-serif;
	}

	.navpill a:hover {
		color: #ffffff;
		background: rgba(253, 255, 150, 0.1);
	}

	.navpill a.active {
		border-color: #fdff96;
	}

	.cta {
		justify-self: end;
		padding: 15px 35px;
		border-radius: 50px;
		background: #fdff96;
		color: #4a5b4c;
		text-decoration: none;
		font-size: clamp(0.9rem, 1.2vw, 1.1rem);
		font-weight: 400;
		transition: filter 0.2s ease;
		font-family: 'Outfit', sans-serif;
	}

	.cta:hover {
		filter: brightness(0.95);
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		justify-self: end;
	}

	.menu-toggle .bar {
		width: 25px;
		height: 3px;
		background: #fdff96;
		border-radius: 3px;
	}

	.mobile-menu {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1001;
		animation: fadeIn 0.2s ease;
	}

	.mobile-nav {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 80%;
		max-width: 300px;
		background: #fdff96;
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		animation: slideIn 0.3s ease;
	}

	.mobile-nav a {
		color: #4a5b4c;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 400;
		text-transform: lowercase;
		padding: 0.75rem 1rem;
		border: 1px solid transparent;
		border-radius: 50px;
		transition: opacity 0.2s ease;
		font-family: 'Outfit', sans-serif;
	}

	.mobile-nav a:hover {
		opacity: 0.8;
	}

	.mobile-nav a.active {
		border-color: #4a5b4c;
	}

	.mobile-cta {
		background: #4a5b4c;
		color: #fdff96 !important;
		padding: 1rem 2rem !important;
		font-weight: 400 !important;
		margin-top: auto;
		font-family: 'Outfit', sans-serif;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideIn {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@media (max-width: 1024px) {
		.header {
			padding: 0;
		}
	}

	@media (max-width: 900px) {
		.shell {
			grid-template-columns: 1fr auto;
			padding: 1rem;
		}

		.logo {
			height: 35px;
		}

		.navpill,
		.cta {
			display: none;
		}

		.menu-toggle {
			display: flex;
		}
	}
</style>
