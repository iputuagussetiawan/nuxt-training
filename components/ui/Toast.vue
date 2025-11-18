<script setup lang="ts">
import {
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport
} from 'reka-ui'

import { Icon } from '@iconify/vue'
import { useToastStore } from '~/stores/toast'

const toastStore = useToastStore()

function closeToast(id: number) {
    toastStore.close(id)
}

function getVariantIcon(t: any) {
    if (t.icon) return t.icon

    switch (t.variant) {
        case 'success':
            return 'mdi:check-circle-outline'
        case 'error':
            return 'mdi:close-circle-outline'
        case 'warning':
            return 'mdi:alert-circle-outline'
        case 'info':
            return 'mdi:information-box-outline'
        default:
            return 'mdi:bell-outline'
    }
}

function getVariantColor(t: any) {
    switch (t.variant) {
        case 'success':
            return 'toast-icon toast-icon--success'
        case 'error':
            return 'toast-icon toast-icon--error'
        case 'warning':
            return 'toast-icon toast-icon--warning'
        case 'info':
            return 'toast-icon toast-icon--info'
        default:
            return 'toast-icon'
    }
}
</script>

<template>
    <ToastProvider swipeDirection="up" :duration="0">
        <ToastViewport class="ToastViewport toast__viewport" />
        <template v-for="t in toastStore.toasts" :key="t.id">
            <ToastRoot
                :open="true"
                class="ToastRoot toast"
                @update:open="closeToast(t.id)"
            >
                <Icon
                    :icon="getVariantIcon(t)"
                    :class="[' ', getVariantColor(t)]"
                />
                <div class="toast__info-container">
                    <ToastTitle class="ToastTitle">
                        <div class="toast__title">{{ t.title }}</div>
                    </ToastTitle>

                    <ToastDescription class="ToastDescription">
                        <div class="toast__description">
                            {{ t.description }}
                        </div>
                    </ToastDescription>
                </div>

                <!-- Close button -->
                <ToastAction
                    v-if="!t.autoClose"
                    as-child
                    alt-text="Close toast"
                >
                    <button class="toast__close" @click="closeToast(t.id)">
                        <svg
                            class="toast__close-icon"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.5 7.5L7.5 22.5"
                                stroke="#4b4b4b"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M7.5 7.5L22.5 22.5"
                                stroke="#4b4b4b"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </ToastAction>
            </ToastRoot>
        </template>
    </ToastProvider>
</template>

<style lang="scss" scoped>
.toast {
    &__title {
        font-size: 20px;
        font-weight: 700;
    }

    &__incon {
        font-size: 30px;
    }

    &__close {
        position: absolute;
        top: 8px;
        right: 4px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
            cursor: pointer;
        }

        &:hover .toast__close-icon path {
            stroke: $color-primary;
        }
    }

    &__close-icon {
        width: 20px;
        height: 20px;

        path {
            transition: 0.4s ease;
        }
    }
}

:deep(.toast-icon) {
    font-size: 30px;
}

:deep(.toast-icon--success) {
    color: #466543;
}
:deep(.toast-icon--error) {
    color: rgb(206, 26, 26);
}
:deep(.toast-icon--warning) {
    color: rgb(197, 178, 6);
}
:deep(.toast-icon--info) {
    color: rgb(8, 184, 190);
}

:deep(.ToastViewport) {
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    width: 390px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 2147483647;
    outline: none;
}

:deep(.ToastRoot) {
    position: relative;
    background-color: white;
    border-radius: 8px;
    box-shadow:
        0 8px 20px hsla(206, 22%, 7%, 0.18),
        0 16px 48px hsla(206, 22%, 7%, 0.1);
    padding: 15px;
    display: flex;
    column-gap: 15px;
    align-items: center;
}
:deep(.ToastRoot[data-state='open']) {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
:deep(.ToastRoot[data-state='closed']) {
    animation: hide 100ms ease-in;
}
:deep(.ToastRoot[data-swipe='move']) {
    transform: translateX(0px);
}
:deep(.ToastRoot[data-swipe='cancel']) {
    transform: translateX(0);
    transition: transform 200ms ease-out;
}
:deep(.ToastRoot[data-swipe='end']) {
    animation: swipeOut 100ms ease-out;
}

@keyframes hide {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes slideIn {
    from {
        transform: translateX(calc(100% + 24px));
    }
    to {
        transform: translateX(0);
    }
}

@keyframes swipeOut {
    from {
        transform: translateX(var(0));
    }
    to {
        transform: translateX(calc(100% + 24px));
    }
}

:deep(.ToastTitle) {
    grid-area: title;
    margin-bottom: 5px;
    font-weight: 500;
    color: #11181c;
    font-size: 15px;
}

:deep(.ToastDescription) {
    grid-area: description;
    margin: 0;
    color: #687076;
    font-size: 13px;
    line-height: 1.3;
}

:deep(.ToastAction) {
    grid-area: action;
}

:deep(.Button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 500;
}
:deep(.Button.small) {
    font-size: 12px;
    padding: 0 10px;
    line-height: 25px;
    height: 25px;
}
:deep(.Button.large) {
    font-size: 15px;
    padding: 0 15px;
    line-height: 35px;
    height: 35px;
}
:deep(.Button.grass) {
    background-color: white;
    color: #46a758;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
}
:deep(.Button.grass:hover) {
    background-color: #f5f2f4;
}
:deep(.Button.grass:focus) {
    box-shadow: 0 0 0 2px black;
}
:deep(.Button.green) {
    background-color: #f2fcf5;
    color: #30a46c;
    box-shadow: inset 0 0 0 1px #4cc38a;
}
:deep(.Button.green:hover) {
    box-shadow: inset 0 0 0 1px #3cb179;
}
:deep(.Button.green:focus) {
    box-shadow: 0 0 0 2px #3cb179;
}
</style>
