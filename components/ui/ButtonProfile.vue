<script setup lang="ts">
import Button from './Button.vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

function handleLogout() {
    console.log('Login')
}
</script>

<template>
    <div>
        <div v-if="authStore.token" class="button-profile">
            <div class="button-profile__trigger">
                <div class="button-profile__image-container">
                    <img
                        src="https://avatars.githubusercontent.com/u/583231?v=4"
                        alt="Default profile image"
                        class="button-profile__image"
                    />
                </div>
                <div class="button-profile__info-container">
                    <p class="button-profile__name">Iswara</p>
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
                <li class="button-profile__dropdown-item">
                    <NuxtLink class="button-profile__dropdown-link"
                        >My Profile</NuxtLink
                    >
                </li>
                <li class="button-profile__dropdown-item">
                    <button class="button-profile__dropdown-link">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
        <div v-if="!authStore.token" class="button-profile-action">
            <Button type="link" href="/register" variant="primary-outline"
                >Register</Button
            >
            <Button type="link" href="/login" variant="primary">Login</Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.button-profile {
    position: relative;

    &:hover {
        cursor: pointer;
    }

    &:hover &__dropdown {
        opacity: 1;
    }

    &__trigger {
        gap: 10px;
        display: flex;
        align-items: center;
    }

    &__name {
        font-weight: 700;
        font-size: 24px;
        line-height: 1.5;
        color: #222222;
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

    &__dropdown {
        min-width: 185px;
        margin: 0px;
        padding: 0px;
        position: absolute;
        right: 0px;
        top: 100%;
        background-color: #fff;
        list-style: none;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 0px 6px 5px -9px rgba(0, 0, 0, 0.72);
        overflow: hidden;
        opacity: 0;
        transition: 0.4s ease;
    }

    &__dropdown-item {
        button {
            outline: none;
            box-shadow: none;
            background-color: transparent;
            border: none;
            padding: 0px;
            cursor: pointer;
            display: inline-block;
            padding: 15px 20px;
            font-size: 20px;
            font-weight: 500;
            color: #222222;
            text-align: left;
        }
    }
    &__dropdown-link {
        display: inline-block;
        padding: 15px 20px;
        font-size: 20px;
        font-weight: 500;
        color: #222222;
        width: 100%;
        transition: 0.4s ease;

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
