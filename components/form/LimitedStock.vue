<template>
    <section id="limited-stock" :class='className'>
        <div class="border-2 border-[#dde4df] bg-[#F6FDF8] p-3 rounded-md flex items-center justify-around sm:justify-center gap-3">
            <NuxtImg src="/images/warning.svg" alt="warning-sign" class="w-10 sm:w-5 h-auto" />
            <div class="flex lg:flex-wrap flex-col sm:flex-row items-center sm:gap-2">
                <h1 class="text-red-600 font-semibold uppercase">limited stock!</h1>
                <p class="font-medium">Cart reserved for:</p>
            </div>
            <div class="flex items-center gap-4 font-semibold text-red-600 text-lg">
                <p class="hidden sm:block flex flex-col items-center"><span>00</span><span class="hidden sm:block text-sm">Hours</span></p>
                <span class="hidden sm:block">:</span>
                <p class="flex flex-col items-center"><span>{{minutes.toString().padStart(2, '0')}}</span><span class="hidden sm:block text-sm">Minutes</span></p>
                <span class="sm:block">:</span>
                <p class="flex flex-col items-center"><span>{{seconds.toString().padStart(2, '0')}}</span><span class="hidden sm:block text-sm">Seconds</span></p>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
defineProps({
    className: {
        type: String,
        default: '',
        required: false
    }
})

import { useCartStore } from '~/stores';

const cartStore = useCartStore();
const { minutes, seconds, startCountdown } = useCountdown(9, 59);

// watch the cart store for changes and start the countdown
watch(() => cartStore.cartLoading, (cartLoading) => {
    if (!cartLoading) startCountdown();
});
</script>