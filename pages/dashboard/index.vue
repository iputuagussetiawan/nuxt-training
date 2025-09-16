<script setup>
    import AuthorInfo from '~/components/section/mystory/AuthorInfo.vue';

    // definePageMeta({
    //     layout: 'simple',
    // })
    useSeoMeta({
        title: 'My Story | Personal Blog & Inspiration',
        description: 'Discover inspiring stories, insights, and experiences that shape my journey. Learn, connect, and get inspired by My Story.',
        // Open Graph
        ogTitle: 'My Story | Personal Blog & Inspiration',
        ogDescription: 'Discover inspiring stories, insights, and experiences that shape my journey. Learn, connect, and get inspired by My Story.',
        ogImage: 'https://example.com/image.png',
        ogUrl: 'https://example.com/my-story',
        ogType: 'website',
        // Twitter
        twitterCard: 'summary_large_image',
        twitterTitle: 'My Story | Personal Blog & Inspiration',
        twitterDescription: 'Discover inspiring stories, insights, and experiences that shape my journey. Learn, connect, and get inspired by My Story.',
    })
</script>

<template>
    <div>
        <AuthorInfo/>
    </div>
</template>
