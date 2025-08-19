<script setup lang="ts">
    import CardCategory from '~/components/ui/CardCategory.vue';

    interface Categories {
        id: number
        title: string
    }

    interface SectionStoryCategories{
        categories: Categories[]
        headerTitle: string
        headerLinkText: string
        headerLinkTo?: string
    }

    const props = defineProps<SectionStoryCategories>()
</script>

<template>
    <section class="story-categories">
        <SectionHeader
            :title="props.headerTitle"
            :linkText="props.headerLinkText"
            :linkTo="props.headerLinkTo"
        />
        <div class="container">
            <div class="story-categories__grid">
                <!-- Loop categories -->
                <CardCategory
                    v-for="category in props.categories"
                    :key="category.id"
                    :title="category.title"
                />
            </div>
        </div>
    </section>
</template>


<style scoped lang="scss">
    .story-categories{
        position: relative;
        padding: 60px 0px;

        @media only screen and (max-width: 991.98px) {
            padding: 42px 0px;
        }

        @media only screen and (max-width: 767.98px) {
            padding: 32px 0px;
        }

        &__grid{
            display: flex;
            flex-wrap: wrap;
            gap: 30px;

            @media only screen and (max-width: 991.98px) {
                gap: 20px;
            }

            @media only screen and (max-width: 767.98px) {
                gap: 16px;
            }
        }
    }
</style>
