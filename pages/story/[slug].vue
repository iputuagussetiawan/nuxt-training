<script setup lang="ts">
    import Breadcrumb from "~/components/ui/Breadcrumb.vue";
    import SimilarStory from "~/components/section/storydetail/SimilarStory.vue";
    import StoryDetail from "~/components/section/storydetail/StoryDetail.vue";

    interface BreadcrumbItem {
        label: string;
        href?: string;
    }

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Guardians of the Galaxy Vol. 3 " }, // last item has no href
    ];
</script>

<template>
    <Breadcrumb :items="breadcrumbItems" />
    <StoryDetail />
    <SimilarStory 
        headerTitle="Similar Story" 
    />
</template>

<style scoped lang="scss">
    
</style>
