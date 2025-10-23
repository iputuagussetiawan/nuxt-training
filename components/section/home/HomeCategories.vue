<script setup lang="ts">
// 1. Imports
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import CardCategory from '~/components/ui/CardCategory.vue'
import type { ICategory } from '~/types/story'

// 2. Interface
interface SectionStoryCategories {
    categories: ICategory[]
    headerTitle: string
    headerLinkText: string
    headerLinkTo?: string
}

// 3. Props
const props = defineProps<SectionStoryCategories>()

// 4. States
const categoryList: Ref<ICategory[]> = ref([])
const targetRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)
let observer: IntersectionObserver | null = null

// 5. Lifecycle
onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                // Simulate delay for skeleton effect (optional)
                setTimeout(() => {
                    categoryList.value = props.categories
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
    <section class="story-categories" ref="targetRef">
        <!-- Section Header -->
        <SectionHeader
            :title="props.headerTitle"
            :linkText="props.headerLinkText"
            :linkTo="props.headerLinkTo"
        />

        <div class="container">
            <div class="story-categories__grid">
                <!-- Loading Skeleton -->
                <template v-if="isLoading">
                    <div v-for="n in 4" :key="n" class="skeleton-card" />
                </template>

                <!-- Actual Category Cards -->
                <template v-else>
                    <CardCategory
                        v-for="category in categoryList"
                        :key="category.id"
                        :title="category.name"
                    />
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.story-categories {
    position: relative;
    padding: 60px 0;

    @media (max-width: 991.98px) {
        padding: 42px 0;
    }

    @media (max-width: 767.98px) {
        padding: 32px 0;
    }

    &__grid {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        @media (max-width: 991.98px) {
            gap: 20px;
        }

        @media (max-width: 767.98px) {
            gap: 16px;
        }
    }
}

/* Skeleton Card */
.skeleton-card {
    width: 220px;
    height: 140px;
    border-radius: 12px;
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
