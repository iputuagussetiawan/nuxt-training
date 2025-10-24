<script setup lang="ts">
import NavBrand from '~/components/ui/NavBrand.vue'
import LoginForm from '~/components/section/login/LoginForm.vue'

definePageMeta({
    layout: 'blank'
})
useSeoMeta({
    title: 'Login | Story Time',
    ogTitle: 'Story Time',
    description:
        'Access your account to explore features, manage your profile, and stay connected on My Amazing Site.',
    ogDescription:
        'Log in to My Amazing Site to continue enjoying personalized content and exclusive features.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image'
})
</script>

<template>
    <section class="login">
        <div class="login__inner">
            <div class="login__form-container">
                <div class="login__logo-desktop">
                    <NavBrand />
                </div>
                <div class="login__form-wrapper">
                    <h2 class="login__form-title">Login</h2>
                    <LoginForm />
                </div>
            </div>
            <div class="login__info-container">
                <div class="login__logo-mobile">
                    <NavBrand />
                </div>
                <div class="login__info-wrapper">
                    <h1 class="login__title">
                        Welcome Back to <br />
                        Story Time!
                    </h1>
                    <div class="login__description">
                        Dive back into captivating stories, follow your favorite
                        authors, and continue sharing your own tales.
                    </div>
                </div>
                <div class="login__image-container">
                    <NuxtImg
                        class="login__image"
                        src="/images/login/login.png"
                        width="917"
                        height="600"
                        alt="Login Image"
                        loading="lazy"
                        aspectRatio="917:600"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.login {
    position: relative;
    padding: 20px;
    &__inner {
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 1199.98px) {
            flex-direction: column-reverse;
            gap: 40px;
        }
    }

    &__logo-desktop {
        @media only screen and (max-width: 1199.98px) {
            display: none;
        }
    }

    &__logo-mobile {
        display: none;
        @media only screen and (max-width: 1199.98px) {
            display: block;
            margin-bottom: 32px;
        }
    }

    &__form-container {
        position: relative;
        padding: 30px 63px;
        width: 50%;
        @media only screen and (max-width: 1399.98px) {
            padding: 20px 30px;
        }

        @media only screen and (max-width: 1199.98px) {
            width: 100%;
            padding: 20px 0px;
        }
    }

    &__form-wrapper {
        position: relative;
        max-width: 577px;
        margin-top: 173px;
        margin-left: 141px;

        @media only screen and (max-width: 1399.98px) {
            margin-top: 10%;
            margin-left: 10%;
        }

        @media only screen and (max-width: 1199.98px) {
            margin-left: 0px;
        }
    }

    &__form-title {
        margin: 0px;
        color: #222222;
        font-weight: 700;
        font-size: 44px;
        line-height: 1.318;

        @media only screen and (max-width: 1199.98px) {
            font-size: 37px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 32px;
        }
        @media only screen and (max-width: 767.98px) {
            font-size: 27px;
        }
    }

    &__info-container {
        width: 50%;
        padding: 114px 33px 0px 10px;
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

    &__info-wrapper {
        margin-bottom: 62px;
        max-width: 686px;
        margin-left: 127px;

        @media only screen and (max-width: 1399.98px) {
            margin-left: 5%;
            margin-bottom: 42px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin-left: 0px;
        }

        @media only screen and (max-width: 991.98px) {
            margin-bottom: 32px;
        }
    }

    &__title {
        margin: 0px 0px 40px 0px;
        font-family: $font-secondary;
        font-weight: 700;
        font-size: 60px;
        line-height: 1.233;
        color: #222222;

        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 32px;
            font-size: 50px;
        }

        @media only screen and (max-width: 1199.98px) {
            margin-bottom: 24px;
            font-size: 42px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 32px;
        }
    }

    &__description {
        margin: 0px;
        color: #4b4b4b;
        font-weight: 400;
        font-size: 28px;
        line-height: 1.357;

        @media only screen and (max-width: 1399.98px) {
            font-size: 22px;
        }

        @media only screen and (max-width: 1199.98px) {
            font-size: 20px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 18px;
        }
    }

    &__image {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}
</style>
