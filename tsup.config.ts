import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  splitting: false,
  treeshake: true,
  minify: true,
  target: 'es2020',
  outDir: 'dist'
});