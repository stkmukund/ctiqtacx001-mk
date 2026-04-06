<template>
    <section id="limited-spots" class="border-2 rounded border-black sm:p-3 p-1">
        <p class="text-[10px] sm:text-sm text-AmaranthRed font-bold flex items-center justify-center gap-1">
            <NuxtImg src="/images/warning-sign.svg" alt="warning-sign" width="12" height="12" />
            <span class="uppercase">limited spots!</span>
            <span class="text-black font-semibold">Your order is reserved for</span>
            <span v-if="minutes !== 0 && seconds !== 0">{{ minutes.toString().padStart(2, '0') + ":" +
                seconds.toString().padStart(2, '0') }}</span>
            <span v-else>Time is up!</span>
        </p>
    </section>
</template>
<script ts setup>
import { useCartStore } from '~/stores';

const cartStore = useCartStore();
const { minutes, seconds, startCountdown } = useCountdown(9, 55);

// watch the cart store for changes and start the countdown
watch(() => cartStore.cartLoading, (cartLoading) => {
    if (!cartLoading) startCountdown();
});
</script>