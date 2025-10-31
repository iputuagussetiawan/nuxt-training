<script setup lang="ts">
// 1. Imports
import { computed, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import Button from './Button.vue'
import UiProfileForm from '../section/ProfileForm.vue'
import DialogConfirmation from './DialogConfirmation.vue'
import { useCookie, useNuxtApp } from '#imports'

// 2. Variable Declarations
const { $api } = useNuxtApp()
const authStore = useAuthStore()
const isOpenDialogProfile = ref(false)
const isOpenDialogLogout = ref(false)
const isLoadingLogout = ref(false)
const isLoggedIn = computed(() => !!authStore.token)
const userName = computed(() => authStore.user?.name || 'User')
const userImage = computed(
    () =>
        authStore.user?.profile_image ||
        'https://avatars.githubusercontent.com/u/583231?v=4'
)

// 3. Methods/Functions
const handleLogout = async () => {
    try {
        const response = await $api.auth.logout()
        console.log('✅ Success Logout:', response)
        isLoadingLogout.value = true
        authStore.logout()
    } catch (error) {
        console.error('Error logging out:', error)
    } finally {
        isLoadingLogout.value = false
        isOpenDialogLogout.value = false
    }
}
const getProfile = () => {
    isOpenDialogProfile.value = true
}
</script>

<template>
    <div>
        <div v-if="isLoggedIn" class="button-profile">
            <div class="button-profile__trigger">
                <div class="button-profile__image-container">
                    <img
                        :src="userImage"
                        alt="Profile image"
                        class="button-profile__image"
                    />
                </div>

                <div class="button-profile__info-container">
                    <p class="button-profile__name">{{ userName }}</p>
                </div>

                <svg
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.7625 0L7.5 4.9725L13.2375 0L15 1.53833L7.5 8.03833L0 1.53833L1.7625 0Z"
                        fill="#222222"
                    />
                </svg>
            </div>

            <ul class="button-profile__dropdown">
                <li>
                    <button
                        @click="getProfile"
                        class="button-profile__dropdown-link"
                    >
                        My Profile
                    </button>
                </li>
                <li>
                    <button
                        @click="isOpenDialogLogout = true"
                        class="button-profile__dropdown-link"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>

        <!-- ✅ Logged Out State -->
        <div v-else class="button-profile-action">
            <Button type="link" href="/register" variant="primary-outline">
                Register
            </Button>
            <Button type="link" href="/login" variant="primary"> Login </Button>
        </div>

        <UiDialog v-model="isOpenDialogProfile">
            <UiProfileForm />
        </UiDialog>

        <DialogConfirmation
            v-model="isOpenDialogLogout"
            title="Logout"
            message="Are you sure want to logout?"
            buttonText="Logout"
            :isLoading="isLoadingLogout"
            @confirm="handleLogout"
        />
    </div>
</template>

<style scoped lang="scss">
.button-profile {
    position: relative;
    z-index: 1000;
    display: inline-block;

    &__trigger {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    &__image-container {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        overflow: hidden;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__name {
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.5;
        color: #222;
    }

    &__dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: #fff;
        border-radius: 0 0 10px 10px;
        list-style: none;
        margin: 0;
        padding: 0;
        min-width: 185px;
        box-shadow: 0 6px 5px -9px rgba(0, 0, 0, 0.72);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }

    &:hover .button-profile__dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    &__dropdown-link {
        display: block;
        padding: 15px 20px;
        font-size: 1rem;
        font-weight: 500;
        color: #222;
        text-align: left;
        width: 100%;
        background: transparent;
        border: none;
        cursor: pointer;
        text-decoration: none;
        transition: background 0.3s ease;

        &:hover {
            background-color: #f0f5ed;
        }
    }
}

.button-profile-action {
    display: flex;
    align-items: center;
    gap: 30px;
}
</style>
