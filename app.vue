<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import Toast from './components/ui/Toast.vue'
import { ref } from 'vue'

const authStore = useAuthStore()
authStore.init()
const toastOpen = ref(false)
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <button @click="toastOpen = true">Show Toast</button>
        <Toast
            v-model:open="toastOpen"
            title="Success!"
            description="Your data was saved."
        />
    </div>
</template>
