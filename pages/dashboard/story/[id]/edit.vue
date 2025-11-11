<script setup>
import UiButton from '~/components/ui/Button.vue'
import StoryForm from '~/components/section/mystory/StoryForm.vue'
const route = useRoute()
const id = route.params.id
</script>

<template>
    <section class="edit-story">
        <div class="container">
            <div class="edit-story__header">
                <UiButton type="link" href="/dashboard/" variant="icon">
                    <svg
                        class="edit-story__header-icon"
                        width="60"
                        height="40"
                        viewBox="0 0 60 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M46.875 22.2222H13.125C12.075 22.2222 11.25 21.2444 11.25 20C11.25 18.7555 12.075 17.7778 13.125 17.7778H46.875C47.925 17.7778 48.75 18.7555 48.75 20C48.75 21.2444 47.925 22.2222 46.875 22.2222Z"
                            fill="#222222"
                        />
                        <path
                            d="M22.5 37.7778C22.2541 37.7813 22.0103 37.7239 21.7842 37.609C21.5582 37.4942 21.3549 37.3246 21.1875 37.1111L8.0625 21.5556C7.3125 20.6667 7.3125 19.2889 8.0625 18.4L21.1875 2.8889C21.9375 2.00001 23.1 2.00001 23.85 2.8889C24.6 3.77778 24.6 5.15556 23.85 6.04445L12.0375 20.0445L23.85 34.0445C24.6 34.9333 24.6 36.3111 23.85 37.2C23.475 37.6445 22.9875 37.8667 22.5375 37.8667L22.5 37.7778Z"
                            fill="#222222"
                        />
                    </svg>
                </UiButton>
                <h1 class="edit-story__header-title">Edit Story : {{ id }}</h1>
            </div>
            <div class="edit-story__body">
                <StoryForm />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.edit-story {
    padding: 124px 0px 218px 0px;
    &__header {
        margin-bottom: 60px;
        display: flex;
        align-items: center;
        gap: 84px;
    }

    &__header-icon {
        max-width: 60px;
        height: auto;
    }

    &__header-title {
        margin: 0px;
        font-family: $font-secondary;
        font-weight: 600;
        font-size: 44px;
        line-height: 1.3;
        color: #222222;
    }
    &__action {
        margin-top: 60px;
        display: inline-flex;
        gap: 41px;
    }
}
</style>
