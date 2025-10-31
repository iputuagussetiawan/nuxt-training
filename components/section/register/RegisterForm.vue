<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import UiButton from '~/components/ui/Button.vue'
import * as yup from 'yup'
import { Form } from 'vee-validate'
import UiFormInput from '~/components/ui/FormInput.vue'
import { useRouter } from 'vue-router'
import type { IRegister } from '~/types/auth'
import { useNuxtApp } from '#imports'

const errorMessage = ref<string>('')
const router = useRouter()

// ✅ Yup validation schema for register form
const registerFormSchema = yup.object({
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
        .required('Please confirm your password')
})

const { $api } = useNuxtApp()
const isLoading = ref(false)

const handleSubmit = async (values: IRegister) => {
    errorMessage.value = ''
    isLoading.value = true
    try {
        const response = await $api.auth.register({
            body: values
        })
        console.log('✅ Success Register:', response)
        router.push({ name: 'login' })
    } catch (error: any) {
        console.error('❌ Error Register:', error)
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
        isLoading.value = false
    }
}
</script>

<template>
    <div class="register-form">
        <h2 class="register-form__title">Create Account</h2>
        <Form
            :validation-schema="registerFormSchema"
            @submit="handleSubmit as (values: IRegister) => void"
            class="register-form__form"
        >
            <UiFormInput
                name="name"
                label="Full Name"
                placeholder="Enter your name"
            />
            <UiFormInput
                name="username"
                label="User Name"
                placeholder="User Name"
            />
            <UiFormInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <UiFormInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />
            <UiFormInput
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your chosen password"
            />

            <div class="register-form__action">
                <!-- ✅ Error message display -->
                <div v-if="errorMessage" class="register-form__error">
                    {{ errorMessage }}
                </div>
                <UiButton
                    type="submit"
                    class="register-form__button"
                    :disabled="isLoading"
                >
                    <template v-if="isLoading">
                        <Icon
                            icon="lucide:loader-2"
                            class="animate-custom-spin"
                        />
                        <span>Creating Account...</span>
                    </template>
                    <template v-else>
                        <span>Create Account</span>
                    </template>
                </UiButton>

                <div class="register-form__text">
                    Already have an account?
                    <NuxtLink to="/login" class="register-form__link">
                        Login
                    </NuxtLink>
                </div>
            </div>
        </Form>
    </div>
</template>

<style lang="scss" scoped>
.register-form {
    &__title {
        margin-bottom: 50px;
        color: #222222;
        font-weight: 700;
        font-size: 44px;
        line-height: 1.318;
    }

    &__action {
        margin-top: 80px;
    }

    &__text {
        margin-top: 24px;
        color: #222222;
        font-size: 16px;
        font-weight: 400;
    }

    &__link {
        color: $color-primary;
        text-decoration: none;
        font-weight: 700;
        &:hover {
            color: $color-primary-hover;
        }
    }

    &__error {
        padding: 10px 16px;
        background-color: rgb(236, 65, 65);
        color: #fff;
        font-size: 20px;
        border-radius: 5px;
        margin-bottom: 32px;
    }

    &__button {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}
</style>
