import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
    state: () => ({
        open: false,
        title: '',
        description: '',
        autoClose: true
    }),

    actions: {
        show(options: {
            title: string
            description?: string
            autoClose?: boolean
        }) {
            this.open = true
            this.title = options.title
            this.description = options.description ?? ''
            this.autoClose = options.autoClose ?? true
        },

        success(message: string) {
            this.show({
                title: 'Success',
                description: message,
                autoClose: true
            })
        },

        error(message: string) {
            this.show({
                title: 'Error',
                description: message,
                autoClose: false
            })
        },

        close() {
            this.open = false
        }
    }
})
