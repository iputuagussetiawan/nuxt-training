<script setup lang="ts">
import { ref } from 'vue'
const selectedImage = ref<string | null>(null)
const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        const file = target.files[0]
        selectedImage.value = URL.createObjectURL(file)
    }
}
</script>

<template>
    <div class="upload">
        <span class="upload__label-text">Cover Image</span>
        <div class="upload__inner">
            <label for="file-upload" class="upload__label">
                <div v-if="!selectedImage" class="upload__placeholder">
                    <svg
                        width="80"
                        height="67"
                        viewBox="0 0 80 67"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M74.375 0.6875H5.625C4.3818 0.6875 3.18951 1.18136 2.31044 2.06044C1.43136 2.93951 0.9375 4.1318 0.9375 5.375V61.625C0.9375 62.8682 1.43136 64.0605 2.31044 64.9396C3.18951 65.8186 4.3818 66.3125 5.625 66.3125H74.375C75.6182 66.3125 76.8105 65.8186 77.6896 64.9396C78.5686 64.0605 79.0625 62.8682 79.0625 61.625V5.375C79.0625 4.1318 78.5686 2.93951 77.6896 2.06044C76.8105 1.18136 75.6182 0.6875 74.375 0.6875ZM5.625 3.8125H74.375C74.7894 3.8125 75.1868 3.97712 75.4799 4.27015C75.7729 4.56317 75.9375 4.9606 75.9375 5.375V49.2812L63.0898 36.4336C62.6544 35.9966 62.1369 35.6499 61.5671 35.4133C60.9973 35.1767 60.3865 35.0549 59.7695 35.0549C59.1526 35.0549 58.5417 35.1767 57.9719 35.4133C57.4022 35.6499 56.8847 35.9966 56.4492 36.4336L47.5312 45.3516L29.2422 27.0586C28.8067 26.6216 28.2892 26.2749 27.7195 26.0383C27.1497 25.8017 26.5388 25.6799 25.9219 25.6799C25.3049 25.6799 24.6941 25.8017 24.1243 26.0383C23.5545 26.2749 23.037 26.6216 22.6016 27.0586L4.0625 45.6094V5.375C4.0625 4.9606 4.22712 4.56317 4.52015 4.27015C4.81317 3.97712 5.2106 3.8125 5.625 3.8125ZM4.0625 61.625V50.0391L24.832 29.2695C24.9771 29.1243 25.1495 29.009 25.3392 28.9304C25.5288 28.8517 25.7322 28.8113 25.9375 28.8113C26.1428 28.8113 26.3462 28.8517 26.5358 28.9304C26.7255 29.009 26.8979 29.1243 27.043 29.2695L60.9609 63.1875H5.625C5.2106 63.1875 4.81317 63.0229 4.52015 62.7299C4.22712 62.4368 4.0625 62.0394 4.0625 61.625ZM74.375 63.1875H65.3906L49.7656 47.5625L58.6836 38.6445C58.8287 38.4993 59.001 38.384 59.1907 38.3054C59.3804 38.2267 59.5837 38.1863 59.7891 38.1863C59.9944 38.1863 60.1977 38.2267 60.3874 38.3054C60.5771 38.384 60.7494 38.4993 60.8945 38.6445L75.9375 53.6992V61.625C75.9375 62.0394 75.7729 62.4368 75.4799 62.7299C75.1868 63.0229 74.7894 63.1875 74.375 63.1875ZM47.8125 22.5625C47.8125 21.9444 47.9958 21.3402 48.3392 20.8263C48.6825 20.3124 49.1706 19.9119 49.7416 19.6754C50.3126 19.4389 50.941 19.377 51.5472 19.4975C52.1534 19.6181 52.7102 19.9158 53.1472 20.3528C53.5843 20.7898 53.8819 21.3467 54.0025 21.9528C54.123 22.559 54.0611 23.1874 53.8246 23.7584C53.5881 24.3294 53.1876 24.8175 52.6737 25.1608C52.1598 25.5042 51.5556 25.6875 50.9375 25.6875C50.1087 25.6875 49.3138 25.3583 48.7278 24.7722C48.1417 24.1862 47.8125 23.3913 47.8125 22.5625Z"
                            fill="#4B4B4B"
                        />
                    </svg>
                    <p class="upload__text">Choose image</p>
                </div>
                <div v-else class="upload__preview">
                    <img :src="selectedImage" alt="Preview" />
                </div>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    class="upload__input"
                    @change="onFileChange"
                />
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.upload {
    &__inner {
        display: flex;
        align-items: center;
    }

    &__label-text {
        display: inline-block;
        margin-bottom: 20px;
        color: #4b4b4b;
        font-size: 18px;
        font-weight: 400;

        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 18px;
            font-size: 16px;
        }
    }

    &__label {
        width: 320px;
        height: 240px;
        border: 2px dashed #d1d5db;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: #f9fafb;
        }
    }

    &__placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #6b7280;
    }

    &__icon {
        width: 40px;
        height: 40px;
        color: #9ca3af;
    }

    &__text {
        margin-top: 8px;
        font-size: 14px;
        color: #6b7280;
    }

    &__preview {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    &__input {
        display: none;
    }
}
</style>
