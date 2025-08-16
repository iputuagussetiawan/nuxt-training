<script setup lang="ts">
    import { computed } from "vue";
    import { NuxtLink } from "#components";
    type ButtonType = "button" | "submit" | "link";
    type ButtonVariant = "primary" | "primary-outline" | "secondary";

    interface ButtonProps {
        type?: ButtonType;
        variant?: ButtonVariant;
        href?: string; // for link type
    }

    const props = withDefaults(defineProps<ButtonProps>(), {
        type: "button",
        variant: "primary",
    });

    // Classes based on variant
    const classes = computed(() => {
        return {
            "btn": true,
            "btn-primary": props.variant === "primary",
            "btn-primary-outline": props.variant === "primary-outline",
            "btn-secondary": props.variant === "secondary",
        };
    });
</script>

<template>
    <component
        :is="props.type === 'link' ? NuxtLink : 'button'"
        :to="props.type === 'link' ? props.href : undefined"
        :type="props.type !== 'link' ? props.type : undefined"
        :class="classes"
    >
        <slot />
    </component>
</template>

<style scoped lang="scss">
    .btn{
        display: inline-block;
        border: 2px solid $color-primary;
        padding: 12px 30px;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.33;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.4s ease-in-out;
    }

    .btn-primary-outline{
        color: $color-primary;
        &:hover{
            background-color: transparent;
            color: $color-primary-hover;
            border-color: $color-primary-hover;
        }
    }

    .btn-primary{
        border: 2px solid $color-primary;
        background-color: $color-primary;
        color: #fff;
        &:hover{
            background-color: $color-primary-hover;
            border: 2px solid $color-primary-hover;
            color: #fff;
        }
    }
</style>