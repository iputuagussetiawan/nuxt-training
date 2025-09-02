
<script setup lang="ts">
    import { stories as storiesData } from '~/data/stories';
    import { categories as categoriesData } from '~/data/categories';
    import HomeWelcome from '~/components/section/home/HomeWelcome.vue';
    import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue';
    import HomeCategories from '~/components/section/home/HomeCategories.vue';
    import CategoryStory from '~/components/section/home/CategoryStory.vue';
</script>

<template>
    <div>
        <HomeWelcome />
        <!-- <HomeLatestStory 
            :stories="storiesData" 
            headerTitle="Latest Story" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
        /> -->
        <CategoryStory 
            categoryId="1"
            headerTitle="Comedy" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
        />
        <CategoryStory 
            categoryId="2"
            headerTitle="Comedy" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
        />
        <!-- <HomeCategories 
            :categories=filteredCategories 
            headerTitle="More Categories" 
            headerLinkText="Explore More" 
        /> -->
    </div>
</template>
