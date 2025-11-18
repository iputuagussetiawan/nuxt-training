<script setup lang="ts">
// 1. Imports
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuthStore, useNuxtApp } from '#imports'
import type { IUserUpdateProfile } from '~/types/user'
import UiButton from '~/components/ui/Button.vue'
import * as yup from 'yup'
import UiFormInput from '~/components/ui/FormInput.vue'
import UiProfileUpload from '../ui/ProfileUpload.vue'

// 2. Variable Declarations
const { $api } = useNuxtApp()
const router = useRouter()
const authStore = useAuthStore()
const emit = defineEmits(['close-dialog'])

const isLoading = ref(false)
const errorMessage = ref<string>('')

const userName = computed(() => authStore.user?.name || 'User')
const userEmail = computed(() => authStore.user?.email || 'yourmail@gmail.com')
const userAbout = computed(() => authStore.user?.about || '')

const initialValues = ref({
    name: userName.value,
    email: userEmail.value,
    about: userAbout.value
})

// ✅ Yup validation schema for register form
const profileFormSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .max(50, 'Maximum 50 characters allowed'),
    about: yup.string().max(300, 'Maximum 300 characters allowed')
})

// 3. Methods/Functions
const handleSubmit = async (values: IUserUpdateProfile) => {
    errorMessage.value = ''
    try {
        isLoading.value = true
        const response = await $api.user.updateProfile({
            body: values
        })
        authStore.getUserProfile()
        console.log('✅ Success Update Profile:', response)
        // router.push({ name: '/' })
    } catch (error: any) {
        console.error('❌ Error Update Profile:', error)
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

const cancelEdit = () => {
    emit('close-dialog')
}

// 4. Events
watch(
    () => authStore.user,
    (user) => {
        if (user) {
            initialValues.value = {
                name: user.name || '',
                email: user.email || '',
                about: user.about || ''
            }
        }
    },
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="profile-form">
        <h2 class="profile-form__title">Edit Profile</h2>

        <div class="profile-form__inner">
            <div class="profile-form__left">
                <Form
                    :initial-values="initialValues"
                    :validation-schema="profileFormSchema"
                    :enable-reinitialize="true"
                    @submit="
                        handleSubmit as (values: IUserUpdateProfile) => void
                    "
                    class="profile-form__form"
                >
                    <UiProfileUpload
                        defaultImage="https://avatars.githubusercontent.com/u/583231?v=4"
                    />
                    <UiFormInput
                        name="name"
                        label="Full Name"
                        placeholder="Enter your name"
                    />
                    <UiFormInput
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        :readonly="true"
                    />
                    <UiFormInput
                        name="about"
                        label="About Me"
                        type="textarea"
                        placeholder="Enter your profile description"
                    />
                    <div v-if="errorMessage" class="profile-form__error">
                        {{ errorMessage }}
                    </div>
                    <div class="profile-form__action">
                        <UiButton
                            type="button"
                            class="profile-form__button"
                            variant="primary-outline"
                            @click="cancelEdit"
                        >
                            <span>Cancel</span>
                        </UiButton>
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
                                <span>Update Profile...</span>
                            </template>
                            <template v-else>
                                <span>Update Profile</span>
                            </template>
                        </UiButton>
                    </div>
                </Form>
            </div>
            <div class="profile-form__right">
                <UiFormInput
                    name="old_password"
                    label="Old Password"
                    placeholder="Enter your old password"
                />
                <UiFormInput
                    name="new_password"
                    label="New Password"
                    placeholder="Enter your new password"
                />
                <UiFormInput
                    name="confirm_password"
                    label="Confirm New Password"
                    placeholder="Re-enter your new password"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile-form {
    position: relative;
    height: 100%;
    overflow: auto;

    &__inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding-bottom: 8px;
    }

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

    &__action {
        display: flex;
        gap: 44px;
    }
}
</style>
