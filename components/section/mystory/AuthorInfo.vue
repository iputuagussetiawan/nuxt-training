<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
</script>

<template>
    <section class="author-info">
        <div class="container">
            <div class="author-info__inner">
                <div class="author-info__image-container">
                    <img
                        src="https://picsum.photos/200/200?random=1"
                        alt=""
                        class="author-info__image"
                    />
                </div>
                <div class="author-info__info-container">
                    <p class="author-info__name">Iswara</p>
                    <p class="author-info__email">
                        dewiratnaiswara99@gmail.com
                    </p>
                    <div class="author-info__description">
                        Avid reader and aspiring writer. Lover of mysteries,
                        thrillers, and sci-fi. Coffee enthusiast and nature
                        explorer. Always on the lookout for new stories and
                        adventures.
                    </div>
                </div>
                <div class="author-info__action">
                    <Button type="link" href="/login" variant="primary"
                        >Edit Profile</Button
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.author-info {
    padding: 100px 0px;
    background-color: #f0f5ed;

    @media only screen and (max-width: 1399.98px) {
        padding: 80px 0px;
    }

    @media only screen and (max-width: 1199.98px) {
        padding: 64px 0px;
    }

    @media only screen and (max-width: 991.98px) {
        padding: 42px 0px;
    }
    @media only screen and (max-width: 767.98px) {
        padding: 32px 0px;
    }

    .btn {
        @media only screen and (max-width: 1199.98px) {
            width: 100%;
            text-align: center;
        }
    }
    &__inner {
        display: grid;
        grid-template-columns: 200px 1fr auto;
        gap: 40px;
        align-items: center;

        @media only screen and (max-width: 1399.98px) {
            grid-template-columns: 150px 1fr auto;
            gap: 30px;
        }

        @media only screen and (max-width: 1199.98px) {
            grid-template-columns: 150px 1fr;
        }

        @media only screen and (max-width: 767.98px) {
            text-align: center;
            grid-template-columns: 1fr;
        }
    }

    &__image-container {
        position: relative;
        aspect-ratio: 200/200;
        max-width: 200px;
        border-radius: 100%;
        overflow: hidden;

        @media only screen and (max-width: 767.98px) {
            margin: 0px auto 0px auto;
            max-width: 150px;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__name {
        font-weight: 700;
        font-size: 36px;
        line-height: 1.333;
        color: #222;
        margin: 0px 0px 8px 0px;

        @media only screen and (max-width: 1399.98px) {
            font-size: 28px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 24px;
        }
    }

    &__email {
        font-weight: 400;
        font-size: 24px;
        line-height: 1.33;
        color: #222222;
        margin: 0px 0px 30px 0px;

        @media only screen and (max-width: 1399.98px) {
            font-size: 20px;
            margin: 0px 0px 20px 0px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 18px;
            margin: 0px 0px 18px 0px;
        }

        @media only screen and (max-width: 767.98px) {
            font-size: 16px;
            margin: 0px 0px 16px 0px;
        }
    }

    &__description {
        font-weight: 400;
        font-size: 24px;
        line-height: 1.333;
        color: #4b4b4b;

        @media only screen and (max-width: 1399.98px) {
            font-size: 20px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 18px;
        }

        @media only screen and (max-width: 767.98px) {
            font-size: 16px;
        }
    }
}
</style>
