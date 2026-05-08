import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// VITE_BASE_URL is set by the GitHub Pages workflow to "/<repo-name>/"
// so assets resolve under https://<user>.github.io/<repo>/. Defaults to "/"
// for local dev and any host that serves from the root.
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Bern Tram Roulette',
        short_name: 'Tram Roulette',
        description: 'Spin a random Bern tram destination and complete a fun challenge.',
        theme_color: '#E2001A',
        background_color: '#E2001A',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'en',
        icons: [
          { src: 'pwa-64x64.png',           sizes: '64x64',   type: 'image/png' },
          { src: 'pwa-192x192.png',         sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png',         sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the build output and the static assets in public/.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        // Cache live tram departures with a network-first strategy so the
        // app still opens (with stale data) if the user is offline.
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/transport\.opendata\.ch\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'opendata-ch',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 5 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
