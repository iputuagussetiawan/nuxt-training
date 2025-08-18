<script setup lang="ts">
    import Button from '~/components/ui/Button.vue';
    import NavBrand from '~/components/ui/NavBrand.vue';
</script>

<template>
    <div class="navigation">
        <div class="container">
            <div class="navigation__inner">
                <NavBrand/>
                <nav class="navigation__menu">
                    <li class="navigation__item">
                        <Button type="link" href="/register" variant="primary-outline">Register</Button>
                    </li>
                    <li class="navigation__item">
                        <Button type="link" href="/login" variant="primary">Login</Button>
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