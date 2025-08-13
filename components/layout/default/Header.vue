<script setup lang="ts">

</script>

<template>
    <div>
        <h2>Hellow From Header</h2>
        <ul>
            <li>
                <NuxtLink class="navigation__link" to="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink class="navigation__link" to="/about">About</NuxtLink>
            </li>
        </ul>
    </div> 
</template>

<style scoped lang="scss">
    .router-link-exact-active {
        color: red;
    }
</style>