<script setup lang="ts">
import { useAuthStore, useCookie } from '#imports'
import { ref } from 'vue'

// Props (optional default image)
interface Props {
    defaultImage?: string
}

const props = defineProps<Props>()
const authStore = useAuthStore()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)

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
            const response = await $fetch(
                'https://timestory.tmdsite.my.id/api/user/upload-profile-image',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${useCookie('auth_token').value}`
                    }
                }
            )

            await authStore.getUserProfile()

            console.log('✅ Success Register:', response)
        } catch (error: any) {
            console.error('❌ Error Register:', error)
        } finally {
            // isLoading.value = false
            console.log('finish')
        }
    }
}
</script>
<template>
    <div class="profile-upload">
        <!-- Profile image preview -->
        <div class="profile-image">
            <img :src="previewUrl || defaultImage" alt="Profile Picture" />
        </div>

        <!-- Hidden file input -->
        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="handleFileChange"
        />

        <!-- Button -->
        <button type="button" class="change-btn" @click="openFilePicker">
            Change Picture
        </button>
    </div>
</template>

<style scoped lang="scss">
.profile-upload {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Circle image */
.profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

/* Hidden input field */
.hidden-input {
    display: none;
}

/* Button styling */
.change-btn {
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
</style>
