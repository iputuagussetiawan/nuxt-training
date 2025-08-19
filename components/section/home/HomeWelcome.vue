<script setup lang="ts">
    //import '~/assets/scss/components/sections/home/HomeWelcome.scss';
</script>

<template>
    <section class="welcome">
        <div class="container">
            <div class="welcome__inner">
                <h1 class="welcome__title">Welcome to Storytime</h1>
                <div class="welcome__description">
                    The world's most-loved social storytelling platform. Story time connects a global community of 90 million readers and writers through the power of story.
                </div>
                <div class="welcome__search-container">
                    <input class="welcome__search-input" type="search" placeholder="Search story" name="search-story" id="search-story" />
                    <svg class="welcome__search-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.25 21.25L26.25 26.25M3.75 13.75C3.75 16.4022 4.80357 18.9457 6.67893 20.8211C8.5543 22.6964 11.0978 23.75 13.75 23.75C16.4022 23.75 18.9457 22.6964 20.8211 20.8211C22.6964 18.9457 23.75 16.4022 23.75 13.75C23.75 11.0978 22.6964 8.5543 20.8211 6.67893C18.9457 4.80357 16.4022 3.75 13.75 3.75C11.0978 3.75 8.5543 4.80357 6.67893 6.67893C4.80357 8.5543 3.75 11.0978 3.75 13.75Z" stroke="#4B4B4B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="welcome__image-container">
                    <img src="~/assets/images/home/welcome/welcome-image.png" alt="welcome image" class="welcome__image">
                </div>
            </div>
        </div>
    </section> 
</template>

<style scoped lang="scss">
    .welcome{
        position: relative;
        padding: 70px 0 80px 0;
        &__inner{
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            max-width: 1412px;
            @media only screen and (max-width: 991.98px) {
                max-width: 100%;
            }
        }
        &__title{
            margin: 0px;
            font-family: $secondary-font;
            font-weight: 700;
            font-size: 60px;
            line-height: 1.2;
            color: #000000;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        }

        &__description{
            font-size: 24px;
            line-height: 1.33;
            margin-top: 30px;
            color: #4B4B4B;
        }

        &__search-container{
            margin-top: 40px;
            position: relative;
        }

        &__search-input{
            width: 100%;
            height: 80px;
            border: 2px solid #CCCCCC;
            border-radius: 8px;
            padding-left: 60px;
            padding: 24px 60px 24px 30px;
            transition: 0.4s ease;

            font-size: 24px;
            font-weight: 400;
            line-height: 1.33;

            &:focus{
                outline: none;
                border-color: $primary-color;
            }

            &::placeholder{
                color: #4B4B4B;
            }
        }

        &__search-icon{
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
        }

        &__image-container{
            margin-top: 40px;
            max-width: 802px;
            margin-left: auto;
            margin-right: auto;
        }

        &__image{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
</style>

