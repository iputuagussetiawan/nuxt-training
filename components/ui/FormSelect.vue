<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

interface Props {
    label: string
    name: string
    options: { label: string; value: any }[]
    placeholder?: string
    readonly?: boolean
    searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select an option',
    readonly: false,
    searchable: false
})
</script>

<template>
    <div class="form-select">
        <label class="form-select__label" :for="name">{{ label }}</label>
        <div class="form-select__wrapper">
            <Field :name="name" v-slot="{ field, meta }">
                <client-only>
                    <v-select
                        v-bind="field"
                        :id="name"
                        :options="options"
                        :reduce="
                            (option: (typeof options)[number]) => option.value
                        "
                        :placeholder="placeholder"
                        :searchable="searchable"
                        :disabled="readonly"
                        :class="{ 'error-select': meta.touched && !meta.valid }"
                        @input="field.onChange"
                        @blur="field.onBlur"
                        :model-value="field.value"
                    />
                </client-only>
            </Field>
        </div>

        <ErrorMessage :name="name" class="form-select__error" />
    </div>
</template>

<style scoped lang="scss">
.form-select {
    position: relative;
    margin-bottom: 24px;

    :deep(.v-select) {
        &.error-select {
            background-color: #ffe6e6;

            .vs__dropdown-toggle {
                border-color: #e63946;
            }

            .vs__open-indicator {
                fill: #e63946;
            }
        }
        .vs__selected {
            font-size: 18px;
            color: #222222;
        }

        .vs__dropdown-toggle {
            padding: 24px 30px;
            border: 2px solid #cccccc;
            border-radius: 8px;
            transition: 0.4s ease;

            &:focus-within {
                border-color: $color-primary;
            }
        }

        .vs__dropdown-option {
            padding: 14px 12px;
            font-size: 18px;
            background-color: #f9f9f9; // default option background
            color: #4b4b4b;
            transition: 0.3s ease;

            &:hover {
                background-color: #e6e6e6; // hover color
            }

            &.vs__dropdown-option--selected {
                background-color: $color-primary; // selected option background
                color: #fff; // text color for selected
            }
        }
    }

    &__wrapper {
        position: relative;
    }

    &__label {
        display: inline-block;
        margin-bottom: 20px;
        color: #4b4b4b;
        font-size: 18px;
        font-weight: 400;

        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 18px;
            font-size: 16px;
        }
    }

    &__error {
        color: #e63946;
        font-size: 14px;
        margin-top: 6px;
        display: block;
    }
}
</style>
