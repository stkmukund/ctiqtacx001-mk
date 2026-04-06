<template>
    <div :class="`mt-${Number(mt)}`"></div>
</template>

<script lang="ts" setup>
defineProps({
    mt: {
        type: Number,
        default: 7
    }
})
</script>