<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'reka-ui'
import CustomToast from '~/components/ui/CustomToast.vue'
import { useToastStore } from '~/composables/useToastStore'

const { toasts, removeToast } = useToastStore()
</script>

<template>
    <ToastProvider>
        <ToastViewport
            class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-96 max-w-full"
        />
        <transition-group
            name="toast"
            tag="div"
            class="fixed top-4 right-4 space-y-2"
        >
            <CustomToast
                v-for="t in toasts"
                :key="t.id"
                :title="t.title"
                :content="t.content"
                :variant="t.variant"
                @close="removeToast(t.id)"
            />
        </transition-group>
    </ToastProvider>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
