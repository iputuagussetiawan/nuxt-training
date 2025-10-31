<script lang="ts" setup>
// 1. Imports
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { Icon } from '@iconify/vue'
import { useNuxtApp } from '#imports'
import * as yup from 'yup'
import type { ILogin } from '~/types/auth'
import UiButton from '~/components/ui/Button.vue'
import UiFormInput from '~/components/ui/FormInput.vue'

// 2. Variable Declarations
const { $api } = useNuxtApp()
const router = useRouter()
const isLoading = ref(false)
const authStore = useAuthStore()
const errorMessage = ref<string>('')
const LoginValidationSchema = yup.object({
    username_or_email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

// 3. Methods/Functions
const handleLogin = async (values: ILogin) => {
    errorMessage.value = ''
    isLoading.value = true
    try {
        const response = await $api.auth.login({
            body: values
        })
        // ✅ Save token securely using Nuxt useCookie() using pinia
        authStore.setToken(response.data.token)
        authStore.setUserProfile(response.data.user)
        router.push({ name: 'dashboard' })
    } catch (error: any) {
        console.error('❌ Error Login:', error)
        // ✅ Handle different error types safely
        if (error?.data?.message) {
            errorMessage.value = error.data.message
        } else if (error?.message) {
            errorMessage.value = error.message
        } else {
            errorMessage.value =
                'An unexpected error occurred. Please try again.'
        }
    } finally {
        isLoading.value = true
    }
}
</script>
<template>
    <div class="login-form">
        <Form
            :validation-schema="LoginValidationSchema"
            @submit="handleLogin as (values: ILogin) => void"
            class="login-form__form"
        >
            <UiFormInput
                name="username_or_email"
                label="Username / Email"
                placeholder="Enter your email"
            />
            <UiFormInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />
            <!-- ✅ Error message display -->
            <div v-if="errorMessage" class="login-form__error">
                {{ errorMessage }}
            </div>
            <div class="login-form__action">
                <UiButton
                    type="submit"
                    class="login-form__button"
                    :disabled="isLoading"
                >
                    <template v-if="isLoading">
                        <Icon
                            icon="lucide:loader-2"
                            class="animate-custom-spin"
                        />
                        <span>Login...</span>
                    </template>
                    <template v-else>
                        <span>Login</span>
                    </template>
                </UiButton>
                <div class="login-form__text">
                    Don’t have an account?
                    <NuxtLink to="/register" class="login-form__link">
                        register
                    </NuxtLink>
                </div>
            </div>
        </Form>
    </div>
</template>
<style lang="scss" scoped>
.login-form {
    &__action {
        margin-top: 23px;
        @media only screen and (max-width: 767.98px) {
            display: grid;
        }
    }

    &__text {
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

    &__link {
        color: $color-primary;
        text-decoration: none;
        font-weight: 700;
        transition: 0.4s ease;
        &:hover {
            color: $color-primary-hover;
        }
    }

    &__button {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__error {
        padding: 10px 16px;
        background-color: rgb(236, 65, 65);
        color: #fff;
        font-size: 20px;
        border-radius: 5px;
        margin-bottom: 32px;
    }
}
</style>
