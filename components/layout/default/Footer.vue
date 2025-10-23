<script setup lang="ts">
import { ref } from 'vue'
import SocialMedia from '~/components/ui/SocialMedia.vue'
// Get current year
const currentYear = ref(new Date().getFullYear())
</script>

<template>
    <div class="footer">
        <div class="container">
            <div class="footer__inner">
                <h2 class="footer__title">
                    © {{ currentYear }} PT. Timedoor Indonesia. All rights
                    reserved.
                </h2>
                <SocialMedia />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.footer {
    position: relative;
    margin-top: 60px;
    padding: 32px 0px 42px 0px;
    border-top: 1px solid #4b4b4b;

    @media only screen and (max-width: 991.98px) {
        margin-top: 42px;
        padding: 24px 0px 32px 0px;
    }

    @media only screen and (max-width: 767.98px) {
        margin-top: 32px;
        padding: 16px 0px 16px 0px;
    }
    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media only screen and (max-width: 767.98px) {
            flex-direction: column-reverse;
        }
    }
    &__title {
        color: $color-primary;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.3;

        @media only screen and (max-width: 991.98px) {
            font-size: 16px;
        }

        @media only screen and (max-width: 767.98px) {
            font-size: 14px;
        }
    }
}
</style>
