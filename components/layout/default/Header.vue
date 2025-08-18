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
    .navigation{
        padding: 20.5px 0px;
        box-shadow: 0px 2px 7px -4px rgba(0,0,0,0.72);
        @media only screen and (max-width: 991.98px) {
            padding: 16px 0px;
        }
        &__inner{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

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

        &__menu{
            display: flex;
            gap: 30px;

            @media only screen and (max-width: 1399.98px) {
                gap: 20px;
            }

            @media only screen and (max-width: 1199.98px) {
                gap: 16px;
            }
        }
        &__item{
            list-style: none;
        }
    }
</style>