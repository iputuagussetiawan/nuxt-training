import { ref } from 'vue'

export function useToast() {
    const toast = ref({
        open: false,
        title: '',
        description: '',
        autoClose: true
    })

    function show(options: {
        title: string
        description?: string
        autoClose?: boolean
    }) {
        toast.value = {
            open: true,
            title: options.title,
            description: options.description ?? '',
            autoClose: options.autoClose ?? true
        }
    }

    function success(message: string) {
        show({
            title: 'Success',
            description: message,
            autoClose: true
        })
    }

    function error(message: string) {
        show({
            title: 'Error',
            description: message,
            autoClose: false
        })
    }

    return { toast, show, success, error }
}
