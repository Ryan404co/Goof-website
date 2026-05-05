import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'unsafe-inline',
					'https://www.googletagmanager.com',
					'https://*.googletagmanager.com'
				],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'img-src': [
					'self',
					'data:',
					'https://a.storyblok.com',
					'https://img2.storyblok.com',
					'https://*.supabase.co',
					'https://www.googletagmanager.com',
					'https://*.google-analytics.com'
				],
				'connect-src': [
					'self',
					'https://api.storyblok.com',
					'https://api-us.storyblok.com',
					'https://*.supabase.co',
					'https://www.google-analytics.com',
					'https://*.google-analytics.com',
					'https://*.analytics.google.com',
					'https://*.googletagmanager.com'
				],
				'frame-ancestors': ['none'],
				'base-uri': ['self'],
				'form-action': ['self']
			}
		}
	}
};

export default config;
