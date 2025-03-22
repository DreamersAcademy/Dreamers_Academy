import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',  // 👈 Ensures correct path resolution for Vercel
  build: {
    outDir: 'dist', // Ensures Vite outputs build files to "dist"
  }
})
