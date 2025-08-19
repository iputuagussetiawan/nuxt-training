<script setup lang="ts">
    import { computed } from 'vue'

    type ButtonType = 'button' | 'submit' | 'link'
    type Variant = 'primary' | 'secondary'

    interface ButtonProps {
        type?: ButtonType
        variant?: Variant
        href?: string // for link type
    }

    const props = withDefaults(defineProps<ButtonProps>(), {
        type: 'button',
        variant: 'primary',
        href: ''
    })

    const classes = computed(() => [
        'btn',
        `btn--${props.variant}`
    ])
</script>

<template>
    <!-- Link -->
    <a
        v-if="type === 'link'"
        :href="href"
        :class="classes"
    >
        <slot />
    </a>

    <!-- Button or Submit -->
    <button
        v-else
        :type="type"
        :class="classes"
    >
        <slot />
    </button>
</template>

<style scoped lang="scss">
    
</style>

