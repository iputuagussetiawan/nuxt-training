<script setup lang="ts">
    import SectionHeader from '~/components/section/SectionHeader.vue'
    import CardStory from '~/components/ui/CardStory.vue'
    import { ref, onMounted } from 'vue'

    interface Story {
        id: number
        image: string
        title: string
        shortContent: string
        authorAvatar: string
        authorName: string
        createdDate: string
        category: string
    }

    interface SectionStoryGrid {
        stories: Story[]
        headerTitle: string
        headerLinkText: string
        headerLinkTo: string
    }
    const props = defineProps<SectionStoryGrid>()
    const loading = ref(true) // <-- NEW loading state
    const storiesData = ref<Story[]>([]) // we use this instead of props.stories

    onMounted(() => {
        // simulate API fetch
        setTimeout(() => {
            storiesData.value = props.stories // load real stories
            loading.value = false
        }, 2000)
    })

    const storyData = computed(() =>
        storiesData.value
        .slice(0, 3)
    )
</script>

<template>
    <section class="story-grid">
        <SectionHeader
            :title="props.headerTitle"
            :linkText="props.headerLinkText"
            :linkTo="props.headerLinkTo"
        />
        <div class="container">
            <div class="story-grid__grid">
                <!-- Show skeletons when loading -->
                <template v-if="loading">
                    <div class="story-grid__item"
                        v-for="n in 3" :key="n"
                    >
                        <CardStory loading />
                    </div>
                </template>

                <!-- Show real data -->
                <template v-else>
                    <div class="story-grid__item"
                        v-for="(story, index) in storyData"
                    >
                        <CardStory
                            :key="story.id"
                            :imageUrl="story.image"
                            :title="story.title"
                            :description="story.shortContent"
                            :authorPhoto="story.authorAvatar"
                            :author="story.authorName"
                            :dateCreated="story.createdDate"
                            :category="story.category"
                            :linkTo="`/stories/${story.id}`"
                            :variant="index === 0 ? 'big' : 'default'" 
                        />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .story-grid{
        padding: 60px 0px;
        position: relative;
        @media only screen and (max-width: 991.98px) {
            padding: 42px 0px;
        }

        @media only screen and (max-width: 767.98px) {
            padding: 32px 0px;
        }
        &__grid{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: auto auto;
            gap: 46px 30px; 
            align-items: start;

            @media only screen and (max-width: 991.98px) {
                gap: 32px;
            }
        }
        &__item{
            &:nth-child(1){
                grid-column: 1 / 9;
                grid-row: 1/-1;

                @media only screen and (max-width: 1199.98px) {
                    grid-column: 1/-1;
                    grid-row: 1;
                }
            }
            &:nth-child(2){
                grid-column: 9 / -1;
                grid-row: 1;
                @media only screen and (max-width: 1199.98px) {
                    grid-column: 1/-1;
                    grid-row: 2;
                }
            }
            &:nth-child(3){
                grid-column: 9 / -1;
                grid-row: 2;
                @media only screen and (max-width: 1199.98px) {
                    grid-column: 1/-1;
                    grid-row: 3;
                }
            }
        }
    }
</style>
