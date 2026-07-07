import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/identity-web',
  plugins: [react(), nxViteTsPaths()],
  build: {
    outDir: '../../dist/apps/identity-web',
    emptyOutDir: true,
    reportCompressedSize: true
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
