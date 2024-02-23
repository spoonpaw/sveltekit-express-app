// svelte.config.js

import adapter from '@sveltejs/adapter-node'; // Switched to adapter-node for Express integration
import preprocess from 'svelte-preprocess'; // Correctly import svelte-preprocess for TypeScript

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Use svelte-preprocess for TypeScript support among other things
	preprocess: preprocess({
		// options passed to svelte-preprocess
		// you can specify TypeScript options here under `typescript` key
	}),

	kit: {
		// Use adapter-node for your Express-based deployment
		adapter: adapter({
			// adapter-node options can be specified here
			// default options are shown
			out: 'build',
			precompress: false,
			envPrefix: ''
		})
	}
};

export default config;
