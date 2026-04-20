<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	const GA4_ID = 'G-7WDSTC2C1N';

	function updateGA4Consent(analyticsGranted: boolean, marketingGranted: boolean) {
		if (!browser || typeof (window as any).gtag !== 'function') return;
		(window as any).gtag('consent', 'update', {
			analytics_storage: analyticsGranted ? 'granted' : 'denied',
			ad_storage: marketingGranted ? 'granted' : 'denied',
			ad_user_data: marketingGranted ? 'granted' : 'denied',
			ad_personalization: marketingGranted ? 'granted' : 'denied'
		});
	}

	onMount(() => {
		const consent = document.cookie.match(/cookie-consent=([^;]+)/)?.[1];
		if (consent) {
			try {
				const prefs = JSON.parse(decodeURIComponent(consent));
				updateGA4Consent(prefs.analytics || false, prefs.marketing || false);
			} catch {
				/* ignore */
			}
		}

		const handleConsent = (e: Event) => {
			const detail = (e as CustomEvent).detail;
			updateGA4Consent(detail.analytics || false, detail.marketing || false);
		};
		window.addEventListener('cookie-consent-applied', handleConsent);

		return () => window.removeEventListener('cookie-consent-applied', handleConsent);
	});

	onNavigate((navigation) => {
		document.documentElement.style.scrollBehavior = 'auto';

		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate(() => {
		document.documentElement.style.scrollBehavior = '';

		if (browser && typeof (window as any).gtag === 'function') {
			(window as any).gtag('config', GA4_ID, { page_path: window.location.pathname });
		}
	});
</script>

<slot />

<CookieBanner />

<style>
	@keyframes slide-from-right {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slide-to-left {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(-30px);
		}
	}

	:global(::view-transition-old(root)) {
		animation: slide-to-left 0.15s ease-out both;
	}

	:global(::view-transition-new(root)) {
		animation: slide-from-right 0.15s ease-out both;
	}
</style>
