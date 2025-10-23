<script setup>
import Button from '~/components/ui/Button.vue'
</script>
<template>
    <NuxtLayout name="default">
        <section class="page-404">
            <div class="container">
                <div class="page-404__inner">
                    <div class="page-404__image-container">
                        <img
                            src="/images/404/image-404.png"
                            alt=""
                            class="page-404__image"
                        />
                    </div>
                    <div class="page-404__info-container">
                        <h1 class="page-404__title">404</h1>
                        <p class="page-404__subtitle">Page Not Found</p>
                        <div class="page-404__description">
                            Oops! It looks like this page doesn't exist. Please
                            check the URL or return to the homepage.
                        </div>
                        <Button type="link" href="/" variant="primary"
                            >Back to Home</Button
                        >
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<style scoped lang="scss">
.page-404 {
    padding: 126px 0px;

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

    &__inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 33px;
        align-items: center;

        @media only screen and (max-width: 1199.98px) {
            grid-template-columns: 1fr;
        }
    }

    &__image-container {
        aspect-ratio: 832/519;
        max-width: 832px;
        @media only screen and (max-width: 1199.98px) {
            order: 2;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__info-container {
        text-align: center;
    }

    &__title {
        margin: 0px 0px 30px 0px;
        font-weight: 700;
        font-size: 160px;
        line-height: 1.212;
        color: #222;
        font-family: $font-secondary;

        @media only screen and (max-width: 1399.98px) {
            margin: 0px 0px 20px 0px;
            font-size: 100px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin: 0px 0px 16px 0px;
            font-size: 80px;
        }
    }

    &__subtitle {
        margin: 0px 0px 70px 0px;
        font-weight: 600;
        font-size: 44px;
        line-height: 1.318;
        color: #222;
        font-family: $font-secondary;

        @media only screen and (max-width: 1399.98px) {
            margin: 0px 0px 50px 0px;
            font-size: 32px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin: 0px 0px 40px 0px;
            font-size: 28px;
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
    }
}
</style>
