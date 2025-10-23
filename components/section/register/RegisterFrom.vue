<script lang='ts' setup>
    import { ref } from 'vue'
    import UiButton from '~/components/ui/Button.vue';
    import * as yup from 'yup'
    import { ErrorMessage, Field, Form } from 'vee-validate';
    import UiFormInput from '~/components/ui/FormInput.vue';

    const showPassword = ref(false)
    const showRePassword = ref(false)

    const form = ref({
        name: '',
        username:'',
        email: '',
        password:'', 
        password_confirmation: '',
    })

    // Define Yup validation schema
    const schema = yup.object({
        name: yup.string().required('Name is required'),
        username: yup.string().required('Username is required'),
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
        })

    const isLoading = ref(true);
    const handleSubmit =async () => {
        console.log('✅ Form submitted:', form.value)
        // isLoading.value = true;
        // try {
        //     const response = await $fetch(
        //         "https://timestory.tmdsite.my.id/api/register",
        //         {
        //             method: "POST",
        //             body: form.value
        //         }
        //     );
        //     console.error("Success Register:", response);
        // } catch (error) {
        //     console.error("Error Register:", error);
        // } finally {
        //     isLoading.value = false;
        // }
    }
</script>
<template>
    <div class="register-form">
        <h2 class="register-form__title">Create Account</h2>
        <Form :validation-schema="schema" @submit.prevent="handleSubmit" class="register-form__form" >
            <UiFormInput name="name" label="Full Name" placeholder="Enter your name" />
            <UiFormInput name="username" label="User Name" placeholder="User Name" />
            <UiFormInput name="email" label="Email" type="email"  placeholder="Enter your email" />
            <UiFormInput name="password" label="Password" type="password" placeholder="Enter your password" />
            <UiFormInput name="password" label="Confirm Password" type="password" placeholder="Re-enter your chosen password" />
            <div class="register-form__action">
                <UiButton type="submit" class="register-form__button">Create Account</UiButton>
                <div class="register-form__text">
                    Already have an account? <NuxtLink to="/login" class="register-form__link">Login</NuxtLink>
                </div>
            </div>
        </Form>
    </div>
</template>
<style lang='scss' scoped>
    .register-form{
        &__title{
            margin-bottom: 50px;
            color: #222222;
            font-weight: 700;
            font-size: 44px;
            line-height: 1.318;
            @media only screen and (max-width: 1199.98px) {
                margin-bottom: 42px;
                font-size: 37px;
            }

            @media only screen and (max-width: 991.98px) {
                margin-bottom: 32px;
                font-size: 32px;
            }
            @media only screen and (max-width: 767.98px) {
                font-size: 27px;
            }
        }

        &__action{
            margin-top: 154px;
            @media only screen and (max-width: 1199.98px) {
                margin-top: 120px;
            }

            @media only screen and (max-width: 991.98px) {
                margin-top: 80px;
            }
            @media only screen and (max-width: 767.98px) {
                display: grid;
                margin-top: 64px;
            }
        }
        &__text{
            margin-top: 42px;
            color: #222222;
            font-size: 18px;
            font-weight: 400;
            @media only screen and (max-width: 1199.98px) {
                margin-top: 32px;
            }

            @media only screen and (max-width: 991.98px) {
                margin-top: 24px;
                font-size: 16px;
            }
            @media only screen and (max-width: 767.98px) {
                margin-top: 18px;
            }
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