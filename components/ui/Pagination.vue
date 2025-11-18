<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    totalPages: number
    maxVisible?: number
}

// ✅ Props
const props = withDefaults(defineProps<Props>(), {
    maxVisible: 5
})

// ✅ Define model for v-model binding
const currentPage = defineModel<number>('currentPage', { default: 1 })

// ✅ Compute visible pages (with ...)
const pages = computed(() => {
    const { totalPages, maxVisible } = props
    const current = currentPage.value
    const result: (number | string)[] = []

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) result.push(i)
    } else {
        const start = Math.max(1, current - Math.floor(maxVisible / 2))
        const end = Math.min(totalPages, start + maxVisible - 1)

        if (start > 1) {
            result.push(1)
            if (start > 2) result.push('...')
        }

        for (let i = start; i <= end; i++) result.push(i)

        if (end < totalPages) {
            if (end < totalPages - 1) result.push('...')
            result.push(totalPages)
        }
    }

    return result
})

// ✅ Navigation
const goToPage = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage.value) {
        currentPage.value = page
    }
}

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
    if (currentPage.value < props.totalPages) currentPage.value++
}
</script>

<template>
    <ul class="pagination">
        <li class="pagination__item">
            <button
                class="pagination__link"
                :disabled="currentPage === 1"
                @click="prevPage"
            >
                Prev
            </button>
        </li>

        <li
            v-for="(page, index) in pages"
            :key="index"
            class="pagination__item"
            :class="{ active: page === currentPage }"
        >
            <button
                v-if="page !== '...'"
                class="pagination__link"
                @click="goToPage(page)"
            >
                {{ page }}
            </button>
            <span v-else class="pagination__ellipsis">...</span>
        </li>

        <li class="pagination__item">
            <button
                class="pagination__link"
                :disabled="currentPage === props.totalPages"
                @click="nextPage"
            >
                Next
            </button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.pagination {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0;
    margin: 0;

    &__item {
        display: flex;
        align-items: center;

        &.active .pagination__link {
            background-color: #466543;
            color: #fff;
        }
    }

    &__link {
        padding: 10px 18px;
        border: 1px solid #f0f5ed;
        background-color: #f0f5ed;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #222;
        transition: all 0.3s ease;

        &:hover {
            cursor: pointer;
        }

        &:hover:not(:disabled) {
            background-color: #466543;
            color: #fff;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    &__ellipsis {
        padding: 10px 18px;
        font-size: 18px;
        color: #666;
    }
}
</style>
