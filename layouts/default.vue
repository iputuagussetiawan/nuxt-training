<script setup lang="ts">
import DefaultHeader from '../components/layout/default/Header.vue'
import DefaultFooter from '../components/layout/default/Footer.vue'
import CustomToaster from '../components/ui/CustomToaster.vue'
</script>

<template>
    <div>
        <DefaultHeader />
        <slot />
        <DefaultFooter />
        <CustomToaster />
    </div>
</template>
