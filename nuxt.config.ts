// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/google-fonts', '@nuxt/image'],
    googleFonts: {
        families: {
            'DM+Sans': [400, 500, 700], // choose weights you need
            'Playfair+Display': [400, 700] 
        },
        display: 'swap'
    },
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