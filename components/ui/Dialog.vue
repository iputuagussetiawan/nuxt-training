<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot
} from 'reka-ui'
import { computed } from 'vue'

interface IProps {
    modelValue: boolean
    size?: 'full' | 'lg' | 'md' | 'sm' | 'xs' // ✅ Add size options
}

const props = withDefaults(defineProps<IProps>(), {
    size: 'lg' // ✅ default size
})

// ✅ Compute dialog class dynamically
const dialogClass = computed(() => {
    return [
        'dialog__content',
        {
            'dialog__content--full': props.size === 'full',
            'dialog__content--lg': props.size === 'lg',
            'dialog__content--md': props.size === 'md',
            'dialog__content--sm': props.size === 'sm',
            'dialog__content--xs': props.size === 'xs'
        }
    ]
})

const emit = defineEmits(['update:modelValue'])
const onUpdate = (value: boolean) => {
    emit('update:modelValue', value)
}
</script>

<template>
    <DialogRoot class="dialog" :open="modelValue" @update:open="onUpdate">
        <DialogPortal>
            <DialogOverlay class="dialog__overlay" />
            <DialogContent :class="dialogClass">
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
        border-radius: 8px;
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

    /* ✅ Size Variants */
    &__content--full {
        width: 100vw;
        height: 100vh;
        max-width: none;
        max-height: none;
        border-radius: 0;
    }

    &__content--lg {
        width: 90vw;
        height: 80vh;
        max-width: 1400px;
    }

    &__content--md {
        width: 80vw;
        height: 70vh;
        max-width: 1000px;
    }

    &__content--sm {
        width: 60vw;
        height: 60vh;
        max-width: 700px;
    }

    &__content--xs {
        width: 40vw;
        height: 50vh;
        max-width: 500px;
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
