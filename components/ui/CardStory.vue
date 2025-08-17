<script setup lang="ts">
    import { formatDate } from '~/utils/FormatDate'

    interface CardStoryProps {
        imageUrl?: string
        title?: string
        description?: string
        authorPhoto?: string
        author?: string
        dateCreated?: string
        category?: string
        linkTo?: string
        loading?: boolean
        variant?: 'default' | 'big' // you can extend with more types
        className?: string // optional for extra custom classes
    }

    const props = defineProps<CardStoryProps>()
</script>

<template>
    <div 
        :class="[
            'card-story',
            props.variant === 'big' ? 'card-story--big' : '',
            props.className // for additional classes
        ]"
    >
        <!-- Image -->
        <NuxtLink class="card-story__image-container"  :to="props.linkTo">
            <template v-if="props.loading">
                <div class="skeleton__image"></div>
            </template>
            <NuxtImg
                v-else
                :src="props.imageUrl"
                width="853"
                height="480"
                class="card-story__image"
                alt="Story image"
                :aspectRatio="props.variant === 'big' ? '9:16' : '16:9'"
            />
        </NuxtLink>

        <!-- Title -->
        <div class="card-story__header">
            <h3 class="card-story__title">
                <template v-if="props.loading">
                    <div class="skeleton__title"></div>
                </template>
                <template v-else>
                    <NuxtLink class="card-story__title-text" v-if="props.linkTo" :to="props.linkTo">{{ props.title }}</NuxtLink>
                    <span class="card-story__title-text" v-else>{{ props.title }}</span>
                </template>
            </h3>
        </div>

        <!-- Description -->
        <div class="card-story__content">
            <template v-if="props.loading">
                <div class="skeleton__text"></div>
                <div class="skeleton__text"></div>
                <div class="skeleton__text short"></div>
            </template>
            <template v-else>
                {{ props.description }}
            </template>
        </div>

        <!-- Footer -->
        <div class="card-story__footer">
            <div class="card-story__author">
                <div class="card-story__author-photo-container">
                    <template v-if="props.loading">
                        <div class="skeleton__avatar"></div>
                    </template>
                    <NuxtImg
                        v-else
                        :src="props.authorPhoto"
                        width="100"
                        height="100"
                        class="card-story__author-photo"
                        alt="Author photo"
                    />
                </div>
                <div class="card-story__author-name">
                    <template v-if="props.loading">
                        <div class="skeleton__text short"></div>
                    </template>
                    <template v-else>
                        {{ props.author }}
                    </template>
                </div>
            </div>

        <div class="card-story__date-category">
            <template v-if="props.loading">
                <div class="skeleton__text short"></div>
            </template>
            <template v-else>
                <div v-if="props.dateCreated" class="card-story__date">
                    {{ formatDate(props.dateCreated) }}
                </div>
                <div v-if="props.category" class="card-story__category">
                    {{ props.category }}
                </div>
            </template>
        </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .skeleton-bg{
        background: linear-gradient(90deg, #e0e0e0 25%, #f4f4f4 50%, #e0e0e0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
    }
    .skeleton {
        &__image{
            @extend .skeleton-bg;
            width: 100%;
            height: 500px;
            border-radius: 8px;
        }

        &__title{
            @extend .skeleton-bg;
            height: 28px;
            width: 80%;
        }
        &__text{
            @extend .skeleton-bg;
            height: 16px;
            margin: 6px 0;
            width: 100%;

            &.short {
                width: 60%;
            }
        }

        &__avatar{
            @extend .skeleton-bg;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    .card-story {
        display: grid;
        gap: 20px;

        &__image-container {
            position: relative;
            width: 100%;
            /* height: 500px; */
            border-radius: 8px;
            overflow: hidden;

            &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: #fff;
            opacity: 0;
            transition: opacity 0.4s ease;
            }
        }

        &__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        &__title {
            margin: 0;
        }

        &__title-text{
            font-weight: 700;
            font-size: 36px;
            line-height: 1.27;
            color: #222;
            text-decoration: none;
        }

        &__content {
            font-size: 18px;
            font-weight: 400;
            line-height: 1.5;
            color: #4b4b4b;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__author {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__author-photo-container {
            width: 50px;
            height: 50px;
            border-radius: 100%;
            overflow: hidden;
        }

        &__author-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__author-name {
            color: #222;
            font-weight: 500;
            font-size: 20px;
            line-height: 1.3;
        }

        &__date-category {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        &__date,
        &__category {
            font-weight: 400;
            font-size: 18px;
            line-height: 1.27;
        }

        &__date {
            color: #222;
        }

        &__category {
            padding: 8px 12px;
            color: #466543;
            background-color: #f0f5ed;
            border-radius: 8px;
        }

        &:hover &__image-container::after {
            opacity: 0.3;
        }
    }

    @keyframes skeleton-loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
