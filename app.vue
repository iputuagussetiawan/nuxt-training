<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import UiToast from './components/ui/Toast.vue'
import { useToastStore } from './stores/toast'

const authStore = useAuthStore()
authStore.init()

function save() {
    // simulate success
    console.log('success')
    useToastStore().success('Saved successfully!')
}

function remove() {
    // simulate error
    useToastStore().error('Something went wrong')
}

function customToast() {
    useToastStore().show({
        title: 'Hello',
        description: 'Custom toast example',
        autoClose: false
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
            <button @click="customToast">Show Custom Toast</button>
        </NuxtLayout>
    </div>
</template>
