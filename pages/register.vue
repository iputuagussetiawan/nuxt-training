<script setup>
    import NavBrand from '~/components/ui/NavBrand.vue';
    import '~/assets/scss/components/ui/Input.scss';
    import '~/assets/scss/components/ui/Label.scss';
    import Button from '~/components/ui/Button.vue';
    import { ref } from 'vue'
    const showPassword = ref(false)
    const showRePassword = ref(false)

    definePageMeta({
        layout: 'simple',
    })
    useSeoMeta({
        title: 'Register',
        ogTitle: 'Register',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    })
</script>

<template>
    <section class="register">
        <div class="register__inner">
            <div class="register__info-container">
                <NavBrand/>
                <div class="register__info">
                    <h1 class="register__title">
                        Join the World’s Most-Loved Social Storytelling Platform!
                    </h1>
                    <div class="register__description">
                        Create an account to explore interesting articles, connect with like-minded people, and share your own stories. 
                    </div>
                    <div class="register__image-container">
                        <NuxtImg
                            src="/images/register/register-image.png"
                            width="790"
                            height="585"
                            class="register__image"
                            alt="Register Image"
                            loading="lazy"
                            aspectRatio="790:585"
                        />
                    </div>
                </div>
            </div>
            <div class="register__form-container">
                <h2 class="register__form-title">Create Account</h2>
                <form class="register__form">
                    <div class="form-group">
                        <label class="form-label" for="">Name</label>
                        <input type="text" class="form-control" placeholder="Enter your name" id="name" name="name">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">Email</label>
                        <input type="email" class="form-control" placeholder="Enter your email" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">Password</label>
                        <div class="form-control-wrapper">
                            <input 
                                :type="showPassword ? 'text' : 'password'"
                                class="form-control" 
                                placeholder="Enter your chosen password" 
                                id="password" 
                                name="password">
                            <svg  @click="showPassword = !showPassword" class="form-control__icon" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.7671 15.2152C28.7273 15.1238 27.7523 12.9617 25.575 10.7844C23.5546 8.76641 20.0835 6.35938 15 6.35938C9.91636 6.35938 6.44526 8.76641 4.42495 10.7844C2.24761 12.9617 1.27261 15.1203 1.23276 15.2152C1.1927 15.3052 1.172 15.4027 1.172 15.5012C1.172 15.5997 1.1927 15.6971 1.23276 15.7871C1.27261 15.8773 2.24761 18.0395 4.42495 20.2168C6.44526 22.2348 9.91636 24.6406 15 24.6406C20.0835 24.6406 23.5546 22.2348 25.575 20.2168C27.7523 18.0395 28.7273 15.8809 28.7671 15.7871C28.8072 15.6971 28.8279 15.5997 28.8279 15.5012C28.8279 15.4027 28.8072 15.3052 28.7671 15.2152ZM15 23.2344C11.3226 23.2344 8.11167 21.8961 5.45503 19.2582C4.34141 18.1514 3.39902 16.8847 2.65894 15.5C3.39882 14.1155 4.34124 12.8492 5.45503 11.743C8.11167 9.10391 11.3226 7.76562 15 7.76562C18.6773 7.76562 21.8882 9.10391 24.5449 11.743C25.6587 12.8492 26.6011 14.1155 27.341 15.5C26.5945 16.9309 22.8515 23.2344 15 23.2344ZM15 10.1094C13.9338 10.1094 12.8916 10.4255 12.0051 11.0179C11.1186 11.6102 10.4277 12.4521 10.0197 13.4371C9.61166 14.4221 9.50491 15.506 9.71291 16.5517C9.9209 17.5973 10.4343 18.5579 11.1882 19.3117C11.9421 20.0656 12.9026 20.579 13.9483 20.787C14.994 20.995 16.0778 20.8883 17.0629 20.4803C18.0479 20.0723 18.8898 19.3814 19.4821 18.4949C20.0744 17.6084 20.3906 16.5662 20.3906 15.5C20.3887 14.0709 19.8202 12.7008 18.8096 11.6903C17.7991 10.6798 16.4291 10.1112 15 10.1094ZM15 19.4844C14.2119 19.4844 13.4416 19.2507 12.7864 18.8129C12.1311 18.3751 11.6204 17.7528 11.3189 17.0248C11.0173 16.2967 10.9384 15.4956 11.0921 14.7227C11.2459 13.9498 11.6253 13.2398 12.1826 12.6826C12.7398 12.1254 13.4497 11.7459 14.2226 11.5922C14.9955 11.4384 15.7967 11.5173 16.5247 11.8189C17.2528 12.1205 17.875 12.6312 18.3128 13.2864C18.7506 13.9416 18.9843 14.712 18.9843 15.5C18.9843 16.5567 18.5645 17.5702 17.8173 18.3174C17.0701 19.0646 16.0567 19.4844 15 19.4844Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="">Confirm Password</label>
                        <div class="form-control-wrapper">
                            <input 
                                :type="showRePassword ? 'text' : 'password'"
                                class="form-control" 
                                placeholder="Re-enter your chosen password" 
                                id="re-password" 
                                name="re-password">
                            <svg  @click="showRePassword = !showRePassword" class="form-control__icon" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.7671 15.2152C28.7273 15.1238 27.7523 12.9617 25.575 10.7844C23.5546 8.76641 20.0835 6.35938 15 6.35938C9.91636 6.35938 6.44526 8.76641 4.42495 10.7844C2.24761 12.9617 1.27261 15.1203 1.23276 15.2152C1.1927 15.3052 1.172 15.4027 1.172 15.5012C1.172 15.5997 1.1927 15.6971 1.23276 15.7871C1.27261 15.8773 2.24761 18.0395 4.42495 20.2168C6.44526 22.2348 9.91636 24.6406 15 24.6406C20.0835 24.6406 23.5546 22.2348 25.575 20.2168C27.7523 18.0395 28.7273 15.8809 28.7671 15.7871C28.8072 15.6971 28.8279 15.5997 28.8279 15.5012C28.8279 15.4027 28.8072 15.3052 28.7671 15.2152ZM15 23.2344C11.3226 23.2344 8.11167 21.8961 5.45503 19.2582C4.34141 18.1514 3.39902 16.8847 2.65894 15.5C3.39882 14.1155 4.34124 12.8492 5.45503 11.743C8.11167 9.10391 11.3226 7.76562 15 7.76562C18.6773 7.76562 21.8882 9.10391 24.5449 11.743C25.6587 12.8492 26.6011 14.1155 27.341 15.5C26.5945 16.9309 22.8515 23.2344 15 23.2344ZM15 10.1094C13.9338 10.1094 12.8916 10.4255 12.0051 11.0179C11.1186 11.6102 10.4277 12.4521 10.0197 13.4371C9.61166 14.4221 9.50491 15.506 9.71291 16.5517C9.9209 17.5973 10.4343 18.5579 11.1882 19.3117C11.9421 20.0656 12.9026 20.579 13.9483 20.787C14.994 20.995 16.0778 20.8883 17.0629 20.4803C18.0479 20.0723 18.8898 19.3814 19.4821 18.4949C20.0744 17.6084 20.3906 16.5662 20.3906 15.5C20.3887 14.0709 19.8202 12.7008 18.8096 11.6903C17.7991 10.6798 16.4291 10.1112 15 10.1094ZM15 19.4844C14.2119 19.4844 13.4416 19.2507 12.7864 18.8129C12.1311 18.3751 11.6204 17.7528 11.3189 17.0248C11.0173 16.2967 10.9384 15.4956 11.0921 14.7227C11.2459 13.9498 11.6253 13.2398 12.1826 12.6826C12.7398 12.1254 13.4497 11.7459 14.2226 11.5922C14.9955 11.4384 15.7967 11.5173 16.5247 11.8189C17.2528 12.1205 17.875 12.6312 18.3128 13.2864C18.7506 13.9416 18.9843 14.712 18.9843 15.5C18.9843 16.5567 18.5645 17.5702 17.8173 18.3174C17.0701 19.0646 16.0567 19.4844 15 19.4844Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>

                    <div class="register__action">
                        <Button type="submit" class="register__button">Create Account</Button>
                        <div class="register__text">
                            Already have an account? <NuxtLink to="/login" class="register__link">Login</NuxtLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .register{
        position: relative;
        padding: 20px;
        &__inner{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        &__info-container{
            width: 50%;
            padding: 30px 63px;
            background-color: #F0F5ED;
            border-radius: 8px;

            @media only screen and (max-width: 1399.98px) {
                padding: 28px 50px;
            }

            @media only screen and (max-width: 991.98px) {
                padding: 20px 42px;
            }

            @media only screen and (max-width: 767.98px) {
                padding: 16px 24px;
            }
        }
        &__form-container{
            width: 50%;
            margin-left: 144px;
            max-width: 577px;

            @media only screen and (max-width: 991.98px) {
                max-width: 100%;
            }
        }

        &__title{
            margin-top: 70px;
            margin-bottom: 40px;
            font-family: $font-secondary;
            font-weight: 700;
            font-size: 60px;
            line-height: 1.233;
            color: #222222;

            @media only screen and (max-width: 1399.98px) {
                font-size: 50px;
            }

            @media only screen and (max-width: 1199.98px) {
                font-size: 42px;
            }
        }

        &__description{
            margin-bottom: 32px;
            color: #4B4B4B;
            font-weight: 400;
            font-size: 28px;
            line-height: 1.357;
        }

        &__image{
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        &__form-title{
            margin-bottom: 50px;
            color: #222222;
            font-weight: 700;
            font-size: 44px;
            line-height: 1.318;
        }

        &__action{
            margin-top: 154px
        }


        &__text{
            margin-top: 42px;
            color: #222222;
            font-size: 18px;
            font-weight: 400;
        }

        &__link{
            color: $color-primary;
            text-decoration: none;
            font-weight: 700;
            transition: 0.4s ease;
            &:hover{
                color: $color-primary-hover;
            }
        }
    }
</style>
