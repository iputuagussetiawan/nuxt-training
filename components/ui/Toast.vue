<script setup lang="ts">
import {
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastViewport
} from 'reka-ui'

// props
const props = defineProps<{
    title?: string
    description?: string
}>()
// v-model:open support
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
    <ToastProvider swipeDirection="up" :duration="4000">
        <ToastRoot v-model:open="open" class="ToastRoot">
            <ToastTitle class="ToastTitle">
                {{ props.title }}
            </ToastTitle>
            <ToastDescription class="ToastDescription">
                {{ props.description }}
            </ToastDescription>
        </ToastRoot>
        <ToastViewport class="ToastViewport" />
    </ToastProvider>
</template>

<style lang="scss" scoped>
/* reset */
button {
    all: unset;
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
    background-color: white;
    border-radius: 6px;
    box-shadow:
        hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    padding: 15px;
    display: grid;
    grid-template-areas: 'title action' 'description action';
    grid-template-columns: auto max-content;
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
