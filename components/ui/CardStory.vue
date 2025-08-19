<script setup lang="ts">
    import {formatDate}from '~/utils/FormatDate'
    interface CardStoryProps {
        imageUrl?: string,
        title?: string,
        description?: string,
        authorPhoto?: string,
        author?: string,
        dateCreated?: string,
        category?: string,
        linkTo?: string
    }
    defineProps<CardStoryProps>()
</script>

<template>
    <div class="card-story">
        <div class="card-story__image-container">
            <NuxtImg
                :src="imageUrl"
                width="700"
                height="700"
                class="card-story__image"
                alt="Story image"
            />
        </div>
        <div class="card-story__header">
            <h3 class="card-story__title">
                {{ title }}
            </h3>
        </div>
        <div class="card-story__content">
                {{ description }}
        </div>
        <div class="card-story__footer">
            <div class="card-story__author">
                <div class="card-story__author-photo-container">
                    <NuxtImg
                        :src="authorPhoto"
                        width="100"
                        height="100"
                        class="card-story__author-photo"
                        alt="Story image"
                    />
                </div>
                <div class="card-story__author-name">
                    {{ author }}
                </div>
            </div>
            <div class="card-story__date-category">
                <div class="card-story__date">
                    {{ formatDate(dateCreated as string) }}
                </div>
                <div class="card-story__category">
                    {{ category }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .card-story{
        display: grid;
        gap: 20px;
        &__image-container{
            position: relative;
            width: 100%;
            height: 500px;
            border-radius: 8px;
            overflow: hidden;
            &::after{
                content: '';
                position: absolute;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
                background: #fff;
                opacity: 0;
                transition: 0.4s ease;

            }
        }
        &__image{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &__title{
            margin: 0px;
            font-weight: 700;
            font-size: 36px;
            line-height: 1.27;
            color: #222222;
        }
        &__content{
            font-size: 18px;
            font-weight: 400;
            line-height: 1.5;
            color: #4B4B4B;

            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow : hidden;
            line-height: 1.5;
        }

        &__footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__author{
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__author-photo-container{
            width: 50px;
            height: 50px;
            border-radius: 100%;
            overflow: hidden;
        }

        &__author-photo{
            object-fit: cover;
            width: 100%;
            height: 100%
        }

        &__author-name{
            color: #222222;
            font-weight: 500;
            font-size: 20px;
            line-height: 1.3;
        }

        &__date-category{
            display: flex;
            align-items: center;
            gap: 20px;
        }
        &__date,
        &__category{
            font-weight: 400;
            font-size: 18px;
            line-height: 1.27;
        }

        &__date{
            color: #222222;
        }

        &__category{
            padding: 8px 12px;
            color: #466543;
            background-color: #F0F5ED;
            border-radius: 8px;
        }

        &:hover{
            cursor: pointer;
        }


        &:hover &__image-container{
            &::after{
                opacity: 0.3;
            }
        }
    }
</style>

