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
    .navigation{
        padding: 20.5px 0px;
        box-shadow: 0px 2px 7px -4px rgba(0,0,0,0.72);
        &__inner{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__logo{
            max-width: 254px;
            height: auto;
        }

        &__menu{
            display: flex;
            gap: 30px;
        }
        &__item{
            list-style: none;
        }
    }
</style>