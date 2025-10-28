import { ref } from 'vue'
import type { IUser } from '~/types/user'

export function useProfile() {
    const userProfileData = ref<IUser | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const getProfile = async (token: string) => {
        isLoading.value = true
        error.value = null
        try {
            const response: { data: IUser } = await $fetch(
                'https://timestory.tmdsite.my.id/api/user/profile',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
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
