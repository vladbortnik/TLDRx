import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  
  return {
    build: {
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          // Exclude large data files from source maps to prevent DevTools freezing
          sourcemapExcludeSources: true,
          manualChunks: (id) => {
            if (id.includes('src/data/')) {
              return 'data-chunks'
            }
          }
        }
      }
    },
    
    // Development-specific optimizations
    ...(isDevelopment && {
      // Disable source maps in development to prevent DevTools freezing
      build: {
        sourcemap: false,
        rollupOptions: {
          output: {
            sourcemapExcludeSources: true,
          }
        }
      },
      
      // Optimize HMR for large datasets
      server: {
        hmr: {
          // Reduce HMR update frequency to prevent DevTools lag
          overlay: false
        }
      },
      
      // Development-only esbuild options
      esbuild: {
        // Reduce bundle analysis overhead
        logOverride: {
          'this-is-undefined-in-esm': 'silent'
        }
      }
    }),
    
    plugins: [
      react(),

      // PWA Plugin - Re-enabled after confirming it's NOT the INP bottleneck
      // INP issue was caused by rendering 500 cards, solved with React Virtuoso
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'TL;DRx - Command Reference',
          short_name: 'TL;DRx',
          description: 'Interactive Unix/Linux command reference with 500+ commands',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          icons: [
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ]
  }
})