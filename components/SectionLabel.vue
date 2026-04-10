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
        <div class="bg-[#fff] py-0 lg:px-0 px-0">
            <h1 class="lg:text-xl text-base font-semibold sm:font-bold">{{ title }}</h1>
        </div>
    </section>
</template>
