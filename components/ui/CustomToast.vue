<script setup lang="ts">
import { ToastRoot, ToastTitle, ToastDescription, ToastClose } from 'reka-ui'

defineProps<{
    title?: string
    content?: string
    variant?: 'success' | 'error' | 'info'
}>()

const variantClasses = {
    success: 'border-green-400 bg-green-50 text-green-800',
    error: 'border-red-400 bg-red-50 text-red-800',
    info: 'border-blue-400 bg-blue-50 text-blue-800'
}
</script>

<template>
    <ToastRoot
        :class="[
            'border rounded-lg p-4 flex justify-between items-start shadow-md',
            variantClasses[variant ?? 'info']
        ]"
    >
        <div>
            <ToastTitle class="font-semibold">{{ title }}</ToastTitle>
            <ToastDescription class="text-sm mt-1">{{
                content
            }}</ToastDescription>
        </div>
        <ToastClose
            aria-label="Close"
            class="text-gray-500 hover:text-gray-700"
        >
            ×
        </ToastClose>
    </ToastRoot>
</template>
