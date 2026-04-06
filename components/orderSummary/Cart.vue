<template>
  <ClientOnly>
    <div class="p-2 lg:p-3">
      <section id="collapseSection" class="border shadow-sm rounded-md">
        <!-- Collapse Header -->
        <div @click="isCollapsed = !isCollapsed"
          class="flex items-center justify-between p-4 border-b cursor-pointer bg-[#fafafa]" id="toggleSummary">
          <div class="flex items-center space-x-2">
            <svg width="20px" height="20px" class="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="font-semibold text-sm" id="toggleText">Hide order summary 
              <i class="fas fa-angle-down"></i></span>
            <svg id="chevronIcon":class="['w-5 h-5 transition-transform duration-200 transform', isCollapsed ? 'rotate-0' : 'rotate-180']" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div class="font-semibold">${{ total }}</div>

        </div>
        <Transition name="collapse">
          <main class="mx-2 lg:mx-3" v-if="!isCollapsed">
            <table class="w-full bg-white text-sm sm:text-base">
              <tbody>
                <CartItemSkeleton v-if="cartLoading" />
                <CartItem v-else v-for="item in productCart" :key="item.product_id" :item="item" />
                <!-- Discount -->
                <tr v-if="productCart.length > 0" id="discounttr" class="border-t">
                  <td colspan="2" class="px-2 sm:px-3">
                    <CustomInput v-model="formStore.formValues.discountCode" type="text" placeholder="Discount Code"
                      class="sm:mr-3 mt-2" width="w-full" />
                  </td>
                  <td class="pr-2 pt-4">
                    <CustomButton placeholder="Apply" @click="calculateDiscount" />
                  </td>
                </tr>
                <!-- Discount MSG -->
                <tr>
                  <td colspan="3" class="px-2 sm:px-3">
                    <!-- Coupon Success Messages -->
                    <div v-if="cartStore.couponSuccess.length">
                      <p v-for="(coupon, index) in cartStore.couponSuccess" :key="'success-' + index"
                        class="flex items-center justify-center gap-1 mt-2 xl:text-sm text-xs bg-blue-100 px-2 py-1 rounded-md font-semibold">
                        <span class="text-green-700">{{ coupon.code }},</span>
                        <span>{{ coupon.msg }}</span>
                        <!-- Cross Svg -->
                        <span v-if="coupon.code !== 'VIP10'" class="cursor-pointer" @click="removeCoupon(coupon.code)">
                          <svg class="inline" height="20" fill="red" xmlns="http://www.w3.org/2000/svg"
                            xml:space="preserve" viewBox="0 0 92 92" id="cross">
                            <path
                              d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z">
                            </path>
                          </svg>
                        </span>
                      </p>
                    </div>
                    <!-- Coupon Error Message -->
                    <div v-if="cartStore.couponError.msg">
                      <p class="mt-2 xl:text-sm text-xs font-semibold bg-red-100 px-2 text-center py-1 rounded-md">
                        <span class="text-red-500">{{ cartStore.couponError.code }}, </span>
                        <span>{{ cartStore.couponError.msg }}</span>
                      </p> <!-- Only show the first error message -->
                    </div>
                  </td>
                </tr>
              </tbody>
              <Spacer :mt="4" />
              <CartSummary :loading="cartLoading" :summaryItems="summaryItems" />
            </table>
          </main>
        </Transition>
      </section>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";
import { useFormStore, useCheckoutStore } from "~/stores";
import CartItem from "./CartItem.vue";
import CartItemSkeleton from "./CartItemSkeleton.vue";
import CartSummary from "./CartSummary.vue";

// formStore
const checkoutStore = useCheckoutStore();

// FormStore
const formStore = useFormStore();

// Cart Store
const cartStore = useCartStore();

// Track Collapse state
const isCollapsed = ref(false);

const productCart = computed(() => cartStore.productCart);
const total = computed(() => cartStore.cartTotal.toFixed(2));
const shipping = computed(() => cartStore.shipping.toFixed(2));
const cartLoading = computed(() => cartStore.cartLoading);
const cartTotalLoading = computed(() => cartStore.cartTotalLoading);
const shippingLoading = computed(() => cartStore.shippingLoading);
const vipOptIn = computed(() => checkoutStore.vipOptIn);
const shippingThreshold = computed(() => checkoutStore.shippingThreshold);
const { removeCoupon } = cartStore;

// Prepare summary items
// const summaryItems = computed(() => [
//   { name: "Shipping", value: vipOptIn.value ? 'FREE' : shippingThreshold.value ? 'FREE' : shipping, loading: shippingLoading.value }, // Example static value
//   { name: "Total", value: total.value, loading: cartTotalLoading.value ? cartTotalLoading.value : false }, // Ensure this is a computed value
// ]);
const summaryItems = computed(() => {
  const thankyouCase = storage.getSessionItem('thankyouCase');

  return [
    {
      name: "Shipping",
      value: thankyouCase
        ? 'FREE'
        : vipOptIn.value || shippingThreshold.value
          ? 'FREE'
          : shipping,
      loading: shippingLoading.value
    },
    { name: "Total", value: total.value, loading: cartTotalLoading.value ? cartTotalLoading.value : false },
  ];
});

</script>
<style scoped></style>