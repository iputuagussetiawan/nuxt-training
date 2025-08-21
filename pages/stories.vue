<script setup lang="ts">
import Breadcrumb from "~/components/ui/Breadcrumb.vue";
import "~/assets/scss/components/ui/Input.scss";
import "~/assets/scss/components/ui/Label.scss";
import { stories as storiesMock } from "~/data/stories"; // ✅ renamed import
import { categories as categoriesMock } from '~/data/categories'; 

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css' // ✅ must import the CSS
import { computed, onMounted, ref } from "vue";
import CardStory from "~/components/ui/CardStory.vue";


const selectedOption = ref("Newest") // ✅ default value
const selectedOptionCategory = ref("Romance") // ✅ default value

interface Story {
    id: number;
    image: string;
    title: string;
    shortContent: string;
    authorAvatar: string;
    authorName: string;
    createdDate: string;
    category: string;
}

interface BreadcrumbItem {
    label: string;
    href?: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "All Story" }, // last item has no href
];

const loading = ref(true); 
const storiesData = ref<Story[]>([]); 

onMounted(() => {
    setTimeout(() => {
        storiesData.value = storiesMock; 
        loading.value = false;
    }, 2000);
});

const allCategoryNames = computed(() => categoriesMock.map(cat => cat.title))


console.log(allCategoryNames.value)  
</script>

<template>
    <div>
        <section class="stories">
            <div class="container">
                <h1 class="stories__title">All Story</h1>
            </div>
            <Breadcrumb :items="breadcrumbItems" />
            <div class="container">
                <div class="stories__action">
                    <div class="stories__filter">
                        <div class="stories__filter-item">
                            <label class="form-label" for="sort-by">Sort by</label>
                            <v-select 
                                v-model="selectedOption"
                                :options="['Newest', 'Latest']"
                                name="sort-by"
                                id="sort-by"
                            />
                        </div>
                        <div class="stories__filter-item">
                            <label class="form-label" for="category">Category</label>
                            <v-select 
                                v-model="selectedOptionCategory"
                                :options="allCategoryNames"
                                label="name"        
                                name="category"
                                id="category"
                            />
                        </div>
                    </div>
                    <div class="stories__search">
                        <div class="form-control-search">
                            <input
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
                        <CardStory 
                            v-for="n in 9" :key="n"
                            loading 
                        />
                    </template>
                    <!-- Show real data -->
                    <template v-else>
                        <card-story
                            v-for="story in storiesData"
                                :key="story.id"
                                :imageUrl="story.image"
                                :title="story.title"
                                :description="story.shortContent"
                                :authorPhoto="story.authorAvatar"
                                :author="story.authorName"
                                :dateCreated="story.createdDate"
                                :category="story.category"
                                :linkTo="`/stories/${story.id}`"
                            />
                    </template>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped lang="scss">
.stories {
    &__title {
        margin: 70px 0 40px 0;
        font-size: 44px;
        font-weight: 600;
        line-height: 1.318;
        font-family: $font-secondary;
    }
    &__action {
        margin-top: 40px;
        display: grid;
        grid-template-columns: 1fr 547px;
        justify-content: space-between;
    }
    &__filter {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    &__grid{
        margin-top: 60px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 60px 29px;
    }

    &__filter-item{
        display: flex;
        gap: 10px;
        align-items: center;
        .form-label{
            margin: 0px;
        }
    }
}
</style>
