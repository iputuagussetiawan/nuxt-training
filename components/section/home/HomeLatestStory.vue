<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import SectionHeader from '~/components/section/SectionHeader.vue'
import CardStory from '~/components/ui/CardStory.vue'
import { ref, type Ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import type { IStoryItem } from '~/types/story'

interface SectionLatestStoryProps {
    headerTitle: string
    headerLinkText: string
    headerLinkTo: string
}

const props = defineProps<SectionLatestStoryProps>()
const latestStoryList: Ref<IStoryItem[]> = ref([])
const offset = ref(0)
const isLoading = ref(true) // skeleton state
const targetRef = ref<HTMLElement | null>(null) // for Intersection Observer

const getStories = async (): Promise<void> => {
    isLoading.value = true
    try {
        const response: { data: IStoryItem[] } = await $fetch(
            'https://timestory.tmdsite.my.id/api/story',
            {
                method: 'GET',
                params: {
                    limit: 10
                }
            }
        )
        latestStoryList.value = response.data
    } catch (error) {
        console.error('Failed to fetch latest stories:', error)
    } finally {
        isLoading.value = false
    }
}

let observer: IntersectionObserver | null = null
onMounted(() => {
    if (targetRef.value) {
        observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    getStories()
                    if (observer && targetRef.value) {
                        observer.unobserve(targetRef.value) // stop observing after first fetch
                    }
                }
            },
            { threshold: 0.2 }
        )
        observer.observe(targetRef.value)
    }
})

onUnmounted(() => {
    if (observer && targetRef.value) {
        observer.unobserve(targetRef.value)
    }
})

function calculateOffset() {
    const container = document.querySelector('.container')
    if (container) {
        const containerWidth = container.clientWidth
        const documentWidth = document.documentElement.clientWidth
        offset.value = (documentWidth - containerWidth) / 2
    }
}

onMounted(() => {
    calculateOffset()
    window.addEventListener('resize', calculateOffset)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', calculateOffset)
})
</script>

<template>
    <section class="latest-story" ref="targetRef">
        <SectionHeader
            :title="props.headerTitle"
            :linkText="props.headerLinkText"
            :linkTo="props.headerLinkTo"
        />
        <div class="latest-story__slider-container">
            <Swiper
                :slides-per-view="1.2"
                :space-between="16"
                :slides-offset-before="offset"
                :slides-offset-after="offset"
                class="latest-story__slider"
                :breakpoints="{
                    640: {
                        // tablet portrait
                        slidesPerView: 2.2,
                        spaceBetween: 16,
                        slidesOffsetBefore: 20,
                        slidesOffsetAfter: 20
                    },
                    1024: {
                        // tablet landscape / small desktop
                        slidesPerView: 2.5,
                        spaceBetween: 24,
                        slidesOffsetBefore: 30,
                        slidesOffsetAfter: 30
                    },
                    1440: {
                        // large desktop
                        slidesPerView: 3.1,
                        spaceBetween: 30,
                        slidesOffsetBefore: 40,
                        slidesOffsetAfter: 40
                    }
                }"
            >
                <!-- Show skeletons when loading -->
                <template v-if="isLoading">
                    <SwiperSlide v-for="n in 3" :key="n">
                        <CardStory loading />
                    </SwiperSlide>
                </template>

                <!-- Show real data -->
                <template v-else>
                    <SwiperSlide
                        v-for="story in latestStoryList"
                        :key="story.id"
                    >
                        <CardStory
                            :imageUrl="story.content_image"
                            :title="story.title"
                            :description="story.content"
                            :authorPhoto="
                                story.author.profile_image ??
                                'https://picsum.photos/50/50?random=' + story.id
                            "
                            :author="story.author.name"
                            :dateCreated="story.created_at"
                            :linkTo="`/story/${story.id}`"
                        />
                    </SwiperSlide>
                </template>
            </Swiper>
        </div>
    </section>
</template>

<style scoped lang="scss">
.latest-story {
    padding: 60px 0px;
    position: relative;
}
</style>
