import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Pre-bundle these up front on dev-server start instead of letting
    // Vite discover them lazily on the first request. Without this,
    // the *first* request to a fresh dev server can trigger an
    // on-demand dependency-optimization pass, and Vite's client then
    // issues one automatic full browser reload to pick up the newly
    // optimized bundle — which is the other half of the "loads twice"
    // symptom on a cold `npm run dev` start (the StrictMode double
    // effect-run, fixed in main.jsx, was the other half).
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: false,
  },
});
