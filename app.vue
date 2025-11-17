<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import UiToast from './components/ui/Toast.vue'
const authStore = useAuthStore()
authStore.init()
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
            <UiToast />
        </NuxtLayout>
    </div>
</template>
