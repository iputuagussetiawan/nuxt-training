<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

// --- Types
type ButtonType = 'button' | 'submit' | 'link'
type ButtonVariant = 'primary' | 'primary-outline' | 'secondary' | 'icon'

interface ButtonProps {
    type?: ButtonType
    variant?: ButtonVariant
    to?: string | Record<string, any> // for NuxtLink or external link
    disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
    variant: 'primary',
    disabled: false
})

// --- Detect if link is external
const isExternal = computed(() => {
    if (props.type !== 'link' || !props.to) return false
    if (typeof props.to !== 'string') return false
    return /^(https?:)?\/\//.test(props.to)
})

// --- Classes based on variant
const classes = computed(() => ({
    btn: true,
    'btn-primary': props.variant === 'primary',
    'btn-primary-outline': props.variant === 'primary-outline',
    'btn-secondary': props.variant === 'secondary',
    'btn-icon': props.variant === 'icon',
    'btn--disabled': props.disabled
}))
</script>

<template>
    <!-- ✅ External link -->
    <a
        v-if="type === 'link' && isExternal"
        :href="typeof to === 'string' ? to : undefined"
        class="btn"
        target="_blank"
        rel="noopener noreferrer"
    >
        <slot />
    </a>

    <!-- ✅ Internal NuxtLink -->
    <NuxtLink v-else-if="type === 'link'" :to="to" :class="classes">
        <slot />
    </NuxtLink>

    <!-- ✅ Regular button -->
    <button v-else :type="type" :class="classes" :disabled="disabled">
        <slot />
    </button>
</template>

<style scoped lang="scss">
.btn {
    display: inline-flex;
    align-items: center;
    border: 2px solid $color-primary;
    padding: 12px 30px;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;

    @media only screen and (max-width: 1399.98px) {
        padding: 10px 24px;
        font-size: 20px;
    }

    @media only screen and (max-width: 1199.98px) {
        font-size: 18px;
        border-radius: 6px;
    }

    @media only screen and (max-width: 991.98px) {
        font-size: 16px;
    }
}

.btn-primary {
    background-color: $color-primary;
    border-color: $color-primary;
    color: #fff;

    &:hover {
        background-color: $color-primary-hover;
        border-color: $color-primary-hover;
    }
}

.btn-primary-outline {
    color: $color-primary;
    background: transparent;

    &:hover {
        color: $color-primary-hover;
        border-color: $color-primary-hover;
    }
}

.btn-secondary {
    background-color: #ddd;
    color: #333;
}

.btn-icon {
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(0.4);
}
</style>
