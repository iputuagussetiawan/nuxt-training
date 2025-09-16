<script setup>
    const route = useRoute()
    const id=route.params.id
</script>

<template>
    <div>
        <h1>Create Story {{ id }}</h1>
    </div>
</template>
