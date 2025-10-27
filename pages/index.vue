<script setup lang="ts">
import HomeWelcome from '~/components/section/home/HomeWelcome.vue'
import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue'
import HomeCategories from '~/components/section/home/HomeCategories.vue'
import CategoryStory from '~/components/section/home/CategoryStory.vue'
import { onMounted, ref, useNuxtApp, useSeoMeta } from '#imports'
import type { ICategory } from '~/types/category'

useSeoMeta({
    title: 'Story Time',
    ogTitle: 'Welcome to Story Time',
    description:
        'Discover inspiring stories, explore creative ideas, and enjoy a world of imagination with Story Time.',
    ogDescription:
        'Welcome to Story Time — your home for heartwarming tales, creative inspiration, and captivating adventures.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image'
})

const { $api } = useNuxtApp()
const categoryData = ref<ICategory | null>(null)

const getAllCategories = async () => {
    try {
        const response = await $api.category.list({
            query: {
                sort: 'asc',
                limit: 10
            }
        })
        categoryData.value = response.data
    } catch (error) {
        console.error('Failed to fetch products:', error)
    }
}

onMounted(() => {
    getAllCategories()
})
</script>

<template>
    <div>
        <HomeWelcome />
        <HomeLatestStory
            headerTitle="Latest Story"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
        />''
        <CategoryStory
            categoryId="1"
            headerTitle="Comedy"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
        />
        <CategoryStory
            categoryId="2"
            headerTitle="Romance"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
            variant="column"
        />
        <CategoryStory
            categoryId="3"
            headerTitle="Horror"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
        />
        <HomeCategories
            v-if="Array.isArray(categoryData)"
            :categories="categoryData"
            headerTitle="More Categories"
            headerLinkText="Explore More"
        />
    </div>
</template>
