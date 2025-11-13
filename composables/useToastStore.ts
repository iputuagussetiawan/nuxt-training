import { ref } from 'vue'

interface ToastData {
    id: number
    title?: string
    content?: string
    variant?: 'success' | 'error' | 'info'
}

const toasts = ref<ToastData[]>([])

export function useToastStore() {
    const addToast = (toast: Omit<ToastData, 'id'>) => {
        const id = Date.now()
        toasts.value.push({ id, ...toast })

        // auto remove after 4s
        setTimeout(() => removeToast(id), 4000)
    }

    const removeToast = (id: number) => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    return { toasts, addToast, removeToast }
}
