<script setup lang="ts">
    import Button from '~/components/ui/Button.vue';
</script>

<template>
    <div class="navigation">
        <div class="container">
            <div class="navigation__inner">
                <NuxtLink class="navigation__link" to="/">
                    <img class="navigation__logo" src="~/assets/images/logo.png" alt="logo">
                </NuxtLink>
                <nav class="navigation__menu">
                    <li class="navigation__item">
                        <Button type="link" href="/about" variant="primary-outline">Register</Button>
                    </li>
                    <li class="navigation__item">
                        <Button type="link" href="/about" variant="primary">Login</Button>
                    </li>
                </nav>
            </div>
        </div>
    </div> 
</template>

<style scoped lang="scss">
    
</style>