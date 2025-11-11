<script setup lang="ts">
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
import SimilarStory from '~/components/section/storydetail/SimilarStory.vue'
import StoryDetail from '~/components/section/storydetail/StoryDetail.vue'
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNuxtApp } from '#imports'
import type { IStoryItem } from '~/types/story'

const route = useRoute()
const storyId = computed(() => route.params.id as string)

// 3. Variable Declarations
const { $api } = useNuxtApp()
const loading = ref(true)
const storiesData: Ref<IStoryItem | undefined> = ref()
const storyTitle = ref('')

interface BreadcrumbItem {
    label: string
    href?: string
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    { label: 'Home', href: '/' },
    { label: storyTitle.value || 'Loading...' } // last item updates automatically
])

// 4. Methods
const getDetailStory = async () => {
    try {
        loading.value = true
        const response = await $api.story.detail({
            params: {
                storyId: storyId.value
            }
        })
        storiesData.value = response.data
        storyTitle.value = response.data.title
    } catch (error) {
        console.error('Failed to fetch detail story:', error)
    } finally {
        loading.value = false
    }
}

// 5. Events
onMounted(() => {
    getDetailStory()
})
</script>

<template>
    <Breadcrumb :items="breadcrumbItems" />
    <StoryDetail v-if="storiesData" :storiesData="storiesData" />
    <SimilarStory headerTitle="Similar Story" />
</template>

<style scoped lang="scss"></style>
