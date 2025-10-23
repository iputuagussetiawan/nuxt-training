<script setup lang="ts">
interface SectionHeaderProps {
    title: string
    linkText?: string
    linkTo?: string
}
defineProps<SectionHeaderProps>()
</script>

<template>
    <div class="section-header">
        <div class="container">
            <div class="section-header__inner">
                <h2 class="section-header__title">{{ title }}</h2>
                <div class="section-header__action" v-if="linkTo">
                    <NuxtLink class="section-header__link" :to="linkTo">
                        <span class="section-header__link-text">
                            {{ linkText }}
                        </span>
                        <svg
                            class="section-header__link-icon"
                            width="34"
                            height="24"
                            viewBox="0 0 34 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M26.5625 13.3332H7.4375C6.8425 13.3332 6.375 12.7465 6.375 11.9998C6.375 11.2532 6.8425 10.6665 7.4375 10.6665H26.5625C27.1575 10.6665 27.625 11.2532 27.625 11.9998C27.625 12.7465 27.1575 13.3332 26.5625 13.3332Z"
                                fill="#4B4B4B"
                            />
                            <path
                                d="M21.25 22.6665C21.1107 22.6686 20.9725 22.6341 20.8444 22.5652C20.7163 22.4963 20.6011 22.3946 20.5063 22.2665C20.0813 21.7331 20.0813 20.9065 20.5063 20.3731L27.2 11.9731L20.5063 3.57312C20.0813 3.03979 20.0813 2.21312 20.5063 1.67979C20.9313 1.14645 21.59 1.14645 22.015 1.67979L29.4525 11.0131C29.8775 11.5465 29.8775 12.3731 29.4525 12.9065L22.015 22.2398C21.8025 22.5065 21.5263 22.6398 21.2713 22.6398L21.25 22.6665Z"
                                fill="#4B4B4B"
                            />
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.section-header {
    &__inner {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 40px;
        margin-bottom: 40px;
        border-bottom: 1px solid #170101;

        @media only screen and (max-width: 991.98px) {
            padding-bottom: 24px;
            margin-bottom: 24px;
        }
    }
    &__title {
        margin: 0px;
        font-family: $font-secondary;
        font-weight: 600;
        font-size: 44px;
        line-height: 1.318;
        color: #222222;

        @media only screen and (max-width: 1399.98px) {
            font-size: 36px;
        }

        @media only screen and (max-width: 1199.98px) {
            font-size: 30px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 24px;
        }
    }
    &__link {
        padding: 8px 0px;
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    &__link-text {
        font-size: 24px;
        line-height: 1.33;
        font-weight: 400;
        color: #4b4b4b;
        @media only screen and (max-width: 991.98px) {
            font-size: 16px;
        }
    }

    &__link-icon {
        width: 32px;
        height: 32px;
        @media only screen and (max-width: 1399.98px) {
            width: 26px;
            height: 26px;
        }
        @media only screen and (max-width: 1199.98px) {
            width: 24px;
            height: 24px;
        }
        @media only screen and (max-width: 991.98px) {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
