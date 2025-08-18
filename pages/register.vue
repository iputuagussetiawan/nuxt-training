<script setup>
    import NavBrand from '~/components/ui/NavBrand.vue';
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
                        <label for="">Name</label>
                        <input type="text" class="form-control" placeholder="Enter your name" id="name" name="name">
                    </div>
                    <div class="form-group">
                        <label for="">Email</label>
                        <input type="email" class="form-control" placeholder="Enter your email" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="">Password</label>
                        <input type="password" class="form-control" placeholder="Enter your chosen password" id="password" name="password">
                    </div>
                    <div class="form-group">
                        <label for="">Confirm Password</label>
                        <input type="password" class="form-control" placeholder="Re-enter your chosen password" id="re-password" name="re-password">
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
            justify-content: space-between;
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
            padding-left: 144px;
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
    }
</style>
