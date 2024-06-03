import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Resource-Policy": "cross-origin"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
          @import '@fortawesome/fontawesome-free/scss/solid.scss';
          @import '@fortawesome/fontawesome-free/scss/regular.scss';
          @import '@fortawesome/fontawesome-free/scss/brands.scss';
          @import '@nabux-crush/crush-styles/nabuxInternalVariables';
          @import '@/styles/_variables.scss';
        `
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  }
})
