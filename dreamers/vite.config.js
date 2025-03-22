import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // 👈 Important for correct asset loading
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // 👈 Fixes refresh issues in dev mode
  },
  preview: {
    port: 4173, // 👈 Ensures Vite's preview mode runs correctly
    open: true
  }
});
