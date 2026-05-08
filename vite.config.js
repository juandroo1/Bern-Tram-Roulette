import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE_URL is set by the GitHub Pages workflow to "/<repo-name>/"
// so assets resolve under https://<user>.github.io/<repo>/. Defaults to "/"
// for local dev and any host that serves from the root.
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react(), tailwindcss()],
})
