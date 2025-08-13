// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/scss/main.scss'],
  vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: '@use "@/assets/scss/config" as *;'
              }
          }
      }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
