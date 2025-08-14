<script setup lang="ts">

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
                        <NuxtLink class="btn-primary-outline" to="/register">Register</NuxtLink>
                    </li>
                    <li class="navigation__item">
                        <NuxtLink class="btn-primary" to="/login">Login</NuxtLink>
                    </li>
                </nav>
            </div>
        </div>
    </div> 
</template>

<style scoped lang="scss">
    
</style>