<script setup lang="ts">
import { useCheckoutStore } from '~/stores';

// Checkout Store
const checkoutStore = useCheckoutStore();
// Access vipOptIn directly from the store
const stiOptIn = ref(checkoutStore.stiOptIn);

const { updateStiOptIn } = checkoutStore;
</script>
<template>
    <div class="px-2 lg:px-3 pb-3">
<div class="bg-[#f1f1f1] pb-3">

  <!-- Header -->
  <div class="bg-[#4B6B24] p-3">
    <label class="flex items-start space-x-3">
      <input
        type="checkbox"
        v-model="stiOptIn"
        @click="() => updateStiOptIn(false)"
        class="w-7 h-7 lg:w-5 lg:h-5 p-2"
      />
      <span class="text-white font-semibold text-sm lg:text-base">
        Yes, I want Premium Shipping with Tracking and Insurance! (50% OFF)
      </span>
    </label>
  </div>

  <!-- Content -->
  <div class="flex my-2 gap-4 p-2 lg:p-3">

    <!-- Left Icons -->
    <div class="flex flex-col items-center justify-start gap-2">
      <NuxtImg
        src="/images/guarantee+shipping.png"
        alt="Money Back"
        class="w-96 sm:w-80 h-auto object-contain"
      />
    </div>

    <!-- Right Text -->
    <div class="text-sm sm:text-base leading-relaxed sm:ml-5 ml-0">
      <span class="font-bold">One Time Offer:</span>
      Tick the box and keep track of your order every step of the way!
      Also enjoy peace of mind with guaranteed delivery insurance all
      for only
      <span class="line-through text-gray-700">$9.99</span>
      <span class="font-bold text-black ml-1">$4.99</span>!
      This premium delivery option means your Tactical-X Abs stimulator
      is 100% guaranteed to arrive so you can start your fitness journey
      as soon as possible!
    </div>

  </div>
</div>
</div>
</template>