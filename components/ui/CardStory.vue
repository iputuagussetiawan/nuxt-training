<script setup lang="ts">
import { formatDate } from '~/utils/FormatDate'

interface CardStoryProps {
    id?: string | number // 👈 to identify which story to edit/delete
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
    forAuthor?: boolean
}

const props = defineProps<CardStoryProps>()

// ✅ Emit events for parent components
const emit = defineEmits<{
    (e: 'delete', id?: string | number): void
    (e: 'edit', id?: string | number): void
}>()

// ✅ Handle author button clicks
const handleEdit = () => {
    emit('edit', props.id)
}

const handleDelete = () => {
    emit('delete', props.id)
}
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
        <NuxtLink class="card-story__image-container" :to="props.linkTo">
            <template v-if="props.loading">
                <div class="skeleton__image"></div>
            </template>
            <NuxtImg
                v-else
                :src="props.imageUrl"
                width="200"
                height="200"
                class="card-story__image"
                alt="Story image"
            />

            <div class="card-story__action" v-if="props.forAuthor">
                <button
                    class="card-story__button"
                    @click.stop.prevent="handleEdit"
                >
                    <svg
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="card-story__button-icon"
                    >
                        <path
                            d="M36.1513 26.0802V35.7002C36.1507 37.0613 35.6097 38.3665 34.6473 39.329C33.6848 40.2915 32.3796 40.8325 31.0184 40.833H5.88292C5.20639 40.8327 4.53658 40.6988 3.91198 40.4388C3.28738 40.1789 2.72031 39.7981 2.24334 39.3183C1.76637 38.8385 1.38891 38.2692 1.13265 37.6431C0.87639 37.017 0.74638 36.3464 0.750091 35.6699V10.5625C0.746065 9.88706 0.876137 9.21752 1.13277 8.59269C1.3894 7.96787 1.76749 7.40019 2.24512 6.92256C2.72276 6.44492 3.29043 6.06683 3.91526 5.8102C4.54008 5.55357 5.20963 5.4235 5.88509 5.42752H15.5029"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M36.1511 14.2805L27.3003 5.42752M9.59863 29.0312V24.3404C9.60297 23.5669 9.91063 22.8237 10.4545 22.2755L31.1071 1.62286C31.3815 1.34628 31.7078 1.12675 32.0674 0.976941C32.427 0.82713 32.8127 0.75 33.2023 0.75C33.5919 0.75 33.9776 0.82713 34.3372 0.976941C34.6968 1.12675 35.0231 1.34628 35.2975 1.62286L39.958 6.28336C40.2351 6.55739 40.4551 6.88368 40.6052 7.24332C40.7553 7.60295 40.8327 7.9888 40.8327 8.37852C40.8327 8.76824 40.7553 9.15409 40.6052 9.51373C40.4551 9.87337 40.2351 10.1997 39.958 10.4737L19.3053 31.1264C18.756 31.6715 18.0144 31.9789 17.2405 31.9822H12.5496C11.767 31.9822 11.0164 31.6713 10.463 31.1179C9.90954 30.5644 9.59863 29.8138 9.59863 29.0312Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
                <button
                    class="card-story__button"
                    @click.stop.prevent="handleDelete"
                >
                    <svg
                        width="52"
                        height="52"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="card-story__button-icon"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.6767 13.8667L16.436 43.4373C16.4625 43.878 16.6562 44.292 16.9775 44.5948C17.2988 44.8976 17.7235 45.0664 18.165 45.0667H33.8343C34.2758 45.0664 34.7006 44.8976 35.0219 44.5948C35.3432 44.292 35.5368 43.878 35.5633 43.4373L37.3227 13.8667H14.6767ZM39.9292 13.8667L38.159 43.5912C38.0933 44.6937 37.6091 45.7295 36.8053 46.487C36.0015 47.2444 34.9388 47.6664 33.8343 47.6667H18.165C17.0605 47.6664 15.9979 47.2444 15.1941 46.487C14.3903 45.7295 13.9061 44.6937 13.8403 43.5912L12.0702 13.8667H7.58301V12.35C7.58301 12.0627 7.69714 11.7871 7.90031 11.584C8.10347 11.3808 8.37902 11.2667 8.66634 11.2667H43.333C43.6203 11.2667 43.8959 11.3808 44.099 11.584C44.3022 11.7871 44.4163 12.0627 44.4163 12.35V13.8667H39.9292ZM30.333 6.5C30.6203 6.5 30.8959 6.61414 31.099 6.8173C31.3022 7.02047 31.4163 7.29602 31.4163 7.58333V9.1H20.583V7.58333C20.583 7.29602 20.6971 7.02047 20.9003 6.8173C21.1035 6.61414 21.379 6.5 21.6663 6.5H30.333ZM20.583 19.5H23.183L24.2663 39H21.6663L20.583 19.5ZM28.8163 19.5H31.4163L30.333 39H27.733L28.8163 19.5Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>
        </NuxtLink>

        <!-- Title -->
        <div class="card-story__header">
            <h3 class="card-story__title">
                <template v-if="props.loading">
                    <div class="skeleton__title"></div>
                </template>
                <template v-else>
                    <NuxtLink
                        class="card-story__title-text"
                        v-if="props.linkTo"
                        :to="props.linkTo"
                        >{{ props.title }}</NuxtLink
                    >
                    <span class="card-story__title-text" v-else>{{
                        props.title
                    }}</span>
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
                <div
                    v-if="props.authorPhoto"
                    class="card-story__author-photo-container"
                >
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
                <div v-if="props.author" class="card-story__author-name">
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
.skeleton-bg {
    background: linear-gradient(90deg, #e0e0e0 25%, #f4f4f4 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}
.skeleton {
    &__image {
        @extend .skeleton-bg;
        width: 100%;
        border-radius: 8px;
        aspect-ratio: 547/500;
    }

    &__title {
        @extend .skeleton-bg;
        height: 28px;
        width: 80%;
    }
    &__text {
        @extend .skeleton-bg;
        height: 16px;
        margin: 6px 0;
        width: 100%;

        &.short {
            width: 60%;
        }
    }

    &__avatar {
        @extend .skeleton-bg;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    &__button {
        @extend .skeleton-bg;
        width: 65px;
        height: 65px;
        border-radius: 100%;
        box-shadow: none;
        outline: none;
        border: none;
        outline: none;
    }
}

.card-story {
    display: grid;
    gap: 20px;
    @media only screen and (max-width: 1399.98px) {
        gap: 18px;
    }
    @media only screen and (max-width: 991.98px) {
        gap: 16px;
    }

    &__image-container {
        position: relative;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        width: auto;

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
        aspect-ratio: 547/500;
    }

    &__title {
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__title-text {
        font-weight: 700;
        font-size: 36px;
        line-height: 1.27;
        color: #222;
        text-decoration: none;
        transition: 0.4s ease;
        @media only screen and (max-width: 1399.98px) {
            font-size: 24px;
        }
        @media only screen and (max-width: 1199.98px) {
            font-size: 22px;
        }
        @media only screen and (max-width: 991.98px) {
            font-size: 20px;
        }
    }

    &__content {
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        color: #4b4b4b;

        display: -webkit-box;
        -webkit-line-clamp: 3; /* Limit to 3 lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        @media only screen and (max-width: 1399.98px) {
            font-size: 16px;
        }
        @media only screen and (max-width: 991.98px) {
            font-size: 14px;
        }
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

        @media only screen and (max-width: 1399.98px) {
            width: 42px;
            height: 42px;
        }
        @media only screen and (max-width: 991.98px) {
            width: 32px;
            height: 32px;
        }
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
        @media only screen and (max-width: 1399.98px) {
            font-size: 18px;
        }
        @media only screen and (max-width: 991.98px) {
            font-size: 16px;
        }
    }

    &__date-category {
        display: flex;
        align-items: center;
        gap: 20px;
        @media only screen and (max-width: 1399.98px) {
            gap: 18px;
        }
        @media only screen and (max-width: 991.98px) {
            gap: 16px;
        }
    }

    &__date,
    &__category {
        font-weight: 400;
        font-size: 18px;
        line-height: 1.27;

        @media only screen and (max-width: 1399.98px) {
            font-size: 16px;
        }
        @media only screen and (max-width: 991.98px) {
            font-size: 14px;
        }
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

    &__action {
        display: flex;
        position: absolute;
        bottom: 40px;
        right: 40px;
        z-index: 20;
        gap: 30px;
    }

    &__button {
        background-color: $color-primary;
        width: 65px;
        height: 65px;
        border-radius: 100%;
        box-shadow: none;
        outline: none;
        border: none;
        outline: none;
        transition: 0.4s ease;
        &:hover {
            background-color: $color-primary-hover;
            cursor: pointer;
        }
    }

    &__button-icon {
        width: 40px;
        height: 40px;
    }

    &:hover &__image-container::after {
        opacity: 0.3;
    }

    &:hover &__title-text {
        color: $color-primary;
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
