import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.tsx',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  splitting: false,
  treeshake: true
});