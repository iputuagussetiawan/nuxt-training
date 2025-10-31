<script setup lang="ts"></script>
<template>
    <div class="story-blank">
        <div class="story-blank__inner">
            <h3 class="story-blank__title">No Stories Yet</h3>
            <div class="story-blank__description">
                You haven't shared any stories yet. Start your fitness journey
                today!
            </div>
            <div class="story-blank__image-container">
                <img
                    src="/images/stories/blank_story.svg"
                    alt=""
                    class="story-blank__image"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.story-blank {
    &__inner {
        text-align: center;
        max-width: 90%;
        margin: 0 auto;
    }
    &__title {
        margin: 0px 0px 30px 0px;
        font-weight: 600;
        font-size: 44px;
        line-height: 1.318;
        color: #222;
        font-family: $font-secondary;

        @media only screen and (max-width: 1399.98px) {
            margin: 0px 0px 20px 0px;
            font-size: 32px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin: 0px 0px 16px 0px;
            font-size: 28px;
        }

        @media only screen and (max-width: 991.98px) {
            margin: 0px 0px 16px 0px;
            font-size: 24px;
        }
    }

    &__description {
        margin: 0px 0px 70px 0px;
        font-weight: 400;
        font-size: 24px;
        line-height: 1.33;
        color: #4b4b4b;

        @media only screen and (max-width: 1399.98px) {
            margin: 0px 0px 50px 0px;
            font-size: 20px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin: 0px 0px 40px 0px;
            font-size: 18px;
        }

        @media only screen and (max-width: 991.98px) {
            margin: 0px 0px 30px 0px;
            font-size: 16px;
        }
    }

    &__image-container {
        aspect-ratio: 529/546;
        max-width: 529px;
        margin: 0 auto;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
