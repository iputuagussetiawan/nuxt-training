<script setup>
import NavBrand from '~/components/ui/NavBrand.vue'
import RegisterFrom from '~/components/section/register/RegisterForm.vue'

definePageMeta({
    layout: 'blank'
})
useSeoMeta({
    title: 'Create an Account | MyApp',
    ogTitle: 'Join MyApp Today!',
    description:
        'Register an account to access exclusive features, manage your profile, and stay connected with our community.',
    ogDescription:
        'Create your MyApp account to unlock premium tools and stay updated.',
    ogImage: 'https://myapp.com/assets/og-register.png',
    twitterCard: 'summary_large_image'
})
</script>

<template>
    <section class="register">
        <div class="register__inner">
            <div class="register__info-container">
                <NavBrand />
                <div class="register__info">
                    <h1 class="register__title">
                        Join the World’s Most-Loved Social Storytelling
                        Platform!
                    </h1>
                    <div class="register__description">
                        Create an account to explore interesting articles,
                        connect with like-minded people, and share your own
                        stories.
                    </div>
                    <div class="register__image-container">
                        <NuxtImg
                            src="/images/register/register-image.png"
                            width="790"
                            height="585"
                            class="register__image"
                            alt="Register Image"
                            loading="lazy"
                            aspectRatio="790:585"
                        />
                    </div>
                </div>
            </div>

            <div class="register__form-container">
                <RegisterFrom />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.register {
    position: relative;
    padding: 20px;
    &__inner {
        display: flex;
        justify-content: flex-start;
        @media only screen and (max-width: 1199.98px) {
            flex-direction: column;
            gap: 40px;
        }
    }
    &__info-container {
        width: 50%;
        padding: 30px 63px;
        background-color: #f0f5ed;
        border-radius: 8px;

        @media only screen and (max-width: 1399.98px) {
            padding: 28px 50px;
        }

        @media only screen and (max-width: 1199.98px) {
            width: 100%;
        }

        @media only screen and (max-width: 991.98px) {
            padding: 20px 42px;
        }

        @media only screen and (max-width: 767.98px) {
            padding: 16px 24px;
        }
    }
    &__form-container {
        width: 50%;
        margin-left: 144px;
        max-width: 577px;

        @media only screen and (max-width: 1199.98px) {
            width: 100%;
            max-width: 100%;
            margin-left: 0%;
        }
    }

    &__title {
        margin-top: 70px;
        margin-bottom: 40px;
        font-family: $font-secondary;
        font-weight: 700;
        font-size: 60px;
        line-height: 1.233;
        color: #222222;

        @media only screen and (max-width: 1399.98px) {
            margin-top: 64px;
            margin-bottom: 32px;
            font-size: 50px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin-top: 42px;
            margin-bottom: 24px;
            font-size: 42px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 32px;
        }
    }

    &__description {
        margin-bottom: 32px;
        color: #4b4b4b;
        font-weight: 400;
        font-size: 28px;
        line-height: 1.357;

        @media only screen and (max-width: 1199.98px) {
            font-size: 24px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 20px;
        }
    }

    &__image {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}
</style>
