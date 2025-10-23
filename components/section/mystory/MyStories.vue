<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import { ref, type Ref } from 'vue'
import type { IStoryItem } from '~/types/story'
import CardStory from '~/components/ui/CardStory.vue'
import Pagination from '~/components/ui/Pagination.vue'
import MyStoriesBlank from './MyStoriesBlank.vue'
const myStoryList: Ref<IStoryItem[]> = ref([])
const isLoading = ref(true) // skeleton state

const getMyStories = async (): Promise<void> => {
    isLoading.value = true
    try {
        const response: { data: IStoryItem[] } = await $fetch(
            'https://timestory.tmdsite.my.id/api/story',
            {
                method: 'GET',
                params: {
                    limit: 10
                }
            }
        )
        myStoryList.value = response.data
    } catch (error) {
        console.error('Failed to fetch your stories:', error)
    } finally {
        isLoading.value = false
    }
}

getMyStories()
</script>
<template>
    <section class="my-story">
        <div class="container">
            <div class="my-story__header">
                <h2 class="my-story__title">My Story</h2>
            </div>
            <div class="my-story__inner">
                <div class="my-story__action-wrapper">
                    <div class="my-story__action-card">
                        <div class="my-story__action-info">
                            <h3 class="my-story__action-title">
                                Write your story
                            </h3>
                            <div class="my-story__action-description">
                                Share your unique voice with the world – start
                                writing your story today!
                            </div>
                        </div>
                        <div class="my-story__action">
                            <Button
                                type="link"
                                href="/dashboard/story/create"
                                variant="primary"
                                >Write Story</Button
                            >
                        </div>
                    </div>
                </div>
                <div class="my-story__listing-wrapper">
                    <div class="my-story__listing" v-if="isLoading">
                        <CardStory v-for="n in 6" :key="n" loading />
                    </div>
                    <div
                        class="my-story__listing"
                        v-else-if="myStoryList.length > 0"
                    >
                        <CardStory
                            v-for="story in myStoryList"
                            :key="story.id"
                            :imageUrl="story.content_image"
                            :title="story.title"
                            :description="story.content"
                            :authorPhoto="
                                story.author.profile_image ??
                                'https://picsum.photos/50/50?random=' + story.id
                            "
                            :author="story.author.name"
                            :dateCreated="story.created_at"
                            :linkTo="`/story/${story.id}`"
                        />
                        <div class="my-story__pagination-wrapper">
                            <Pagination />
                        </div>
                    </div>

                    <div class="my-story__blank" v-else>
                        <MyStoriesBlank />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.my-story {
    position: relative;
    padding: 67px 0px 200px 0px;

    @media only screen and (max-width: 1399.98px) {
        padding: 42px 0px 80px 0px;
    }

    &__header {
        margin-bottom: 99px;
        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 64px;
        }
        @media only screen and (max-width: 991.98px) {
            margin-bottom: 42px;
        }
        @media only screen and (max-width: 991.98px) {
            margin-bottom: 32px;
        }
    }

    &__title {
        font-size: 36px;
        font-weight: 700;
        line-height: 1.333;
        color: #222222;

        @media only screen and (max-width: 1399.98px) {
            font-size: 28px;
        }
    }

    &__inner {
        display: grid;
        grid-template-columns: 546px auto;
        gap: 31px;

        @media only screen and (max-width: 1399.98px) {
            grid-template-columns: 1fr 2fr;
            gap: 24px;
        }

        @media only screen and (max-width: 1199.98px) {
            grid-template-columns: 1fr;
        }
    }

    &__action-card {
        position: sticky;
        top: 100px;
        padding: 80px 70px;
        border: 1px solid #cccccc;
        border-radius: 8px;
        text-align: center;
        @media only screen and (max-width: 1399.98px) {
            padding: 40px 20px;
        }

        @media only screen and (max-width: 991.98px) {
            padding: 24px 20px;
            text-align: left;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 20px;
            align-items: center;
        }

        @media only screen and (max-width: 767.98px) {
            grid-template-columns: 1fr;
            text-align: center;
        }
    }

    &__action-title {
        margin: 0px 0px 20px 0px;
        font-weight: 700;
        font-size: 36px;
        line-height: 1.357;
        color: #222222;

        @media only screen and (max-width: 1399.98px) {
            margin: 0px 0px 16px 0px;
            font-size: 28px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 24px;
        }
    }

    &__action-description {
        margin-bottom: 30px;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
        color: #4b4b4b;

        p {
            &:last-child {
                margin-bottom: 0px;
            }
        }

        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 20px;
            font-size: 16px;
        }

        @media only screen and (max-width: 991.98px) {
            margin-bottom: 0px;
        }

        @media only screen and (max-width: 767.98px) {
            font-size: 16px;
        }
    }

    &__action {
        .btn {
            width: 100%;
            text-align: center;
        }
    }

    &__listing {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 60px 29px;
        align-items: start;

        @media only screen and (max-width: 1399.98px) {
            gap: 42px 20px;
        }

        @media only screen and (max-width: 380.98px) {
            grid-template-columns: 1fr;
        }
    }

    &__pagination-wrapper {
        grid-column: 1/-1;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        text-align: center;
    }

    &__blank {
        grid-column: 1/-1;
    }
}
</style>
