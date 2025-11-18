import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default'

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<
        Array<{
            id: number
            title: string
            description?: string
            autoClose: boolean
            variant: ToastVariant
            icon?: any
        }>
    >([])

    function show(toast: {
        title: string
        description?: string
        variant?: ToastVariant
        autoClose?: boolean
        icon?: any
    }) {
        const id = Date.now()

        const newToast = {
            id,
            title: toast.title,
            description: toast.description ?? '',
            variant: toast.variant ?? 'default',
            autoClose: toast.autoClose ?? true, // default true
            icon: toast.icon
        }

        toasts.value.push(newToast)

        // auto close only if autoClose === true
        if (newToast.autoClose) {
            setTimeout(() => close(id), 4000)
        }
    }

    function close(id: number) {
        toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    return { toasts, show, close }
})
