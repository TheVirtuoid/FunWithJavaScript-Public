import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		exclude: ['@babylonjs/havok']
	},
	server: {
		fs: {
			allow: ['../..']
		}
	},
	assetsInclude: ['**/*.wasm']
});
