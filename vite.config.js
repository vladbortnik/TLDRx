import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  
  return {
    build: {
      sourcemap: true,
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

      // TEMPORARILY DISABLED: Testing if PWA causes 721ms INP in production
      // PWA plugin removed to test performance without service worker
    ]
  }
})