
<script setup lang="ts">
    import { computed } from 'vue'
    import { stories as storiesData } from '~/data/stories';
    import { categories as categoriesData } from '~/data/categories';
    import HomeWelcome from '~/components/section/home/HomeWelcome.vue';
    import HomeStoryGrid from '~/components/section/home/HomeStoryGrid.vue';
    import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue';
    import HomeCategories from '~/components/section/home/HomeCategories.vue';
    // filter only comedy category
    const comedyStories = computed(() =>
        storiesData.filter(story => story.category.toLowerCase() === 'comedy')
    )
    // filter only Romance category
    const romanceStories = computed(() =>
        storiesData.filter(story => story.category.toLowerCase() === 'romance')
    )

    // filter only Romance category
    const horrorStories = computed(() =>
        storiesData.filter(story => story.category.toLowerCase() === 'horror')
    )

    const filteredCategories = categoriesData.filter(
        (cat) => !["Comedy", "Horror","Romance"].includes(cat.title)
    )
</script>

<template>
    <div>
        <HomeWelcome />
        <HomeLatestStory 
            :stories="storiesData" 
            headerTitle="Latest Story" 
            headerLinkText="Explore More" 
            headerLinkTo="/about" 
        />
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
        <HomeStoryGrid 
            :stories="horrorStories" 
            headerTitle="Horror" 
            headerLinkText="Explore More" 
            headerLinkTo="/about" 
        />
        <HomeCategories 
            :categories=filteredCategories 
            headerTitle="More Categories" 
            headerLinkText="Explore More" 
        />
    </div>
</template>
