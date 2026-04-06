<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '~/stores';
import { SectionLabel } from '../export';

// Props
defineProps({
  className: {
    type: String,
    default: '',
    required: false
  }
});

// Store
const cartStore = useCartStore();

// Product Data
const productDetails = [
    {
        campaignProductId: 93,
        productName: "Tactical X Abs Stimulator - Abs Only",
        price: "69.99",
        compareAtPrice: "129.99",
        discount: "Save $60.00 (46.16%)",
        image: "/images/product1.svg",
    },  
    {
        campaignProductId: 156,
        productName: "Tactical X Abs Stimulator - Abs + Arms + 12 Extra Gel Pads",
        price: "89.99",
        compareAtPrice: "199.98",
        discount: "Save $110.00 (55.00%)",
        image: "/images/product2.svg",
    },
    // {
    //     campaignProductId: 86,
    //     productName: "Tactical X Abs Stimulator 2025 - Abs + Arms + 48 Extra Gel Pads",
    //     price: "89.99",
    //     compareAtPrice: "369.98",
    //     discount: "Save $300.01 (75%off!)",
    //     image: "/images/product3.svg",
 
    // },
     {
        campaignProductId: 159,
        productName: "Tactical X Abs Stimulator 2025 - Abs + Arms + 36 Extra Gel Pads",
          price: "99.99",
          compareAtPrice: "249.98",
          discount: "Save $149.99 (60.00% Off!)",
        image: "/images/product3.svg",
 
    },
      {
        campaignProductId: 161,
        productName: "Tactical X Abs Stimulator 2025 - Abs + Arms + 144 Extra Gel Pads",
          price: "129.99",  
          compareAtPrice: "369.98",
          discount: "Save $239.99 (65% Off!)",
        image: "/images/product3.svg",
 
    }
];

// Selected Pack
const selectedPack = ref<number>(productDetails[2].campaignProductId);

onMounted(async () => {
  const prevSelectedPack = await storage.getLocalItem('tacticalProduct');
  selectedPack.value = Number(prevSelectedPack) || productDetails[2].campaignProductId;
});

// Handle Update
const updatedSelectedPack = (campaignProductId: number) => {
  selectedPack.value = campaignProductId;
  cartStore.tactiaclAddProduct(campaignProductId); // fixed typo
};
</script>

<template>
  <SectionLabel class-name="" title="Step 1: Order Quanity" />
  <section id="quanity-selector-body" :class="className">
    <div>
      <header>
        <p class="text-sm flex justify-between px-2">
          <span>Product</span><span>Price</span>
        </p>
        <hr class="border border-black" />
      </header>

      <!-- Body -->
      <main class="py-3 lg:py-5 flex flex-col gap-3 lg:gap-5 product-list">
        <label
          v-for="product in productDetails"
          :key="product.campaignProductId"
          @click="!cartStore.selectDisabled && updatedSelectedPack(product.campaignProductId)"
          :class="[
            'flex items-center border rounded cursor-pointer transition-colors duration-200 p-2 space-x-2 w-full',
            product.campaignProductId === 159
          ? 'bg-[#ffff00] hover:bg-[#eeee46] pl-item'
          : product.campaignProductId === 161
          ? 'bg-[#fff] hover:bg-[#EFEFEF] pl-item'
          : 'bg-white hover:bg-gray-100'
                  ]"
        >
          <input
            type="radio"
            :checked="selectedPack === product.campaignProductId"
            name="product"
            class="form-radio text-blue-500 w-4 h-4"
            :disabled="cartStore.selectDisabled"
          />
          <NuxtImg
            :src="product.image"
            :placeholder="[12, 12]"
            class="max-w-14 min-w-12 max-h-14 min-h-12"
          />
          <div class="flex-1 lg:w-1/6 w-full">
            <span
              :class="[
                'block text-nowrap text-white px-2 py-0.5 text-[10px] sm:text-xs font-bold w-fit sm:w-1/2 min-w-fit text-center rounded-sm',
                product.campaignProductId === 159 ? 'bg-red-600' : 'bg-black'
              ]"
            >
              {{ product.discount }}
            </span>
            <p class="font-semibold text-xs sm:text-sm mt-1 w-4/5">{{ product.productName }}</p>
          </div>
          <div class="text-right lg:pr-12 pr-0 pt-2 lg:pt-0">
            <p class="text-xs sm:text-sm line-through text-red-500 font-bold">
              ${{ product.compareAtPrice }}
            </p>
            <p class="text-sm sm:text-lg font-bold text-gray-800">${{ product.price }}</p>
          </div>
          <div v-if="product.campaignProductId === 159">
            <span class="side-tag" style="background: rgb(255, 0, 0);">Popular</span>
          </div>
          <div v-if="product.campaignProductId === 161">
            <span class="side-tag" style="background: rgb(255, 0, 0);">Best Deal</span>
          </div>
        </label>
      </main>
    </div>
  </section>
</template>
