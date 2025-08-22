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
                        <a class="breadcrumb__link" :href="item.href">{{ item.label }}</a>
                    </template>
                </li>
            </ol>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .breadcrumb{
        background-color: #F0F5ED;
        padding: 28px 0px;

        &__list{
            display: flex;
            flex-wrap: wrap;
            gap: 55px;
            list-style: none;
            padding: 0px;
            margin: 0px;
        }

        &__item{
            position: relative;
            &::before{
                content: '/';
                position: absolute;
                right: -27.5px;
                top: 50%;
                transform: translateY(-50%);
                color: #466543;
            }
            &:last-child{
                &::before{
                    display: none;
                }
            }
        }

        &__link{
            text-decoration: none;
            color: #466543;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.3;
            transition: 0.4s ease;
        }
    }
</style>
