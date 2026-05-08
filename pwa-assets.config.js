import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Generates the icon PNGs (favicon, apple-touch-icon, maskable, any) under
// public/ from the source SVG. Re-run with `npx pwa-assets-generator` if
// you replace the source artwork.
export default defineConfig({
  preset: minimal2023Preset,
  images: ['public/favicon.svg'],
})
