<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import SectionHeader from '~/components/section/SectionHeader.vue'
    import CardStory from '~/components/ui/CardStory.vue'
    import { ref, onMounted, onBeforeUnmount } from 'vue'

    interface Story {
        id: number
        image: string
        title: string
        shortContent: string
        authorAvatar: string
        authorName: string
        createdDate: string
        category: string
    }

    interface SectionLatestStoryProps {
        stories: Story[]
        headerTitle: string
        headerLinkText: string
        headerLinkTo: string
    }

    const props = defineProps<SectionLatestStoryProps>()

    const offset = ref(0)
    const loading = ref(true) // <-- NEW loading state
    const storiesData = ref<Story[]>([]) // we use this instead of props.stories

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

        // simulate API fetch
        setTimeout(() => {
            storiesData.value = props.stories // load real stories
            loading.value = false
        }, 2000)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', calculateOffset)
    })
</script>

<template>
    <section class="latest-story">
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
                640: { // tablet portrait
                    slidesPerView: 2.2,
                    spaceBetween: 16,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,
                },
                1024: { // tablet landscape / small desktop
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    slidesOffsetBefore: 30,
                    slidesOffsetAfter: 30,
                },
                1440: { // large desktop
                    slidesPerView: 3.1,
                    spaceBetween: 30,
                    slidesOffsetBefore: 40,
                    slidesOffsetAfter: 40,
                }
            }"
            >
                <!-- Show skeletons when loading -->
                <template v-if="loading">
                    <SwiperSlide v-for="n in 3" :key="n">
                        <CardStory loading />
                    </SwiperSlide>
                </template>

                <!-- Show real data -->
                <template v-else>
                    <SwiperSlide
                        v-for="story in storiesData"
                        :key="story.id"
                    >
                        <CardStory
                            :imageUrl="story.image"
                            :title="story.title"
                            :description="story.shortContent"
                            :authorPhoto="story.authorAvatar"
                            :author="story.authorName"
                            :dateCreated="story.createdDate"
                            :category="story.category"
                            :linkTo="`/stories/${story.id}`"
                        />
                    </SwiperSlide>
                </template>
            </Swiper>
        </div>
    </section>
</template>


<style scoped lang="scss">
    .latest-story{
        padding: 60px 0px;
        position: relative;
    }
</style>
