<script setup lang="ts">
import DefaultHeader from '~/components/layout/default/Header.vue'
import DefaultFooter from '~/components/layout/default/Footer.vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
// ✅ Initialize store when the layout is loaded
authStore.init()
</script>

<template>
    <div>
        <DefaultHeader />
        <slot />
        <DefaultFooter />
    </div>
</template>
