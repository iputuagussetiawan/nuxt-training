
<script setup lang="ts">
    import HomeWelcome from '~/components/section/home/HomeWelcome.vue';
    import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue';
    import HomeCategories from '~/components/section/home/HomeCategories.vue';
    import CategoryStory from '~/components/section/home/CategoryStory.vue';
    import {  ref, type Ref } from 'vue';
    import type { ICategory } from '~/types/story';
    const categoryList: Ref<ICategory[]> = ref([]);
    const isLoading = ref(true);
    const getCategories = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const response: { data: ICategory[] } = await $fetch(
                "https://timestory.tmdsite.my.id/api/category",
                {
                    method: "GET",
                }
            );
            categoryList.value = response.data;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            isLoading.value = false;
        }
    };
    getCategories();
</script>

<template>
    <div>
        <HomeWelcome />
        <HomeLatestStory 
            headerTitle="Latest Story" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
        />''
        <CategoryStory 
            categoryId="1"
            headerTitle="Comedy" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
        />
        <CategoryStory 
            categoryId="2"
            headerTitle="Romance" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
            variant="column"
        />
        <CategoryStory 
            categoryId="3"
            headerTitle="Horror" 
            headerLinkText="Explore More" 
            headerLinkTo="/stories" 
        />
        <HomeCategories 
            :categories=categoryList 
            headerTitle="More Categories" 
            headerLinkText="Explore More" 
        />
    </div>
</template>
