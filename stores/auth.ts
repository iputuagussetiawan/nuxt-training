import { defineStore } from 'pinia'
import { useCookie } from '#app'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { IUser } from '~/types/user'
import { useProfile } from '~/composables/useProfile'

export const useAuthStore = defineStore('auth', () => {
    // ✅ State
    const token = ref<string>('')
    const router = useRouter()
    const user = ref<IUser | null>(null)
    const { userProfileData, getProfile } = useProfile()

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
    const logout = () => {
        token.value = ''
        const authToken = useCookie('auth_token')
        authToken.value = null
        router.push('/')
    }

    const setUserProfile = (newUser: IUser) => {
        user.value = newUser
    }

    const getUserProfile = async () => {
        if (!token.value) return
        await getProfile(token.value)
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
