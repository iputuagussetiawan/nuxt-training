<script setup lang="ts">
import { useAuthStore, useCookie, useNuxtApp } from '#imports'
import { ref } from 'vue'

// Props (optional default image)
interface Props {
    defaultImage?: string
}

const { $api } = useNuxtApp()
const props = defineProps<Props>()
const authStore = useAuthStore()

const currentProfileImage = authStore.user?.profile_image

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const profileUploadError = ref<string | null>(null)

if (currentProfileImage) {
    previewUrl.value = currentProfileImage
}

const openFilePicker = () => {
    fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            previewUrl.value = e.target?.result as string
        }
        reader.readAsDataURL(file)
        try {
            const formData = new FormData()
            formData.append('profile_image', file)
            const response = await $api.user.uploadUserProfileImage({
                body: formData
            })
            await authStore.getUserProfile()
        } catch (error: any) {
            console.error('❌ Error Upload Image:', error)
            profileUploadError.value = error.message
        } finally {
            // isLoading.value = false
            console.log('finish')
        }
    }
}
</script>
<template>
    <div class="profile-upload" :class="{ error: profileUploadError }">
        <div class="profile-upload__inner">
            <!-- Profile image preview -->
            <div class="profile-upload__image-container">
                <img
                    class="profile-upload__image"
                    :src="previewUrl || defaultImage"
                    alt="Profile Picture"
                />
            </div>

            <!-- Hidden file input -->
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="profile-upload__input"
                @change="handleFileChange"
            />

            <!-- Button -->
            <button
                type="button"
                class="profile-upload__button"
                @click="openFilePicker"
            >
                Change Picture
            </button>
        </div>
        <div v-if="profileUploadError" class="profile-upload__error">
            {{ profileUploadError }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.profile-upload {
    margin-bottom: 24px;

    .error &__image-container {
        border: 2px dashed red;
        &::before {
            content: 'Image Error';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 12px;
            width: 100%;
            text-align: center;
            z-index: 2;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: red;
            opacity: 0.5;
            font-size: 12px;
            width: 100%;
            text-align: center;
        }
    }

    &__inner {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &__image-container {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__input {
        display: none;
    }

    &__button {
        background: transparent;
        color: #2b5e33;
        border: 2px solid #2b5e33;
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            background-color: #2b5e33;
            color: #fff;
            cursor: pointer;
        }
    }

    &__error {
        display: inline-block;
        background-color: #e63946;
        padding: 10px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        margin-top: 10px;
    }
}
</style>
