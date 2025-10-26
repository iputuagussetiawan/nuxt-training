<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot
} from 'reka-ui'
import UiButton from '~/components/ui/Button.vue'
import { Icon } from '@iconify/vue'

interface IProps {
    modelValue: boolean
    title: string
    message: string
    buttonText: string
    isLoading?: boolean
}

const props = defineProps<IProps>()
const emit = defineEmits([
    'update:modelValue',
    'confirm', // ✅ external OK trigger
    'cancel' // ✅ optional cancel trigger
])

const onUpdate = (value: boolean) => {
    emit('update:modelValue', value)
}

const handleOk = () => {
    emit('confirm') // ✅ trigger external function
}

const handleCancel = () => {
    emit('cancel') // optional
    emit('update:modelValue', false)
}
</script>

<template>
    <DialogRoot
        class="dialog-confirmation"
        :open="modelValue"
        @update:open="onUpdate"
    >
        <DialogPortal>
            <DialogOverlay class="dialog-confirmation__overlay" />
            <DialogContent class="dialog-confirmation__content">
                <!-- ❌ Close Button -->
                <DialogClose
                    class="dialog-confirmation__close-button"
                    aria-label="Close"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.5 7.5L7.5 22.5"
                            stroke="#4B4B4B"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.5 7.5L22.5 22.5"
                            stroke="#4B4B4B"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </DialogClose>

                <div class="dialog-confirmation__info-container">
                    <h3 class="dialog-confirmation__title">{{ title }}</h3>
                    <div class="dialog-confirmation__description">
                        {{ message }}
                    </div>
                </div>

                <!-- ✅ Action Buttons -->
                <div class="dialog-confirmation__action">
                    <UiButton
                        type="button"
                        class="dialog-confirmation__button"
                        variant="primary-outline"
                        @click="handleCancel"
                    >
                        <span>Cancel</span>
                    </UiButton>

                    <UiButton
                        type="button"
                        class="dialog-confirmation__button"
                        :disabled="props.isLoading"
                        @click="handleOk"
                    >
                        <template v-if="props.isLoading">
                            <Icon
                                icon="lucide:loader-2"
                                class="animate-custom-spin"
                            />
                            <span>{{ buttonText }}...</span>
                        </template>
                        <template v-else>
                            <span>{{ buttonText }}</span>
                        </template>
                    </UiButton>
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style lang="scss" scoped>
.dialog-confirmation {
    &__overlay {
        z-index: 1199;
        background-color: rgba($color: #000000, $alpha: 0.5);
        position: fixed;
        inset: 0;
        animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
    }

    &__content {
        width: 40vw;
        height: auto;
        max-width: 500px;
        padding: 40px;
        border-radius: 12px;
        z-index: 1200;
        background-color: #fff;
        box-shadow:
            hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
            hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &__action {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    &__button {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__close-button {
        top: 24px;
        right: 24px;
        cursor: pointer;
        border: 0;
        background-color: transparent;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 10;
    }
}

@keyframes overlayShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes contentShow {
    from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>
