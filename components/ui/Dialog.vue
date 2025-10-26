<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot
} from 'reka-ui'

interface IProps {
    modelValue: boolean
}

defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])

const onUpdate = (value: boolean) => {
    emit('update:modelValue', value)
}
</script>

<template>
    <DialogRoot class="dialog" :open="modelValue" @update:open="onUpdate">
        <DialogPortal>
            <DialogOverlay class="dialog__overlay" />
            <DialogContent class="dialog__content">
                <DialogClose class="dialog__close-button" aria-label="Close">
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
                <slot />
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style lang="scss" scoped>
.dialog {
    &__overlay {
        z-index: 1199;
        background-color: rgba($color: #000000, $alpha: 0.5);
        position: fixed;
        inset: 0;
        animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(8px); // background blur
        -webkit-backdrop-filter: blur(8px); // Safari support
    }

    &__content {
        padding: 40px;
        border-radius: 24px;
        max-width: 1700px;
        z-index: 1200;
        background-color: #fff;
        box-shadow:
            hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
            hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        height: 85vh;
        animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

        @media only screen and (max-width: 1399.98px) {
            width: 90vw;
            height: 70vh;
        }

        @media only screen and (max-width: 991.98px) {
            width: 95vw;
            height: 80vh;
        }

        @media only screen and (max-width: 991.98px) {
            height: 90vh;
        }
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

        outline: none;
        &:focus {
            outline: none;
        }
    }

    &__close-icon {
        width: 24px;
        height: 24px;
        color: rgba($color: #fff, $alpha: 0.6);
        transition: all 0.5s ease-in-out;

        &:hover {
            color: #fff;
            transform: scale(1.1);
        }
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
