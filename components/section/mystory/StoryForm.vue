<script setup lang="ts">
// 1. Imports
import * as yup from 'yup'
import { computed, onMounted, ref, type Ref } from 'vue'
import { Form } from 'vee-validate'
import { useNuxtApp, useRouter } from '#imports'
import UiButton from '~/components/ui/Button.vue'
import UiFormInput from '~/components/ui/FormInput.vue'
import UiImageUpload from '~/components/ui/ImageUpload.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import type { IStoryForm, IStoryItem } from '~/types/story'
import type { ICategory } from '~/types/category'
import { Icon } from '@iconify/vue'
import TiptapEditor from '~/components/ui/TiptapEditor.vue'

const props = defineProps<{
    initialValues?: IStoryItem | null
    storyId?: string | number
}>()

// 2. Variable Declarations
const { $api } = useNuxtApp()
const router = useRouter()

const categoryData: Ref<ICategory[] | null> = ref(null)
const selectedOptionCategory = ref() // ✅ default value
const isLoading = ref(false)
const errorMessage = ref<string>('')
const imageUploadError = ref<string>('')

const initialValues = ref({
    title: props.initialValues?.title || '',
    category_id: props.initialValues?.category.id || '',
    content: props.initialValues?.content || '',
    cover_image: props.initialValues?.cover_image || null
})

const allCategoryOptions = computed(() => {
    if (categoryData.value) {
        return categoryData.value.map((cat) => ({
            label: cat.name,
            value: cat.id
        }))
    }
    return [] // always return an array for safety
})

// ✅ Yup validation schema for register form
const profileFormSchema = yup.object({
    title: yup.string().required('Title is required'),
    category_id: yup.string().required('Category is required'),
    content: yup.string().required('Content is required'),
    cover_image: yup
        .mixed<File | string>()
        .nullable()
        .test('is-valid-cover', 'Invalid cover', (value) => {
            // allow: File, string, null
            return typeof value === 'string' || value instanceof File
        })
})

// 3. Methods/Functions
const handleSubmit = async (values: IStoryForm) => {
    errorMessage.value = ''
    try {
        isLoading.value = true
        let response
        if (props.storyId) {
            // ✅ UPDATE mode
            response = await $api.story.update({
                params: { storyId: props.storyId },
                body: values
            })

            console.log('data', values)
            console.log('✅ Success Update Story:', response)
        } else {
            // ✅ INSERT mode
            response = await $api.story.store({ body: values })
            console.log('✅ Success Insert Story:', response)
        }

        const cover = values.cover_image as string | File

        if (cover !== null && cover instanceof File) {
            const formData = new FormData()
            formData.append('cover_image', cover)

            const responseImageUpload = await $api.story.uploadCoverImage({
                body: formData,
                params: { storyId: response.data.id }
            })

            console.log('📤 Image uploaded:', responseImageUpload)
        } else {
            console.log('⚠️ No new image uploaded — keeping old image.')
        }
        router.push({ name: 'dashboard-story' })
    } catch (error: any) {
        if (props.storyId) {
            console.error('❌ Error Update Story:', error)
        } else {
            console.error('❌ Error Insert Story:', error)
        }
        // ✅ Handle different error types safely
        if (error?.data?.message) {
            errorMessage.value = error.data.message
        } else if (error?.message) {
            errorMessage.value = error.message
        } else {
            errorMessage.value =
                'An unexpected error occurred. Please try again.'
        }
    } finally {
        isLoading.value = false
    }
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
            name="category_id"
            label="Category"
            :options="allCategoryOptions"
            placeholder="Select a category"
            :searchable="false"
        />

        <TiptapEditor name="content" label="Story Content" />

        <UiImageUpload name="cover_image" label="Cover Image" />
        <div class="story-form__action">
            <UiButton
                type="link"
                href="/dashboard/story"
                variant="primary-outline"
            >
                Cancel
            </UiButton>
            <UiButton type="submit" variant="primary" :disabled="isLoading">
                <template v-if="isLoading">
                    <span>Post Story</span>
                    <Icon icon="lucide:loader-2" class="animate-custom-spin" />
                </template>
                <template v-else>
                    <span>Post Story</span>
                </template>
            </UiButton>
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
