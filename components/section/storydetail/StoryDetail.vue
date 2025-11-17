<script setup lang="ts">
// 1. Imports
import { onMounted, ref, type Ref } from 'vue'
import type { IStoryItem } from '~/types/story'
import { formatDate } from '~/utils/FormatDate'

// 2. Interface
interface Props {
    storiesData: IStoryItem
}

// ✅ define props
const props = defineProps<Props>()
const storiesData: Ref<IStoryItem | undefined> = ref()

onMounted(() => {
    storiesData.value = props.storiesData
})
</script>

<template>
    <section class="story-detail">
        <div class="container">
            <div class="story-detail__header">
                <p class="story-detail__date">
                    {{ formatDate(String(storiesData?.created_at)) }}
                </p>
                <h1 class="story-detail__title">
                    {{ storiesData?.title }}
                </h1>

                <div class="story-detail__author">
                    <div class="story-detail__author-image-container">
                        <img
                            :src="storiesData?.author.profile_image ?? ''"
                            :alt="storiesData?.author.name"
                            class="story-detail__author-image"
                        />
                    </div>
                    <p class="story-detail__author-name">
                        {{ storiesData?.author.name }}
                    </p>
                </div>
            </div>

            <div class="story-detail__body">
                <div class="story-detail__image-container">
                    <img
                        :src="storiesData?.content_image ?? ''"
                        :alt="storiesData?.title"
                        class="story-detail__image"
                    />
                </div>

                <div
                    class="story-detail__info-container"
                    v-html="storiesData?.content"
                ></div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.story-detail {
    padding: 60px 0px;
    position: relative;

    @media only screen and (max-width: 991.98px) {
        padding: 42px 0px;
    }
    @media only screen and (max-width: 767.98px) {
        padding: 32px 0px;
    }
    &__header {
        margin-bottom: 50px;
        text-align: center;
        @media only screen and (max-width: 991.98px) {
            margin-bottom: 42px;
        }
        @media only screen and (max-width: 767.98px) {
            margin-bottom: 32px;
        }
    }

    &__date {
        margin: 50px;
        font-weight: 400;
        font-size: 24px;
        line-height: 1.33;
        color: #4b4b4b;
        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 42px;
            font-size: 22px;
        }

        @media only screen and (max-width: 991.98px) {
            margin-bottom: 32px;
            font-size: 20px;
        }
        @media only screen and (max-width: 767.98px) {
            margin-bottom: 24px;
            font-size: 18px;
        }
    }

    &__title {
        margin-bottom: 50px;
        font-weight: 700;
        font-size: 60px;
        line-height: 1.233;
        color: #222;
        font-family: $font-secondary;

        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 42px;
            font-size: 52px;
        }

        @media only screen and (max-width: 991.98px) {
            margin-bottom: 42px;
            font-size: 48px;
        }
        @media only screen and (max-width: 767.98px) {
            margin-bottom: 32px;
            font-size: 42px;
        }
    }

    &__author {
        display: inline-flex;
        align-items: center;
        gap: 12px;
    }

    &__author-image-container {
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }

    &__author-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50px;
    }

    &__body {
        display: grid;
        grid-template-columns: 547px 1fr;
        gap: 60px;
        align-items: start;

        @media only screen and (max-width: 1399.98px) {
            grid-template-columns: 380px 1fr;
            gap: 40px;
        }
        @media only screen and (max-width: 1199.98px) {
            grid-template-columns: 1fr;
            gap: 30px;
        }
    }

    &__image-container {
        position: sticky;
        top: 100px;
        aspect-ratio: 547/600;
        max-width: 547px;

        @media only screen and (max-width: 1199.98px) {
            position: relative;
            max-width: unset;
            top: unset;
            aspect-ratio: 16/9;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__info-container {
        font-size: 18px;
        line-height: 1.5;
        color: #222222;
    }
}
</style>
