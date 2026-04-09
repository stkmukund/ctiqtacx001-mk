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
  <SectionLabel class-name="" title="Choose Your Abs Stimulator Package" />
  <section id="quanity-selector-body" :class="className">
    <div>
      <!-- Body -->
      <main class="pb-0 flex flex-col gap-3 lg:gap-5 product-list">
        <label v-for="product in productDetails" :key="product.campaignProductId"
          @click="!cartStore.selectDisabled && updatedSelectedPack(product.campaignProductId)" :class="[
            'flex items-center gap-3 border-2 rounded-lg cursor-pointer transition-all duration-200 bg-white hover:bg-gray-100 lg:p-4 p-2 w-full relative',
            selectedPack === product.campaignProductId ? 'activepackage' : '',
            product.campaignProductId === 159
              ? 'pl-item bg-white hover:bg-gray-100'
              : product.campaignProductId === 161
                ? 'pl-item bg-white hover:bg-gray-100'
                : 'bg-white hover:bg-gray-100'
          ]">
          <input type="radio" :checked="selectedPack === product.campaignProductId" name="product"
            class="form-radio text-blue-500 w-5 h-5" :disabled="cartStore.selectDisabled" />
          <NuxtImg :src="product.image" :placeholder="[12, 12]"
            class="lg:w-32 w-16 h-auto object-contain rounded-md border border-gray-300" />
          <div class="flex-1 lg:w-1/6 w-full">
            <!-- Badge -->


            <span :class="[
              'inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-2',
              product.campaignProductId === 159 ? 'bg-[#4B6B24]' : 'bg-black'
            ]">
              {{ product.discount }}
            </span>
            <p class="font-semibold text-sm sm:text-base mt-1 tracking-tight leading-5 w-4/5">{{ product.productName }}
            </p>
          </div>
          <div class="text-right lg:pr-2 pr-0 flex flex-col justify-center">

            <p class="text-base sm:text-lg line-through text-red-500 font-semibold leading-tight">
              ${{ product.compareAtPrice }}
            </p>

            <p class="text-base sm:text-2xl font-bold text-gray-900 leading-tight">
              ${{ product.price }}
            </p>

          </div>
          <div v-if="product.campaignProductId === 159">
            <span class="side-tag" style="background: rgb(255, 0, 0);">Most Popular</span>
          </div>
          <div v-if="product.campaignProductId === 161">
            <span class="side-tag" style="background: rgb(255, 0, 0);">Best Deal</span>
          </div>
        </label>
      </main>
    </div>
  </section>
</template>
