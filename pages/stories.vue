<script setup lang="ts">
// 1. Imports
import '~/assets/scss/components/ui/Input.scss'
import '~/assets/scss/components/ui/Label.scss'
import 'vue-select/dist/vue-select.css' // ✅ must import the CSS

import Breadcrumb from '~/components/ui/Breadcrumb.vue'
import vSelect from 'vue-select'
import CardStory from '~/components/ui/CardStory.vue'
import Pagination from '~/components/ui/Pagination.vue'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { useNuxtApp, useSeoMeta } from '#imports'
import type { ICategory } from '~/types/category'
import type { IStoryItem } from '~/types/story'
import { useRouter, useRoute } from 'vue-router'

import { watchDebounced } from '@vueuse/core'

useSeoMeta({
    title: 'Story Listing | Story Time',
    ogTitle: 'Explore Stories on Story Time',
    description:
        'Browse our collection of inspiring, heartwarming, and imaginative stories. Discover new tales and explore the world of Story Time.',
    ogDescription:
        'Find your next favorite story on Story Time — from inspiring adventures to creative short stories that spark your imagination.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image'
})

const router = useRouter()
const route = useRoute()

// 2. Interface
interface BreadcrumbItem {
    label: string
    href?: string
}

// 3. Variable Declarations
const { $api } = useNuxtApp()
const categoryData: Ref<ICategory[] | null> = ref(null)
const selectedOption = ref('newest') // ✅ default value
const selectedOptionCategory = ref('3') // ✅ default value
const loading = ref(true)
const storiesData: Ref<IStoryItem[]> = ref([])
const storiesMeta = ref({ last_page: 0 })
const searchStory = ref('')
const currentPage = ref(1)

const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'All Story' } // last item has no href
]

const allCategoryOptions = computed(() => {
    if (!categoryData.value) return []

    return [
        { label: 'Select Category', value: '' }, // 👈 DEFAULT LABEL
        ...categoryData.value.map((cat: ICategory) => ({
            label: cat.name,
            value: cat.id
        }))
    ]
})

const SortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Popular', value: 'popular' },
    { label: 'A - Z', value: 'a-z' },
    { label: 'Z - A', value: 'z-a' }
]

// 4. Methods
const getAllCategories = async () => {
    try {
        const response = await $api.category.list({
            query: {
                sort: 'asc'
            }
        })
        categoryData.value = response.data
        selectedOptionCategory.value = response.data.find(
            (item: ICategory) => item.name.toLowerCase() === 'select category'
        )?.id
    } catch (error) {
        console.error('Failed to fetch all categories:', error)
    }
}

function syncFromUrl() {
    selectedOption.value = (route.query.sort as string) || 'newest'
    selectedOptionCategory.value = (route.query.category as string) || '1'
    searchStory.value = (route.query.search as string) || ''
    currentPage.value = Number(route.query.page) || 1
}

function updateUrl() {
    router.replace({
        query: {
            search: searchStory.value || undefined,
            sort: selectedOption.value || undefined,
            category: selectedOptionCategory.value || undefined,
            page: currentPage.value || 1
        }
    })
}
const getAllStory = async () => {
    try {
        loading.value = true
        const response = await $api.story.list({
            query: {
                sort_by: selectedOption.value,
                category_id: selectedOptionCategory.value,
                search: searchStory.value,
                limit: 6,
                page: currentPage.value
            }
        })
        storiesData.value = response.data
        storiesMeta.value = response.meta
    } catch (error) {
        console.error('Failed to fetch all stories:', error)
    } finally {
        loading.value = false
    }
}

// 5. Events
onMounted(() => {
    syncFromUrl()
    getAllCategories().then(() => {
        getAllStory()
    })
})

watch(selectedOption, () => {
    currentPage.value = 1
    updateUrl()
    getAllStory()
})

watch(selectedOptionCategory, () => {
    currentPage.value = 1
    updateUrl()
    getAllStory()
})

watchDebounced(
    searchStory,
    () => {
        currentPage.value = 1
        updateUrl()
        getAllStory()
    },
    { debounce: 1000 }
)

watch(currentPage, () => {
    updateUrl()
    getAllStory()
})
</script>

<template>
    <div>
        <section class="stories">
            <div class="container">
                <h1 class="stories__title">
                    All Story : {{ selectedOptionCategory }}
                </h1>
            </div>
            <Breadcrumb :items="breadcrumbItems" />
            <div class="container">
                <div class="stories__action">
                    <div class="stories__filter">
                        <div class="stories__filter-item">
                            <div class="stories__filter-label">
                                <label class="form-label" for="sort-by"
                                    >Sort by</label
                                >
                            </div>
                            <div class="stories__filter-select">
                                <client-only>
                                    <v-select
                                        v-model="selectedOption"
                                        :options="SortOptions"
                                        :searchable="false"
                                        :reduce="
                                            (
                                                option: (typeof SortOptions)[number]
                                            ) => option.value
                                        "
                                        name="sort-by"
                                        id="sort-by"
                                        @update:modelValue="getAllStory"
                                    />
                                </client-only>
                            </div>
                        </div>
                        <div class="stories__filter-item">
                            <div class="stories__filter-label">
                                <label class="form-label" for="category"
                                    >Category</label
                                >
                            </div>
                            <div class="stories__filter-select">
                                <client-only>
                                    <v-select
                                        v-model="selectedOptionCategory"
                                        :options="allCategoryOptions"
                                        :reduce="
                                            (
                                                option: (typeof allCategoryOptions)[number]
                                            ) => option.value
                                        "
                                        :searchable="false"
                                        name="category"
                                        id="category"
                                        @update:modelValue="getAllStory"
                                    />
                                </client-only>
                            </div>
                        </div>
                    </div>
                    <div class="stories__search">
                        <div class="form-control-search">
                            <input
                                v-model="searchStory"
                                class="form-control"
                                type="search"
                                placeholder="Search story"
                                name="search-story"
                                id="search-story"
                            />
                            <svg
                                class="form-control-search__icon"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.25 21.25L26.25 26.25M3.75 13.75C3.75 16.4022 4.80357 18.9457 6.67893 20.8211C8.5543 22.6964 11.0978 23.75 13.75 23.75C16.4022 23.75 18.9457 22.6964 20.8211 20.8211C22.6964 18.9457 23.75 16.4022 23.75 13.75C23.75 11.0978 22.6964 8.5543 20.8211 6.67893C18.9457 4.80357 16.4022 3.75 13.75 3.75C11.0978 3.75 8.5543 4.80357 6.67893 6.67893C4.80357 8.5543 3.75 11.0978 3.75 13.75Z"
                                    stroke="#4B4B4B"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="stories__grid">
                    <!-- Show skeletons when loading -->
                    <template v-if="loading">
                        <CardStory v-for="n in 9" :key="n" loading />
                    </template>
                    <!-- Show real data -->
                    <template v-else>
                        <card-story
                            v-for="story in storiesData"
                            :key="story.id"
                            :imageUrl="story.cover_image"
                            :title="story.title"
                            :description="story.content"
                            :authorPhoto="story.author.profile_image ?? ''"
                            :author="story.author.name"
                            :dateCreated="story.created_at"
                            :category="story.category.name"
                            :linkTo="`/story/${story.id}`"
                        />
                    </template>
                </div>
                <div class="stories__pagination">
                    <Pagination
                        v-model:current-page="currentPage"
                        :total-pages="storiesMeta.last_page"
                    />
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped lang="scss">
.stories {
    :deep(.form-label) {
        position: relative;
        top: 4px;
    }
    :deep(.v-select) {
        .vs__dropdown-toggle {
            border: 2px solid transparent;

            @media only screen and (max-width: 991.98px) {
                border: 2px solid #cccccc;
                border-radius: 8px;
            }
        }

        .vs__selected {
            font-size: 24px;
            color: #222222;
            font-weight: 500;
            @media only screen and (max-width: 1399.98px) {
                font-size: 20px;
            }

            @media only screen and (max-width: 1199.98px) {
                font-size: 18px;
            }

            @media only screen and (max-width: 991.98px) {
                font-size: 16px;
            }
        }
        .vs__clear {
            display: none;
        }

        .vs__dropdown-option {
            font-size: 24px;
            @media only screen and (max-width: 1399.98px) {
                font-size: 20px;
            }

            @media only screen and (max-width: 1199.98px) {
                font-size: 18px;
            }

            @media only screen and (max-width: 991.98px) {
                font-size: 16px;
            }
        }

        .vs__open-indicator {
            fill: #222222;
        }
    }
    &__title {
        margin: 70px 0 40px 0;
        font-size: 44px;
        font-weight: 600;
        line-height: 1.318;
        font-family: $font-secondary;

        @media only screen and (max-width: 1399.98px) {
            margin: 50px 0 40px 0;
            font-size: 32px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin: 40px 0 30px 0;
            font-size: 28px;
        }
    }
    &__action {
        margin-top: 40px;
        display: grid;
        grid-template-columns: 1fr 547px;
        justify-content: space-between;

        @media only screen and (max-width: 1399.98px) {
            grid-template-columns: 1fr 380px;
        }

        @media only screen and (max-width: 991.98px) {
            grid-template-columns: 1fr;
            gap: 24px;
        }
    }
    &__filter {
        display: flex;
        gap: 20px;
    }

    &__filter-select {
        min-width: 200px;
    }

    &__filter-label {
        align-self: center;
    }
    &__grid {
        margin-top: 60px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 60px 29px;

        @media only screen and (max-width: 1399.98px) {
            gap: 50px 24px;
        }

        @media only screen and (max-width: 991.98px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 42px 20px;
        }

        @media only screen and (max-width: 767.98px) {
            grid-template-columns: repeat(1, 1fr);
            gap: 24px;
        }
    }

    &__filter-item {
        display: flex;
        gap: 10px;
        .form-label {
            margin: 0px;
        }
        @media only screen and (max-width: 991.98px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    &__pagination {
        display: flex;
        justify-content: center;
        margin: 200px 0px 60px 0px;

        @media only screen and (max-width: 991.98px) {
            margin: 100px 0px 60px 0px;
        }
    }
}
</style>
