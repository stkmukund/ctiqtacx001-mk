<script setup lang="ts">
defineProps({
    className: {
        type: String,
        default: '',
        required: false
    },
    title: {
        type: String,
        default: '',
        required: true
    }
})
</script>
<template>
    <section id="quanity-selector" :class='className'>
        <div class="bg-[#EFEFEF] py-2 lg:px-3 px-2">
            <h1 class="text-base sm:text-lg font-semibold sm:font-bold">{{ title }}</h1>
        </div>
    </section>
</template>
