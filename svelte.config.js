import preprocess from 'svelte-preprocess';
import path from 'path';
import vercel from '@sveltejs/adapter-vercel';

import replace from '@rollup/plugin-replace';
//import workbox from 'rollup-plugin-workbox-inject';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $components: path.resolve('./src/core/components'),
          $styles: path.resolve('./src/styles'),
          $features: path.resolve('./src/features'),
          $utils: path.resolve('./src/core/utils'),
          $store: path.resolve('./src/core/store'),
          $constants: path.resolve('./src/core/constants'),
          $i18n: path.resolve('./src/i18n')
        }
      },
      build: {
        rollupOptions: {
          plugins: [
            replace({
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            }),

          ]
        }
      }
    },
    adapter: vercel()
  }
};

export default config;
