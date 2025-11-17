<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import { computed, ref, type Ref } from 'vue'
import type { IStoryItem } from '~/types/story'
import CardStory from '~/components/ui/CardStory.vue'
import Pagination from '~/components/ui/Pagination.vue'
import MyStoriesBlank from './MyStoriesBlank.vue'
import { useNuxtApp } from '#imports'
import UiDialogConfirmation from '~/components/ui/DialogConfirmation.vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '~/stores/toast'

const toast = useToastStore()
const myStoryList: Ref<IStoryItem[]> = ref([])
const storyId: Ref<string> = ref('')
const myStoriesMeta = ref({ last_page: 0 })
const loading = ref(true) // skeleton state
const currentPage = ref(1)
const isLoadingDelete = ref(false)
const isOpenDialogDelete = ref(false)
const router = useRouter()

const isLoadingEdit = ref(false)
const isOpenDialogEdit = ref(false)
const { $api } = useNuxtApp()

const getMyStories = async (): Promise<void> => {
    try {
        loading.value = true
        const response = await $api.userStory.list({
            query: {
                limit: 1000,
                page: currentPage.value
            }
        })
        myStoryList.value = response.data
        myStoriesMeta.value = response.meta
        console.log(myStoryList.value)
    } catch (error) {
        console.error('Failed to fetch all stories:', error)
    } finally {
        loading.value = false
    }
}

getMyStories()

const onEditStory = (id?: string | number) => {
    console.log('Edit story with id:', id)
    isOpenDialogEdit.value = true
    storyId.value = id as string
    // navigate or open modal, etc.
}

const onDeleteStory = async (id?: string | number) => {
    console.log(id)
    storyId.value = id as string
    isOpenDialogDelete.value = true
}

const handleConfirmDelete = async () => {
    try {
        //TO-DO: Call the API to delete the story
        let currentStoryId = storyId.value
        isLoadingDelete.value = true

        const response = await $api.story.delete({
            params: {
                storyId: currentStoryId
            }
        })
        await getMyStories()
        toast.success('delete story successfully!')
    } catch (error: any) {
        console.error('Error Delete Story:', error)
        toast.error('delete story error!:' + error.message)
    } finally {
        isLoadingDelete.value = false
        isOpenDialogDelete.value = false
    }
}

const handleConfirmEdit = () => {
    try {
        let currentStoryId = storyId.value
        router.push({
            name: 'dashboard-story-id-edit',
            params: { id: currentStoryId }
        })
        isLoadingEdit.value = true
    } catch (error) {
        console.error('Error Delete Story:', error)
    } finally {
        isLoadingEdit.value = false
        isOpenDialogDelete.value = false
    }
}
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
                            <p>Current Story Id: {{ storyId }}</p>
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
                    <div class="my-story__listing" v-if="loading">
                        <CardStory v-for="n in 6" :key="n" loading />
                    </div>
                    <div
                        class="my-story__listing"
                        v-else-if="myStoryList.length > 0"
                    >
                        <CardStory
                            v-for="story in myStoryList"
                            :key="story.id"
                            :id="story.id"
                            :imageUrl="story.cover_image"
                            :title="story.title"
                            :description="story.content"
                            :dateCreated="story.created_at"
                            :linkTo="`/story/${story.id}`"
                            :for-author="true"
                            @edit="onEditStory"
                            @delete="onDeleteStory"
                        />
                        <div class="my-story__pagination-wrapper">
                            <Pagination
                                v-model:current-page="currentPage"
                                :total-pages="myStoriesMeta.last_page"
                            />
                        </div>
                    </div>

                    <div class="my-story__blank" v-else>
                        <MyStoriesBlank />
                    </div>
                </div>
            </div>
        </div>
        <UiDialogConfirmation
            v-model="isOpenDialogDelete"
            title="Delete Story"
            message="Are you sure want delete this story?"
            buttonText="Delete Story"
            :isLoading="isLoadingDelete"
            @confirm="handleConfirmDelete"
        />
        <UiDialogConfirmation
            v-model="isOpenDialogEdit"
            title="Edit Story"
            message="Are you sure want edit this story?"
            buttonText="Edit Story"
            :isLoading="isLoadingEdit"
            @confirm="handleConfirmEdit"
        />
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
