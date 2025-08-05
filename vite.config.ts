import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	server: {
		port: 8688,
		proxy: {
			'/Api': {
				target: 'http://localhost:2500',
				changeOrigin: true
			},
			'/Proxy': {
				target: 'http://localhost:2500',
				changeOrigin: true
			},
			'/swagger': {
				target: 'http://localhost:2500',
				changeOrigin: true
			}
		}
	}
});
