<template>
  <tr class="">
    <td class="py-4 flex justify-center items-center">
      <div class="relative">
        <NuxtImg :src="item.image" class="object-contain border rounded-md h-[60px] w-[60px]" :transform="{
          quality: 75,
          format: 'webp',
        }" loading="lazy" />
        <div v-if="item.product_qty"
          class="bg-gray-600 rounded-full w-5 h-5 text-white flex items-center justify-center absolute -top-2 -right-2">
          {{ item.product_qty }}
        </div>
      </div>
    </td>
    <td class="py-4 pl-2 text-sm sm:text-base">
      <p :class="{ 'text-[#ef476f] font-semibold w-fit': item.product_id == 1 }">{{ item.title }}</p>
      <p :class="{ 'text-[#8f8f8f] w-fit': item.product_id == 1 }">{{ item.variant_title }}</p>
    </td>
    <td class="p-2 sm:p-3 text-right">
     <span v-if="item.product_id === 93 || item.product_id === 159 || item.product_id === 156 || item.product_id === 161"
        class="text-sm line-through text-red-500 font-bold">${{ item.compare_at_price }}</span>
      <br>
      <span class="text-base font-bold text-gray-800">${{ (item.price).toFixed(2) }}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { CartData } from '~/utils/interface';


// Define the props for the component
defineProps<{
  item: CartData;
}>();
</script>

<style scoped></style>
