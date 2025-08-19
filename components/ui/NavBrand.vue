<script setup lang="ts">
</script>

<template>
    <NuxtLink class="nav-brand" to="/">
        <img class="nav-brand__logo" src="~/assets/images/logo.png" alt="logo">
    </NuxtLink>
</template>

<style scoped lang="scss">
    .nav-brand{
        &__logo{
            max-width: 254px;
            height: auto;

            @media only screen and (max-width: 1399.98px) {
                max-width: 200px;
            }

            @media only screen and (max-width: 1199.98px) {
                max-width: 150px;
            }
        }
    }
</style>
