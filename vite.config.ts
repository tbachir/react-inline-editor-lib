import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'CryptonicInlineEditor',
      fileName: (format) => `inline-editor.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', 'react-hot-toast', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
          'react-hot-toast': 'ReactHotToast',
          'lucide-react': 'LucideReact',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name;
        },
      },
    },
    copyPublicDir: false,
  },
});
