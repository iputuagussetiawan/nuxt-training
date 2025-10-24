import { defineStore } from 'pinia'
import { useCookie } from '#app'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // ✅ State
    const token = ref<string>('')

    // ✅ Save token (to state + cookie)
    const setToken = (newToken: string) => {
        token.value = newToken
        const authToken = useCookie('auth_token', {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            secure: true,
            sameSite: 'lax'
        })
        authToken.value = newToken
    }

    // ✅ Load token (from cookie on app start)
    const loadToken = () => {
        const authToken = useCookie<string | null>('auth_token')
        token.value = authToken.value || ''
        console.log('📦 Token loaded:', token.value)
    }

    // ✅ Clear token (logout)
    const clearToken = () => {
        token.value = ''
        const authToken = useCookie('auth_token')
        authToken.value = null
        console.log('🧹 Token cleared')
    }

    // ✅ Automatically load token when store is used
    if (process.client) {
        loadToken()
    }

    return {
        token,
        setToken,
        loadToken,
        clearToken
    }
})
