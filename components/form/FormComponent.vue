<template>
  <form @submit.prevent="">
    <div class="flex flex-wrap mt-7 lg:max-w-[1200px] 2xl:max-w-[1400px] mx-auto">
      <!-- Left -->
      <div class="lg:w-6/12 w-full px-2 lg:px-3 ">
        <div class="left-div">
          <!-- First Box -->
          <section v-if="!thankyouCase" id="first-box" class="border-2 border-[#dde4df] rounded-md">
            <LimitedStock class-name="p-2 lg:p-3" />
            <OrderQuanitySelector class-name="p-2 lg:p-3" />
            <!-- Order Now -->
            <p class="text-base font-semibold text-center -mt-2 mb-4"><span>Order now... only <strong
                  class="text-red-500">4</strong>
                left in stock</span></p>
            <!-- Note -->
            <div class="border border-dashed border-black p-2 lg:p-3 text-center text-sm">
              <span class="bg-[#ffff00] font-bold p-1 pb-0">Note:</span>
              All Stimulators come with 1-Set of Gel-Pads already attached, so your device is ready to use right out of
              the box!
            </div>
            <VipDetails class-name="p-2 lg:p-3" />
          </section>
          <Spacer v-if="!thankyouCase" />
          <!-- Second Box -->
          <section id="second-box" class="border-2 border-[#dde4df] rounded-md">
            <ShippingInfo :formValues="formStore.formValues" :errors="formStore.errors" />
          </section>
          <Spacer />
          <!-- Third Box -->
          <section id="third-box" class="border-2 border-[#dde4df] rounded-md">
            <OneTimeOffer />
          </section>
        </div>
        <Spacer />
      </div>
      <!-- Right -->
      <div class="lg:w-6/12 sm:w-full max-w-full px-2 lg:px-3">
        <div class="">
          <!-- Left Box 1 -->
          <section id="left-box-1" class="border-2 border-[#dde4df] rounded-md">
            <SectionLabel class-name="" title="Order Summary" />
            <Cart />
            <!-- Second Part for Mobile -->
            <Spacer />
            <div class="flex lg:hidden items-center gap-4 p-2 lg:p-3">
              <NuxtImg src="/images/moneyback1.webp" alt="gurantee safe checkout" class="w-[102px] h-[102px]" />
              <p class="font-medium text-xs"><strong>30 DAY GUARANTEE:</strong> If you are not completely thrilled with
                your
                <strong>Tactical X Muscle</strong> Stimulator - we are offering you a 30 day guarantee on all purchases.
                Simply send the item(s) back to
                us for a full refund or replacement, less S & H.
              </p>
            </div>
            <Spacer />
            <!-- Payment -->
            <SectionLabel class-name="" title="Step 3: Payment Information" />
            <Spacer :mt="1" />
            <PaymentInfo :formValues="formStore.formValues" :errors="formStore.errors" class-name="p-2 lg:p-3" />
            <!-- Purchase Button -->
            <section id="purchaseButton" class="p-2 lg:p-3">
              <CustomButton v-if="formStore.formValues.paymentMethod !== 'PAYPAL' && !transactionStatus"
                placeholder="COMPLETE SECURE PURCHASE" size="large" :color="false" @click="formStore.handleSubmit"
                buttonType="submit" />
              <PurchaseSpinner v-if="transactionStatus" />
            </section>
            <Spacer />
            <section id="gurantees">
              <!-- First Part -->
              <div class="flex flex-col items-center">
                <p class="font-medium sm:font-bold text-xs sm:text-sm lg:text-base"> 🔒 This is a 256-Bit Secure SSL
                  Connection</p>
                <NuxtImg src="/images/gurantee-checkout.webp" alt="gurantee safe checkout" class="w-[380px] h-[107px]"
                  loading="lazy" :placeholder="[380]" />
              </div>
              <Spacer />
              <!-- Second Part -->
              <div class="hidden lg:flex items-center gap-8 p-2 lg:p-3">
                <NuxtImg src="/images/moneyback1.webp" alt="gurantee safe checkout" />
                <p class="font-[400]"><strong>30 DAY GUARANTEE:</strong> If you are not completely thrilled with your
                  Tactical X Muscle
                  Stimulator - we are offering you a 30 day guarantee on all purchases. Simply send the item(s) back to
                  us for a full refund or replacement, less S & H.</p>
              </div>
              <Spacer />
            </section>
          </section>
          <!-- Box 2 without border -->
          <section id="box-2">
            <!-- Title -->
            <div class="flex items-center justify-center my-7">
              <div class="flex-grow border-t border-1 lg:w-32 border-gray-300"></div>
              <span class="px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                VERIFIED CUSTOMER REVIEWS
              </span>
              <div class="flex-grow border-t border-1 lg:w-32 border-gray-300"></div>
            </div>
            <!-- Testimonial Using from FAQ component -->
            <Testimonial />
            <Spacer />
          </section>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useFormStore, useCartStore, useCheckoutStore } from "~/stores";
import Spacer from "../Spacer.vue";
import CustomButton from "../CustomButton.vue";
import Cart from "../orderSummary/Cart.vue";
import VipDetails from "../vipBox/VipDetails.vue";
import { LimitedStock, ShippingInfo, PaymentInfo, OrderQuanitySelector, OneTimeOffer, Testimonial } from "./export";
import { lazy } from "zod";

// const thankyouCase = storage.getSessionItem("thankyouCase");

// FormStore
const formStore = useFormStore();

// cartStore
const cartStore = useCartStore();
const couponSuccess = ref(cartStore.couponSuccess);

// Checkout store
const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);

watch(
  () => cartStore.couponSuccess,
  (newCouponSuccessAvailable) => {
    couponSuccess.value = newCouponSuccessAvailable; // Update new coupon list after removal
  }
);

const thankyouCase = ref(storage.getSessionItem("thankyouCase"));
setTimeout(() => {
  thankyouCase.value = storage.getSessionItem("thankyouCase");
}, 500);
</script>
