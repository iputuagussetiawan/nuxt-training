<script setup lang="ts">
// 1. Imports
import { ref, type Ref, onMounted, onUnmounted } from 'vue'
import SectionHeader from '~/components/section/SectionHeader.vue'
import CardStory from '~/components/ui/CardStory.vue'
import type { IStoryItem } from '~/types/story'

// 2. Interface
interface CategoryStory {
    headerTitle: string
    headerLinkText: string
    headerLinkTo: string
    variant?: 'column' | 'grid'
    categoryStories: IStoryItem[]
}
// 3. Props
const props = defineProps<CategoryStory>()

// 4. States and Variable Declarations
const categoryStoryList: Ref<IStoryItem[]> = ref([])
const isLoading = ref(true) // skeleton state
const targetRef = ref<HTMLElement | null>(null) // for Intersection Observer

let observer: IntersectionObserver | null = null

// 5. Methods

// 6. Lifecycle
onMounted(() => {
    if (!targetRef.value) return
    observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                // Simulate delay for skeleton effect (optional)
                setTimeout(() => {
                    categoryStoryList.value = props.categoryStories
                    isLoading.value = false
                }, 800)

                if (observer && targetRef.value) {
                    observer.unobserve(targetRef.value)
                    observer.disconnect()
                    observer = null
                }
            }
        },
        { threshold: 0.2 }
    )
    observer.observe(targetRef.value)
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
})
</script>

<template>
    <section class="category-story" ref="targetRef">
        <SectionHeader
            :title="props.headerTitle"
            :linkText="props.headerLinkText"
            :linkTo="props.headerLinkTo"
        />
        <div class="container">
            <div
                class="category-story__column"
                v-if="props.variant === 'column'"
            >
                <!-- Skeletons -->
                <template v-if="isLoading">
                    <div
                        class="category-story__column-item"
                        v-for="n in 3"
                        :key="n"
                    >
                        <CardStory loading />
                    </div>
                </template>

                <!-- Real data -->
                <template v-else>
                    <div
                        class="category-story__column-item"
                        v-for="(story, index) in categoryStoryList"
                        :key="story.id"
                    >
                        <CardStory
                            :imageUrl="story.cover_image"
                            :title="story.title"
                            :description="story.content"
                            :authorPhoto="
                                story.author.profile_image ??
                                'https://picsum.photos/50/50?random=' + story.id
                            "
                            :author="story.author.name"
                            :dateCreated="story.created_at"
                            :linkTo="`/story/${story.id}`"
                            :variant="index === 0 ? 'big' : 'default'"
                        />
                    </div>
                </template>
            </div>

            <div class="category-story__grid" v-else>
                <!-- Skeletons -->
                <template v-if="isLoading">
                    <div class="category-story__item" v-for="n in 3" :key="n">
                        <CardStory loading />
                    </div>
                </template>

                <!-- Real data -->
                <template v-else>
                    <div
                        class="category-story__item"
                        v-for="(story, index) in categoryStoryList"
                        :key="story.id"
                    >
                        <CardStory
                            :imageUrl="story.cover_image"
                            :title="story.title"
                            :description="story.content"
                            :authorPhoto="
                                story.author.profile_image ??
                                'https://picsum.photos/50/50?random=' + story.id
                            "
                            :author="story.author.name"
                            :dateCreated="story.created_at"
                            :linkTo="`/story/${story.id}`"
                            :variant="index === 0 ? 'big' : 'default'"
                        />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.category-story {
    padding: 60px 0px;
    position: relative;

    @media only screen and (max-width: 991.98px) {
        padding: 42px 0px;
    }
    @media only screen and (max-width: 767.98px) {
        padding: 32px 0px;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto auto;
        gap: 46px 30px;
        align-items: start;

        @media only screen and (max-width: 991.98px) {
            gap: 32px;
        }
    }

    &__item {
        &:nth-child(1) {
            grid-column: 1 / 9;
            grid-row: 1/-1;

            @media only screen and (max-width: 1199.98px) {
                grid-column: 1/-1;
                grid-row: 1;
            }
        }
        &:nth-child(2) {
            grid-column: 9 / -1;
            grid-row: 1;
            @media only screen and (max-width: 1199.98px) {
                grid-column: 1/-1;
                grid-row: 2;
            }
        }
        &:nth-child(3) {
            grid-column: 9 / -1;
            grid-row: 2;
            @media only screen and (max-width: 1199.98px) {
                grid-column: 1/-1;
                grid-row: 3;
            }
        }
    }
    &__column {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        @media only screen and (max-width: 991.98px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px 20px;
        }
        @media only screen and (max-width: 767.98px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>
