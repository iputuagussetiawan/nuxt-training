<script setup lang="ts">
    import { ref, type Ref, onMounted, onUnmounted } from "vue";
    import SectionHeader from "~/components/section/SectionHeader.vue";
    import CardStory from "~/components/ui/CardStory.vue";
    import type { IStoryItem } from "~/types/story";

    interface SimilarStory {
        headerTitle: string;
        headerLinkText?: string;
        headerLinkTo?: string;
    }

    const props = defineProps<SimilarStory>();
    const storyList: Ref<IStoryItem[]> = ref([]);
    const isLoading = ref(true); // skeleton state
    const targetRef = ref<HTMLElement | null>(null); // for Intersection Observer

    const getStories = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const response: { data: IStoryItem[] } = await $fetch(
                "https://timestory.tmdsite.my.id/api/story",
                {
                    method: "GET",
                    params: {
                        limit: 3,
                    },
                }
            );
            storyList.value = response.data;
        } catch (error) {
            console.error("Failed to fetch stories:", error);
        } finally {
            isLoading.value = false;
        }
    };

    let observer: IntersectionObserver | null = null;
    onMounted(() => {
        if (targetRef.value) {
            observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        getStories();
                        if (observer && targetRef.value) {
                            observer.unobserve(targetRef.value); // stop observing after first fetch
                        }
                    }
                },
                { threshold: 0.2 }
            );
            observer.observe(targetRef.value);
        }
    });

    onUnmounted(() => {
        if (observer && targetRef.value) {
            observer.unobserve(targetRef.value);
        }
    });
</script>

<template>
    <section class="similar-story" ref="targetRef">
        <SectionHeader
            :title="props.headerTitle"
            :linkText="props.headerLinkText"
            :linkTo="props.headerLinkTo"
        />
        <div class="container">
            <div class="similar-story__column">
                <!-- Skeletons -->
                <template v-if="isLoading">
                    <div class="similar-story__column-item" v-for="n in 3" :key="n">
                        <CardStory loading />
                    </div>
                </template>

                <!-- Real data -->
                <template v-else>
                    <div
                        class="similar-story__column-item"
                        v-for="(story, index) in storyList"
                        :key="story.id"
                    >
                        <CardStory
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
                            :variant="index === 0 ? 'big' : 'default'"
                        />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .similar-story {
        padding: 60px 0px;
        position: relative;

        @media only screen and (max-width: 991.98px) {
            padding: 42px 0px;
        }
        @media only screen and (max-width: 767.98px) {
            padding: 32px 0px;
        }
        &__column {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;

            @media only screen and (max-width: 991.98px) {
                grid-template-columns: repeat(2, 1fr);
                gap: 30px 20px;
            }

            @media only screen and (max-width: 767.98px) {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
</style>
