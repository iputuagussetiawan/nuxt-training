import { useToastStore } from './useToastStore'

export function useCustomToast() {
    const { addToast } = useToastStore()

    return {
        success(message: string, title = 'Success') {
            addToast({ title, content: message, variant: 'success' })
        },
        error(message: string, title = 'Error') {
            addToast({ title, content: message, variant: 'error' })
        },
        info(message: string, title = 'Info') {
            addToast({ title, content: message, variant: 'info' })
        }
    }
}
