import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUser } from '~/types/user'

export const useUserStore = defineStore('auth', () => {
    // ✅ State
    const user = ref<IUser | null>(null)

    const setUserProfile = (newUser: IUser) => {
        user.value = newUser
    }

    const getUserProfile = async () => {
        // ✅ Fetch user profile from API
        try {
            const response = await $api.user.getProfile()
            user.value = response.data
        } catch (error) {
            console.error('Failed to fetch data profile:', error)
        }
    }
    return {
        user,
        setUserProfile,
        getUserProfile
    }
})
