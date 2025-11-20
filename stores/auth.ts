import { defineStore } from 'pinia'
import { useCookie, useNuxtApp } from '#app'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { IUser } from '~/types/user'
import { useUser } from '~/composables/useUser'

export const useAuthStore = defineStore('auth', () => {
    // ✅ State
    const { $api } = useNuxtApp()
    const token = ref<string>('')
    const router = useRouter()
    const user = ref<IUser | null>(null)
    const { userProfileData, getProfile } = useUser()

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
    }

    // ✅  (logout)
    const logout = async () => {
        token.value = ''
        const authToken = useCookie('auth_token')
        const response = await $api.auth.logout()
        authToken.value = null
        router.push('/')
    }

    const setUserProfile = (newUser: IUser) => {
        user.value = newUser
    }

    const getUserProfile = async () => {
        if (!token.value) return
        await getProfile()
        user.value = userProfileData.value
    }

    // ✅ Keep `user` in sync with `userProfileData`
    watch(userProfileData, (newVal) => {
        if (newVal) user.value = newVal
    })

    // ✅ Initialize store on use
    const init = async () => {
        loadToken()
        if (token.value) {
            await getUserProfile()
        }
    }

    return {
        token,
        user,
        init,
        setToken,
        loadToken,
        logout,
        setUserProfile,
        getUserProfile
    }
})
