import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/google-fonts', '@nuxt/image', '@vee-validate/nuxt'],
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage'
        }
    },
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
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api'
        }
    }
})
