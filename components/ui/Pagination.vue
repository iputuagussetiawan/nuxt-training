<script setup lang="ts"></script>
<template>
    <ul class="pagination">
        <li class="pagination__item">
            <a href="#" class="pagination__link">Prev</a>
        </li>
        <li class="pagination__item">
            <a class="pagination__link" href="#">1</a>
        </li>
        <li class="pagination__item active">
            <a class="pagination__link" href="#" aria-current="page">2</a>
        </li>
        <li class="pagination__item">
            <a class="pagination__link" href="#">3</a>
        </li>
        <li class="pagination__item">
            <a class="pagination__link" href="#">Next</a>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.pagination {
    list-style: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    gap: 20px;

    @media only screen and (max-width: 1399.98px) {
        gap: 16px;
    }

    &__item.active &__link {
        background-color: #466543;
        color: #fff;
    }

    &__link {
        display: block;
        padding: 16px 30px;
        border: 1px solid #f0f5ed;
        background-color: #f0f5ed;
        border-radius: 8px;
        font-size: 28px;
        font-weight: 700;
        line-height: 1.357;
        color: #222222;
        transition: 0.4s ease;
        text-decoration: none;
        transition: 0.4s ease;

        @media only screen and (max-width: 1399.98px) {
            padding: 14px 20px;
            font-size: 18px;
        }

        &:hover {
            background-color: #466543;
            color: #fff;
        }
    }
}
</style>
