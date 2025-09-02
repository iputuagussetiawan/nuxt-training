<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { stories as storiesData } from '~/data/stories';
    let slug=useRoute().params.slug
    const StoryDetails = computed(() =>
        storiesData.find((story) => story.slug === slug)
    )
</script>

<template>
    <section class="story-detail">
        <div class="container">
            <div class="story-detail__header">
                
            </div>
        </div>
        <h2>Story Detail: {{ StoryDetails?.title }}</h2>
    </section>
</template>


<style scoped lang="scss">
    
</style>
