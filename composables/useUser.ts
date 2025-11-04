import { useNuxtApp } from '#imports'
import { ref } from 'vue'
import type { IUser } from '~/types/user'

export function useUser() {
    const { $api } = useNuxtApp()
    const userProfileData = ref<IUser | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const getProfile = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await $api.user.getProfile()
            userProfileData.value = response.data
        } catch (err: any) {
            console.error('❌ Failed to fetch user profile:', err)
            error.value = err?.message || 'Failed to load user profile.'
        } finally {
            isLoading.value = false
        }
    }
    return {
        userProfileData,
        isLoading,
        error,
        getProfile
    }
}
