/** * Button Component * * A reusable button component that supports: * - type:
"button", "submit", or "link" * - variant: "primary", "primary-outline", or
"secondary" * - href: required when using type="link" * * @property {"button" |
"submit" | "link"} type - Defines button type (default: "button") * @property
{"primary" | "primary-outline" | "secondary"} variant - Defines style variant
(default: "primary") * @property {string} href - Destination URL (only used if
type="link") * */
<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'
type ButtonType = 'button' | 'submit' | 'link'
type ButtonVariant = 'primary' | 'primary-outline' | 'secondary' | 'icon'

interface ButtonProps {
    type?: ButtonType
    variant?: ButtonVariant
    href?: string // for link type
    disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
    variant: 'primary',
    disabled: false
})

// Classes based on variant
const classes = computed(() => {
    return {
        btn: true,
        'btn-primary': props.variant === 'primary',
        'btn-primary-outline': props.variant === 'primary-outline',
        'btn-secondary': props.variant === 'secondary',
        'btn-icon': props.variant === 'icon',
        'btn--disabled': props.disabled
    }
})
</script>

<template>
    <component
        :is="props.type === 'link' ? NuxtLink : 'button'"
        :to="props.type === 'link' ? props.href : undefined"
        :type="props.type !== 'link' ? props.type : undefined"
        :class="classes"
        :disabled="props.type !== 'link' ? props.disabled : undefined"
    >
        <slot />
    </component>
</template>

<style scoped lang="scss">
.btn {
    display: inline-block;
    border: 2px solid $color-primary;
    padding: 12px 30px;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.4s ease-in-out;

    &:hover {
        cursor: pointer;
    }

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

.btn-primary-outline {
    color: $color-primary;
    &:hover {
        background-color: transparent;
        color: $color-primary-hover;
        border-color: $color-primary-hover;
    }
}

.btn-primary {
    border: 2px solid $color-primary;
    background-color: $color-primary;
    color: #fff;
    &:hover {
        background-color: $color-primary-hover;
        border: 2px solid $color-primary-hover;
        color: #fff;
    }
}

.btn-icon {
    border: none;
    padding: 0px;
    border-radius: 0px;
    text-decoration: none;
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
