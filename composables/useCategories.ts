import { ref } from 'vue'
import type { ICategory } from '~/types/category'

export function useCategories() {
    const categoryList = ref<ICategory[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const getCategories = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response: { data: ICategory[] } = await $fetch(
                'https://timestory.tmdsite.my.id/api/category',
                {
                    method: 'GET'
                }
            )
            categoryList.value = response.data
        } catch (err: any) {
            console.error('❌ Failed to fetch categories:', err)
            error.value = err?.message || 'Failed to load categories.'
        } finally {
            isLoading.value = false
        }
    }

    return {
        categoryList,
        isLoading,
        error,
        getCategories
    }
}
