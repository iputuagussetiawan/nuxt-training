<script setup lang="ts">
    import '~/assets/scss/components/sections/home/HomeLatestStory.scss';
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import SectionHeader from '~/components/section/SectionHeader.vue';
    import CardStory from '~/components/ui/CardStory.vue';

    interface Story {
        id: number;
        image: string;
        title: string;
        shortContent: string;
        authorAvatar: string;
        authorName: string;
        createdDate: string;
        category: string;
    }

    interface SectionLatestStoryProps {
        stories: Story[];
    }
    defineProps<SectionLatestStoryProps>()

    const offset = ref(0)

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
    <section class="latest-story">
        <SectionHeader
            title="Latest Stories"
            linkText="Explore More"
            linkTo="/explore"
        />
        <div class="latest-story__slider-container">
            <Swiper
                :slides-per-view="3.1"
                :space-between="29"
                :slides-offset-before="offset"
                :slides-offset-after="offset"
                class="latest-story__slider"
            >
                <SwiperSlide
                    v-for="story in stories"
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
            </Swiper>
        </div>
    </section> 
</template>
<style scoped lang="scss">
    
</style>

