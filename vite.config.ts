import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		// Allow tunneled hosts (ngrok, etc.) when testing on mobile or external devices.
		// `.foo` matches all subdomains of foo.
		allowedHosts: ['.ngrok-free.dev', '.ngrok.io', '.ngrok.app', '.ngrok-free.app']
	}
});
