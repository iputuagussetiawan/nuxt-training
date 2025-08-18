<script setup lang="ts">
    interface CardCategoryProps {
        title: string
    }
    const props = defineProps<CardCategoryProps>()
</script>

<template>
    <div class="card-category">
        <h3 class="card-category__title">{{ props.title }}</h3>
    </div>
</template>

<style scoped lang="scss">
    .card-category{
        position: relative;
        display: inline-block;
        padding: 60px;
        background-color: #F0F5ED;
        border-radius: 8px;
        transition: 0.4s ease;

        @media only screen and (max-width: 991.98px) {
            padding: 32px;
        }

        &__title{
            font-size: 28px;
            font-weight: 500;
            line-height: 1.357;
            color: #466543;
            text-align: center;

            @media only screen and (max-width: 991.98px) {
                font-size: 20px;
            }

            @media only screen and (max-width: 767.98px) {
                font-size: 18px;
            }
        }

        &:hover{
            cursor: pointer;
            background-color: #D5E6D4;
        }
    }
</style>
