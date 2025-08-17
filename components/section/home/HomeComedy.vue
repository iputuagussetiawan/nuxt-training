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

    interface SectionComedy {
        stories: Story[]
    }
    const props = defineProps<SectionComedy>()
    const loading = ref(true) // <-- NEW loading state
    const storiesData = ref<Story[]>([]) // we use this instead of props.stories

    onMounted(() => {
        // simulate API fetch
        setTimeout(() => {
            storiesData.value = props.stories // load real stories
            loading.value = false
        }, 2000)
    })

    // ✅ Computed: filter only comedy stories
    const comedyStories = computed(() =>
        storiesData.value
        .filter(story => story.category.toLowerCase() === 'comedy')
        .slice(0, 3)
    )
</script>

<template>
    <section class="comedy">
        <SectionHeader
            title="Comedy"
            linkText="Explore More"
            linkTo="/about"
        />
        <div class="container">
            <div class="comedy__grid">
                <!-- Show skeletons when loading -->
                <template v-if="loading">
                    <div class="comedy__item"
                        v-for="n in 3" :key="n"
                    >
                        <CardStory loading />
                    </div>
                </template>

                <!-- Show real data -->
                <template v-else>
                    <div class="comedy__item"
                        v-for="(story, index) in comedyStories"
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
    .comedy{
        padding-top: 120px;
        position: relative;
        &__grid{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: auto auto;
            gap: 46px 30px; 
            align-items: start;
        }
        &__item{
            &:nth-child(1){
                grid-column: 1 / 9;
                grid-row: 1/-1;
            }
            &:nth-child(2){
                grid-column: 9 / -1;
                grid-row: 1;
            }
            &:nth-child(3){
                grid-column: 9 / -1;
                grid-row: 2;
            }
        }
    }
</style>
