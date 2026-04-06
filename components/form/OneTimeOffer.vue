<script setup lang="ts">
import { useCheckoutStore } from '~/stores';

// Checkout Store
const checkoutStore = useCheckoutStore();
// Access vipOptIn directly from the store
const stiOptIn = ref(checkoutStore.stiOptIn);

const { updateStiOptIn } = checkoutStore;
</script>
<template>
    <div class="bg-[#efefef] p-2 lg:p-3">
        <div class="bg-[#01bdb4] p-2 rounded-md">
            <label class="flex items-center space-x-4 pl-2">
                <input type="checkbox" v-model="stiOptIn" @click="() => updateStiOptIn(false)"
                    class="form-checkbox lg:w-6 lg:h-6 w-4 h-4" />
                <span class="font-semibold text-white text-sm lg:text-base">YES, I want Premium Shipping with Tracking
                    and Insurance!
                    (50% OFF)</span>
            </label>
        </div>
        <p class="text-xs sm:text-sm mt-3">
            <span class="font-bold">One Time Offer:</span>
            Tick the box and keep track of your order every step of the way! Also enjoy peace of mind with guaranteed delivery insurance all for only
            <span class="line-through">$9.99</span> <span class="font-bold">$4.99</span>!
            This premium delivery option means your Tactical-X Abs stimulator is 100% guaranteed to arrive so can start your fitness journey as soon as possible!
        </p>
        <div class="flex justify-center items-center py-4">
            <NuxtImg src="/images/guarantee+shipping.svg" alt="Guarantee" :placeholder="[50, 25]"
                class="w-[200px] lg:w-[250px]" />
        </div>
    </div>
</template>