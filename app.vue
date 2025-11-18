<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import UiToast from './components/ui/Toast.vue'
import { useToastStore } from './stores/toast'

const authStore = useAuthStore()

authStore.init()
const toast = useToastStore()

function save() {
    // simulate success
    console.log('success')
    toast.show({
        title: 'Saved!',
        description: 'Your data has been updated.',
        autoClose: false,
        variant: 'success'
    })
}

function remove() {
    // simulate error
    toast.show({
        title: 'Something went wrong',
        description: 'Please try again.',
        autoClose: false,
        variant: 'error'
    })
}
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
            <UiToast />
            <button @click="save">Show Success</button>
            <button @click="remove">Show Error</button>
        </NuxtLayout>
    </div>
</template>
