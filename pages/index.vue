<script setup lang="ts">
// 1. Imports
import HomeWelcome from '~/components/section/home/HomeWelcome.vue'
import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue'
import HomeCategories from '~/components/section/home/HomeCategories.vue'
import CategoryStory from '~/components/section/home/CategoryStory.vue'
import { onMounted, ref, useNuxtApp, useSeoMeta, type Ref } from '#imports'
import type { ICategory } from '~/types/category'
import type { IStoryItem } from '~/types/story'

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

// 2. Interface
// 3. Props
// 4. States and Variable Declarations
const { $api } = useNuxtApp()
const latestStoriesData: Ref<IStoryItem[] | null> = ref(null)
const categoryData: Ref<ICategory[] | null> = ref(null)
const comedyStoriesData: Ref<IStoryItem[] | null> = ref(null)
const romanceStoriesData: Ref<IStoryItem[] | null> = ref(null)
const horrorStoriesData: Ref<IStoryItem[] | null> = ref(null)

// 5. Methods
const getLatestStory = async () => {
    try {
        const response = await $api.story.list({
            query: {
                sort_by: 'popular',
                limit: 10
            }
        })
        latestStoriesData.value = response.data
    } catch (error) {
        console.error('Failed to fetch latest stories:', error)
    }
}

const getCategoryStories = async (categoryId: number, limit: number = 6) => {
    try {
        const response = await $api.story.list({
            query: {
                limit: limit,
                category_id: categoryId
            }
        })
        return response.data
    } catch (error) {
        console.error('Failed to fetch latest stories:', error)
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
    } catch (error) {
        console.error('Failed to fetch products:', error)
    }
}

// 6. Lifecycle
onMounted(async () => {
    await getLatestStory()
    await getAllCategories()
    comedyStoriesData.value = await getCategoryStories(1, 3)
    romanceStoriesData.value = await getCategoryStories(2, 3)
    horrorStoriesData.value = await getCategoryStories(3, 3)
})
</script>

<template>
    <div>
        <HomeWelcome />
        <HomeLatestStory
            v-if="latestStoriesData"
            headerTitle="Latest Story"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
            :lastStories="latestStoriesData"
        />
        <CategoryStory
            v-if="comedyStoriesData"
            headerTitle="Comedy"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
            :categoryStories="comedyStoriesData"
        />
        <CategoryStory
            v-if="romanceStoriesData"
            headerTitle="Romance"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
            variant="column"
            :categoryStories="romanceStoriesData"
        />
        <CategoryStory
            v-if="horrorStoriesData"
            headerTitle="Horror"
            headerLinkText="Explore More"
            headerLinkTo="/stories"
            :categoryStories="horrorStoriesData"
        />
        <HomeCategories
            v-if="categoryData"
            :categories="categoryData"
            headerTitle="More Categories"
            headerLinkText="Explore More"
        />
    </div>
</template>
