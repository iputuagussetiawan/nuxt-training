<script setup lang="ts">
interface BreadcrumbItem {
    label: string
    href?: string // optional, since the last breadcrumb usually doesn't have a link
}

defineProps<{
    items: BreadcrumbItem[]
}>()
</script>

<template>
    <div class="breadcrumb">
        <div class="container">
            <ol class="breadcrumb__list">
                <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="breadcrumb__item"
                    :class="{ active: index === items.length - 1 }"
                >
                    <!-- If it's the last item, show text, else show a link -->
                    <template v-if="index === items.length - 1">
                        <span class="breadcrumb__link">{{ item.label }}</span>
                    </template>
                    <template v-else>
                        <a class="breadcrumb__link" :href="item.href">{{
                            item.label
                        }}</a>
                    </template>
                </li>
            </ol>
        </div>
    </div>
</template>

<style scoped lang="scss">
.breadcrumb {
    background-color: #f0f5ed;
    padding: 28px 0px;

    @media only screen and (max-width: 1399.98px) {
        padding: 22px 0px;
    }

    @media only screen and (max-width: 1199.98px) {
        padding: 20px 0px;
    }

    @media only screen and (max-width: 991.98px) {
        padding: 18px 0px;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 55px;
        list-style: none;
        padding: 0px;
        margin: 0px;

        @media only screen and (max-width: 1399.98px) {
            gap: 40px;
        }
    }

    &__item {
        position: relative;
        &::before {
            content: '/';
            position: absolute;
            right: -27.5px;
            top: 50%;
            transform: translateY(-50%);
            color: #466543;

            @media only screen and (max-width: 1399.98px) {
                right: -22px;
            }
        }
        &:last-child {
            &::before {
                display: none;
            }
        }
    }

    &__link {
        text-decoration: none;
        color: #466543;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.3;
        transition: 0.4s ease;

        @media only screen and (max-width: 1399.98px) {
            font-size: 18px;
        }

        @media only screen and (max-width: 1199.98px) {
            font-size: 16px;
        }

        @media only screen and (max-width: 991.98px) {
            font-size: 14px;
        }
    }
}
</style>
