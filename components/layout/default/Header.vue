<script setup lang="ts">
import UiButtonProfile from '~/components/ui/ButtonProfile.vue'
import NavBrand from '~/components/ui/NavBrand.vue'
</script>

<template>
    <div class="navigation">
        <div class="container">
            <div class="navigation__inner">
                <NavBrand />
                <div class="navigation__menu">
                    <UiButtonProfile />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.navigation {
    padding: 20.5px 0px;
    box-shadow: 0px 2px 7px -4px rgba(0, 0, 0, 0.72);
    @media only screen and (max-width: 991.98px) {
        padding: 16px 0px;
    }
    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
