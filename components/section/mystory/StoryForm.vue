<script setup lang="ts">
// 1. Imports
import * as yup from 'yup'
import { computed, onMounted, ref, type Ref } from 'vue'
import { Form } from 'vee-validate'
import { useNuxtApp } from '#imports'
import UiButton from '~/components/ui/Button.vue'
import UiFormInput from '~/components/ui/FormInput.vue'
import UiImageUpload from '~/components/ui/ImageUpload.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import type { IStoryForm } from '~/types/story'
import type { ICategory } from '~/types/category'

// 2. Variable Declarations
const { $api } = useNuxtApp()
const categoryData: Ref<ICategory[] | null> = ref(null)
const selectedOptionCategory = ref() // ✅ default value

const allCategoryOptions = computed(() => {
    if (categoryData.value) {
        return categoryData.value.map((cat) => ({
            label: cat.name,
            value: cat.id
        }))
    }
    return [] // always return an array for safety
})

const isLoading = ref(false)
const errorMessage = ref<string>('')

const initialValues = ref({
    title: '',
    category: '',
    content: '',
    coverImage: ''
})

// ✅ Yup validation schema for register form
const profileFormSchema = yup.object({
    title: yup.string().required('Title is required'),
    category: yup.string().required('Category is required'),
    content: yup.string().required('Content is required'),
    coverImage: yup.string().required('Cover Image is required')
})

// 3. Methods/Functions
const handleSubmit = async (values: IStoryForm) => {
    errorMessage.value = ''
    console.log(values)
    // try {
    //     isLoading.value = true
    //     const response = await $api.user.updateProfile({
    //         body: values
    //     })
    //     console.log('✅ Success Update Profile:', response)
    //     router.push({ name: 'login' })
    // } catch (error: any) {
    //     console.error('❌ Error Update Profile:', error)
    //     // ✅ Handle different error types safely
    //     if (error?.data?.message) {
    //         errorMessage.value = error.data.message
    //     } else if (error?.message) {
    //         errorMessage.value = error.message
    //     } else {
    //         errorMessage.value =
    //             'An unexpected error occurred. Please try again.'
    //     }
    // } finally {
    //     isLoading.value = false
    // }
}

const getAllCategories = async () => {
    try {
        const response = await $api.category.list({
            query: {
                sort: 'asc',
                limit: 10
            }
        })
        categoryData.value = response.data
        selectedOptionCategory.value = response.data.find(
            (item: ICategory) => item.name.toLowerCase() === 'romance'
        )?.id
    } catch (error) {
        console.error('Failed to fetch all categories:', error)
    }
}
onMounted(() => {
    getAllCategories()
})
</script>

<template>
    <Form
        :initial-values="initialValues"
        :validation-schema="profileFormSchema"
        :enable-reinitialize="true"
        @submit="handleSubmit as (values: IStoryForm) => void"
        class="story-form"
    >
        <UiFormInput
            name="title"
            label="Title"
            placeholder="Enter a story title"
        />
        <FormSelect
            name="category"
            label="Category"
            :options="allCategoryOptions"
            placeholder="Select a category"
            :searchable="false"
        />
        <UiFormInput
            name="content"
            label="Content"
            type="textarea"
            placeholder="Enter a content here"
        />
        <UiImageUpload />
        <div class="story-form__action">
            <UiButton type="link" href="/dashboard" variant="primary-outline">
                Cancel
            </UiButton>
            <UiButton type="submit" variant="primary"> Post Story</UiButton>
        </div>
    </Form>
</template>

<style lang="scss" scoped>
.story-form {
    &__action {
        margin-top: 60px;
        display: inline-flex;
        gap: 41px;
    }
}
</style>
