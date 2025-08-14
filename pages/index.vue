
<script setup lang="ts">
    import HomeWelcome from '~/components/section/home/HomeWelcome.vue';
    import HomeLatestStory from '~/components/section/home/HomeLatestStory.vue';
    import { stories as storiesData } from '~/data/stories';
</script>

<template>
    <div>
        <HomeWelcome />
        <HomeLatestStory :stories="storiesData" />
    </div>
</template>
