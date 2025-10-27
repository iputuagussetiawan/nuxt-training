<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import UiButton from '~/components/ui/Button.vue'
import * as yup from 'yup'
import { Form } from 'vee-validate'
import UiFormInput from '~/components/ui/FormInput.vue'
import { useRouter } from 'vue-router'
import UiProfileUpload from '../ui/ProfileUpload.vue'
import { useAuthStore } from '#imports'

const authStore = useAuthStore()
const errorMessage = ref<string>('')
const router = useRouter()

const userName = computed(() => authStore.user?.name || 'User')
const userUsername = computed(() => authStore.user?.username || 'username')
const userEmail = computed(() => authStore.user?.email || 'yourmail@gmail.com')
const userAbout = computed(() => authStore.user?.about || '')
const userImage = computed(
    () =>
        authStore.user?.profile_image ||
        'https://avatars.githubusercontent.com/u/583231?v=4'
)

// ✅ Initial form values (for vee-validate)
const initialValues = ref({
    name: userName.value,
    username: userUsername.value,
    email: userEmail.value,
    about: userAbout.value,
    old_password: '',
    new_password: '',
    confirm_password: ''
})

// ✅ Optional — watch store updates (reactive updates to form)
watch(
    () => authStore.user,
    (user) => {
        if (user) {
            initialValues.value = {
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                about: user.about || '',
                old_password: '',
                new_password: '',
                confirm_password: ''
            }
        }
    },
    { immediate: true, deep: true }
)

// ✅ Yup validation schema for register form
const profileFormSchema = yup.object({
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

const isLoading = ref(false)

const handleSubmit = async (values: any) => {
    errorMessage.value = ''
    isLoading.value = true
    try {
        const response = await $fetch(
            'https://timestory.tmdsite.my.id/api/register',
            {
                method: 'POST',
                body: values
            }
        )
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
    <div class="profile-form">
        <h2 class="profile-form__title">Edit Profile</h2>
        <Form
            :initial-values="initialValues"
            :validation-schema="profileFormSchema"
            @submit="handleSubmit"
            class="profile-form__form"
        >
            <div class="profile-form__inner">
                <div class="profile-form__left">
                    <UiProfileUpload
                        defaultImage="https://avatars.githubusercontent.com/u/583231?v=4"
                    />
                    <UiFormInput
                        name="name"
                        label="Full Name"
                        placeholder="Enter your name"
                    />
                    <UiFormInput
                        name="username"
                        label="User Name"
                        placeholder="User Name"
                        :readonly="true"
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

                    <!-- ✅ Error message display -->
                    <div v-if="errorMessage" class="profile-form__error">
                        {{ errorMessage }}
                    </div>
                    <div class="profile-form__action">
                        <UiButton
                            type="button"
                            class="profile-form__button"
                            variant="primary-outline"
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
        </Form>
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
