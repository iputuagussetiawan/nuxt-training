<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { Icon } from '@iconify/vue'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'

const showHeadingMenu = ref(false)
type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6
interface HeadingOption {
    label: string
    level: Level
}

const headingOptions: HeadingOption[] = [
    { label: 'Normal', level: 0 },
    { label: 'Heading 1', level: 1 },
    { label: 'Heading 2', level: 2 },
    { label: 'Heading 3', level: 3 },
    { label: 'Heading 4', level: 4 },
    { label: 'Heading 5', level: 5 },
    { label: 'Heading 6', level: 6 }
]

const setHeading = (option: { label: string; level: Level }) => {
    if (option.level === 0) {
        editor.value?.chain().focus().setParagraph().run()
    } else {
        editor.value
            ?.chain()
            .focus()
            .toggleHeading({ level: option.level })
            .run()
    }
    showHeadingMenu.value = false
}

const currentHeadingLabel = computed(() => {
    if (editor.value?.isActive('heading', { level: 1 })) return 'H1'
    if (editor.value?.isActive('heading', { level: 2 })) return 'H2'
    if (editor.value?.isActive('heading', { level: 3 })) return 'H3'
    if (editor.value?.isActive('heading', { level: 4 })) return 'H4'
    if (editor.value?.isActive('heading', { level: 5 })) return 'H5'
    if (editor.value?.isActive('heading', { level: 6 })) return 'H6'
    return 'Normal'
})

const props = defineProps<{
    name: string
    label?: string
    modelValue?: string
    placeholder?: string // ✅ add prop
}>()

const emit = defineEmits(['update:modelValue'])

const { value, errorMessage, handleChange } = useField<string>(props.name)

const editor = useEditor({
    content: '',
    extensions: [
        StarterKit,
        Underline,
        Superscript,
        Subscript,
        Placeholder.configure({
            emptyEditorClass: 'is-editor-empty',
            placeholder: props.placeholder || 'Write your post content here…'
        })
    ],
    onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        handleChange(html)
        emit('update:modelValue', html)
    }
})

const toggleSubscript = () => {
    if (!editor?.value) return

    // If superscript is active, remove it first
    if (editor.value.isActive('superscript')) {
        editor.value.chain().focus().unsetSuperscript().run()
    }

    // Then toggle subscript
    editor.value.chain().focus().toggleSubscript().run()
}

const toggleSuperscript = () => {
    if (!editor?.value) return

    // If subscript is active, remove it first
    if (editor.value.isActive('subscript')) {
        editor.value.chain().focus().unsetSubscript().run()
    }

    // Then toggle superscript
    editor.value.chain().focus().toggleSuperscript().run()
}

watch(value, (val) => {
    if (val && val !== editor?.value?.getHTML()) {
        editor?.value?.commands.setContent(val)
    }
})

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>

<template>
    <div class="tiptap-editor">
        <label v-if="label" class="tiptap-editor__label">{{ label }}</label>

        <div
            class="tiptap-editor__container"
            :class="{ 'tiptap-editor__container--error': errorMessage }"
        >
            <div v-if="editor" class="tiptap-editor__toolbar">
                <div class="tiptap-editor__toolbar-group">
                    <div class="tiptap-editor__dropdown">
                        <button
                            class="tiptap-editor__button"
                            @click="showHeadingMenu = !showHeadingMenu"
                        >
                            {{ currentHeadingLabel }}
                            <Icon icon="lucide:chevrons-up-down" />
                        </button>

                        <div
                            v-if="showHeadingMenu"
                            class="tiptap-editor__dropdown-menu"
                            @click.stop
                        >
                            <button
                                v-for="level in headingOptions"
                                :key="level.label"
                                class="tiptap-editor__dropdown-item"
                                @click="setHeading(level)"
                                :class="{
                                    active:
                                        (level.level === 0 &&
                                            editor.isActive('paragraph')) ||
                                        editor.isActive('heading', {
                                            level: level.level
                                        })
                                }"
                            >
                                {{ level.label }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tiptap-editor__toolbar-group">
                    <button
                        @click="editor.chain().focus().toggleBold().run()"
                        :disabled="
                            !editor.can().chain().focus().toggleBold().run()
                        "
                        :class="{
                            'tiptap-editor__button--active':
                                editor.isActive('bold')
                        }"
                        class="tiptap-editor__button"
                    >
                        <Icon icon="lucide:bold" />
                    </button>
                    <button
                        @click="editor.chain().focus().toggleItalic().run()"
                        :disabled="
                            !editor.can().chain().focus().toggleItalic().run()
                        "
                        :class="{
                            'tiptap-editor__button--active':
                                editor.isActive('italic')
                        }"
                        class="tiptap-editor__button"
                    >
                        <Icon icon="lucide:italic" />
                    </button>
                    <button
                        @click="editor.chain().focus().toggleUnderline().run()"
                        :disabled="
                            !editor
                                .can()
                                .chain()
                                .focus()
                                .toggleUnderline()
                                .run()
                        "
                        :class="{
                            'tiptap-editor__button--active':
                                editor.isActive('underline')
                        }"
                        class="tiptap-editor__button"
                    >
                        <Icon icon="lucide:underline" />
                    </button>
                    <button
                        @click="editor.chain().focus().toggleStrike().run()"
                        :disabled="
                            !editor.can().chain().focus().toggleStrike().run()
                        "
                        :class="{
                            'tiptap-editor__button--active':
                                editor.isActive('strike')
                        }"
                        class="tiptap-editor__button"
                    >
                        <Icon icon="lucide:strikethrough" />
                    </button>
                </div>

                <div class="tiptap-editor__toolbar-group">
                    <button
                        @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{
                            'tiptap-editor__button--active':
                                editor.isActive('bulletList')
                        }"
                        class="tiptap-editor__button"
                    >
                        <Icon icon="lucide:list" />
                    </button>
                    <button
                        @click="
                            editor.chain().focus().toggleOrderedList().run()
                        "
                        :class="{
                            'tiptap-editor__button--active':
                                editor.isActive('orderedList')
                        }"
                        class="tiptap-editor__button"
                    >
                        <Icon icon="lucide:list-ordered" />
                    </button>
                </div>

                <div class="tiptap-editor__toolbar-group">
                    <button
                        class="tiptap-editor__button"
                        @click="editor.chain().focus().undo().run()"
                    >
                        <Icon icon="lucide:undo" />
                    </button>
                    <button
                        class="tiptap-editor__button"
                        @click="editor.chain().focus().redo().run()"
                    >
                        <Icon icon="lucide:redo" />
                    </button>
                </div>

                <div class="tiptap-editor__toolbar-group">
                    <button
                        class="tiptap-editor__button"
                        @click="toggleSubscript"
                        :class="{
                            'tiptap-editor__button--active':
                                editor?.isActive('subscript')
                        }"
                    >
                        <Icon icon="lucide:subscript" />
                    </button>

                    <!-- Superscript -->
                    <button
                        class="tiptap-editor__button"
                        @click="toggleSuperscript"
                        :class="{
                            'tiptap-editor__button--active':
                                editor?.isActive('superscript')
                        }"
                    >
                        <Icon icon="lucide:superscript" />
                    </button>
                </div>
            </div>

            <div class="tiptap-editor__content">
                <EditorContent
                    :editor="editor"
                    class="tiptap-editor__content-editor"
                />
            </div>
        </div>

        <p v-if="errorMessage" class="tiptap-editor__error">
            {{ errorMessage }}
        </p>
    </div>
</template>

<style lang="scss" scoped>
:deep(p.is-editor-empty::before) {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
    height: 0;
    float: left;
}

:deep(.ProseMirror) {
    outline: none;
    border: none;
}
.tiptap-editor {
    position: relative;
    margin-bottom: 24px;

    .is-editor-empty::before {
        content: attr(data-placeholder);
        position: absolute;
        top: 0px;
        left: 0px;
        color: red;
        pointer-events: none;
        height: 20px;
        width: 100px;
        z-index: 100;
    }

    &__dropdown {
        position: relative;
        display: inline-block;

        .caret {
            margin-left: 4px;
            font-size: 12px;
        }
    }

    &__dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 10;
        background: white;
        border: 1px solid #ccc;
        border-radius: 6px;
        min-width: 120px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        margin-top: 4px;
        padding: 4px;
    }

    &__dropdown-item {
        display: block;
        width: 100%;
        text-align: left;
        padding: 10px 18px;
        font-size: 16px;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
            background: #f3f4f6;
        }

        &.active {
            background: $color-primary;
            color: #fff;
        }
    }

    &__label {
        display: inline-block;
        margin-bottom: 16px;
        color: #4b4b4b;
        font-size: 18px;
        font-weight: 400;

        @media (max-width: 1399.98px) {
            font-size: 16px;
        }
    }

    &__container {
        border: 2px solid #d1d5db;
        padding: 16px 20px 24px 20px;
        border-radius: 8px;
        background-color: #fff;
        transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;

        &--error {
            border-color: #e63946;
            background-color: #fff5f5;
        }
    }

    &__toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 12px;
    }
    &__toolbar-group {
        display: flex;
        gap: 4px;
    }

    &__button {
        border: transparent;
        padding: 6px 10px;
        border-radius: 4px;
        background: transparent;
        cursor: pointer;
        font-size: 18px;
        transition: all 0.4s ease;
        font-weight: 400;

        svg {
            vertical-align: middle;
        }

        &:hover {
            background-color: #f2f3f5;
            color: $color-primary;
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
        }

        &--active {
            background-color: $color-primary;
            color: #fff;
            border-color: $color-primary;
        }
    }

    &__content {
        border-top: 1px solid #e5e7eb;
        padding-top: 12px;

        &-editor {
            min-height: 350px;
            font-size: 16px;
            line-height: 1.5;
            outline: none;
            border: none;
            border-radius: 0;
            padding: 8px 0;

            &:focus {
                outline: none;
                border: none;
                box-shadow: none;
            }

            p {
                margin: 0 0 10px;
            }
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
