export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/scss/main.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/sanity'],
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
  },
  runtimeConfig: {
    public: {
      DEX_API_URL: 'https://api.dexscreener.com',
      CHAIN_ID: process.env.CHAIN_ID,
      PAIR_ID: process.env.PAIR_ID,
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_colors.scss" as *;
            @use "~/assets/scss/_animation.scss" as *;
            @use "~/assets/scss/_particles.scss" as *;            
          `,
          silenceDeprecations: ["legacy-js-api"],
        }
      }
    }
  },
  compatibilityDate: '2024-11-22'
})