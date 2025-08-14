<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import SectionHeader from '~/components/section/SectionHeader.vue';
    import CardStory from '~/components/ui/CardStory.vue';
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
                :space-between="20"
                loop
            >
                class="latest-story__slider"
                <SwiperSlide v-for="n in 5" :key="n">
                    <CardStory
                        imageUrl="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80"
                        title="The Power of Positive Thinking"
                        description="The world's most-loved social storytelling platform. Story time connects a global community of 90 million readers and writers through the power of story."
                        authorPhoto="https://randomuser.me/api/portraits/men/32.jpg"
                        author="John Doe"
                        dateCreated="17 July 2023"
                        category="Story"
                        linkTo="/explore"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    </section> 
</template>
<style scoped lang="scss">
    
</style>

