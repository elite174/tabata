import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['service-worker.js'],
    bundle: true,
    minify: true,
    format: 'iife',
    outfile: 'static/sw.js'
  })
  .catch(() => process.exit(1));
