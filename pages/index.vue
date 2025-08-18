
<script setup lang="ts">
    import HomeWelcome from '~/components/section/home/HomeWelcome.vue';
    import HomeStoryGrid from '~/components/section/home/HomeStoryGrid.vue';
    import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue';
    import { stories as storiesData } from '~/data/stories';
    import { computed } from 'vue'
    // filter only comedy category
    const comedyStories = computed(() =>
        storiesData.filter(story => story.category.toLowerCase() === 'comedy')
    )
    // filter only Romance category
    const romanceStories = computed(() =>
        storiesData.filter(story => story.category.toLowerCase() === 'romance')
    )
</script>

<template>
    <div>
        <HomeWelcome />
        <HomeLatestStory :stories="storiesData" />
        <HomeStoryGrid 
            :stories="comedyStories" 
            headerTitle="Comedy" 
            headerLinkText="Explore More" 
            headerLinkTo="/about" 
        />
        <HomeStoryGrid 
            :stories="romanceStories" 
            headerTitle="Romance" 
            headerLinkText="Explore More" 
            headerLinkTo="/about" 
        />
    </div>
</template>
