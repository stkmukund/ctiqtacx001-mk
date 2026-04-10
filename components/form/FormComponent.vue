<template>
  <form @submit.prevent="">
    <div class="w-full max-w-6xl mx-auto lg:flex py-0">
      <!-- Left -->
      <div class="lg:w-7/12 w-full px-2 lg:px-3 bg-white h-full">
        <div class="left-div ">
          <!-- First Box -->
          <section v-if="!thankyouCase" id="first-box" class="border-0 border-[#dde4df] rounded-md">
            <!-- <LimitedStock class-name="p-2 lg:p-3" /> -->
            <OrderQuanitySelector class-name="p-2 lg:p-3" />
            <!-- Order Now -->
            <!-- Note -->

            <VipDetails class-name="p-2 lg:p-3" />
          </section>
          <Spacer v-if="!thankyouCase" />
          <!-- Second Box -->
          <section id="second-box" class="mx-2 lg:mx-3">
            <ShippingInfo :formValues="formStore.formValues" :errors="formStore.errors" />
            <BillingInfo v-if="formStore.formValues.sameAddress === 'different'" :formValues="formStore.formValues"
              :errors="formStore.errors" />
            <Spacer />
            <section>
              <SectionLabel title="Shipping Method" />
              <Spacer />

              <div class="px-0 lg:px-0 pb-3 mt-7">
              <CustomSelect v-if="formStore.formValues.country || formStore.formValues.billingCountry"
                v-model="formStore.formValues.shippingMethod" :errorMessage="formStore.errors.shippingMethod"
                :options="checkoutStore.vipOptIn ? shippingStore.freeShipping : checkoutStore.shippingThreshold ? shippingStore.freeShipping : shippingStore.shippingMethods"
                placeholder="Select Shipping Method" optionsValue="shipProfileId" displayName="profileName" />
                 </div>
            </section>
           
          </section>
          <Spacer />
          <!-- Third Box -->
          <section id="third-box" class="mx-2 lg:mx-3">
            <OneTimeOffer />
          </section>
        </div>
        <Spacer />
      </div>
      <!-- Right -->
      <div class="lg:w-5/12 sm:w-full max-w-full px-2 lg:px-3 mx-3 bg-gray-100">
        <div class="">
          <!-- Left Box 1 -->
          <section id="left-box-1">

            <span class="flex lg:text-xl text-lg font-medium sm:font-medium gap-1 mb-4 text-[#0A609B]">
              <img :src="'/images/cart.png'" class="w-6" /> Order Summary</span>
            <Cart />
            <!-- Second Part for Mobile -->
            <!-- <Spacer />
            <div class="flex lg:hidden items-center gap-4 p-2 lg:p-3">
              <NuxtImg src="/images/moneyback1.webp" alt="gurantee safe checkout" class="w-[102px] h-[102px]" />
              <p class="font-medium text-xs"><strong>30 DAY GUARANTEE:</strong> If you are not completely thrilled with
                your
                <strong>Tactical X Muscle</strong> Stimulator - we are offering you a 30 day guarantee on all purchases.
                Simply send the item(s) back to
                us for a full refund or replacement, less S & H.
              </p>
            </div>
            <Spacer /> -->
            <!-- Payment -->
            <!-- <SectionLabel class-name="" title="Payment Information" /> -->

            <div class="lg:p-3 p-1 mt-4 border">
              <span class="flex lg:text-xl text-lg font-medium sm:font-medium gap-1 text-[#000]">
                Payment Information</span>
              <Spacer :mt="1" />
              <PaymentInfo :formValues="formStore.formValues" :errors="formStore.errors" class-name="" />
              <!-- Purchase Button -->

              <section id="purchaseButton" class="p-2 lg:p-3">
                <p class="text-gray-600 text-center pt-0">By clicking on 'Complete Order' below you agree to our <a
                    href="#" class="underline font-bold text-black">Terms of Service</a> and <a href="#"
                    class="underline text-black font-bold">Privacy Policy</a>.</p>
                <!-- <CustomButton v-if="formStore.formValues.paymentMethod !== 'PAYPAL' && !transactionStatus"
                placeholder="COMPLETE ORDER" size="large" :color="false" @click="formStore.handleSubmit"
                buttonType="submit" /> -->
                <CustomButton v-if="formStore.formValues.paymentMethod !== 'PAYPAL' && !transactionStatus" size="large"
                  :color="false" @click="formStore.handleSubmit" buttonType="submit">
                  <span class="flex items-center justify-center gap-2 tracking-wide">
                    COMPLETE ORDER
                    <img :src="'/images/1lock.png'" class="w-5 h-5" />
                  </span>
                </CustomButton>

                <PurchaseSpinner v-if="transactionStatus" />
              </section>
            </div>
            <Spacer />
            <section id="gurantees" class="bg-gray-50">
              <!-- First Part -->
              <!-- <div class="flex flex-col items-center">
                <p class="font-medium sm:font-bold text-xs sm:text-sm lg:text-base"> 🔒 This is a 256-Bit Secure SSL
                  Connection</p>
                <NuxtImg src="/images/gurantee-checkout.webp" alt="gurantee safe checkout" class="w-full h-auto"
                  loading="lazy" :placeholder="[380]" />
              </div> -->
              <Spacer />
              <!-- Second Part -->
              <div class="flex flex-wrap items-center gap-2 p-2 lg:p-3">
               <div class="flex flex-row items-center gap-2"><NuxtImg src="/images/check.png" alt="People Trust Ust" class="lg:w-6 w-5 " />
                <h3 class="font-bold lg:text-xl text-base">Why Do Over 100,000 People Trust Us?</h3></div> 
                <p class="text-sm">Our mission at Tactical X Abs is to empower you on your fitness journey without
                  breaking the bank. We're so confident you will see incredible results that we offer a 30-day
                  money-back guarantee, no questions asked.</p>
              </div>
              <Spacer />
            </section>
          </section>
          <!-- Box 2 without border -->
          <section id="box-2">
            <!-- Title -->
            <div class="text-center items-center justify-center my-7 bg-white p-5 w-full rounded-md">

              <p class="px-4 text-2xl mb-3 font-semibold text-gray-900 whitespace-nowrap">
                Customer Testimonials
              </p>
              <div class="flex items-center justify-center gap-3">
                <p class="text-6xl font-extrabold">4.9/5
                <div class="flex items-center text-yellow-400">

                  <!-- 4 Full Stars -->
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z" />
                  </svg>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z" />
                  </svg>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z" />
                  </svg>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z" />
                  </svg>

                  <!-- Half Star -->
                  <div class="relative w-5 h-5">
                    <!-- Gray -->
                    <svg class="absolute w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z" />
                    </svg>

                    <!-- Yellow Half -->
                    <div class="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z" />
                      </svg>
                    </div>
                  </div>

                </div>


                </p>
              </div>
              <p class="text-xl text-center mt-2">Based on 100,000+ reviews...</p>
            </div>
            <!-- Testimonial Using from FAQ component -->
            <div class="p-3 bg-white">
              <Testimonial />
            </div>
            <Spacer />
            <div class="p-0 sm:items-center sm:justify-between gap-3">

              <!-- Text -->
              <p class="font-bold text-sm sm:text-xl">
                Need help? Contact our 24/7 customer support:
              </p>

              <!-- Contact Section -->
              <div class="flex flex-row sm:flex-row sm:items-center lg:gap-4 gap-1">

                <!-- Phone -->
                <a href="tel:+17752041037" class="flex items-center gap-1 text-gray-700 hover:text-black transition">
                  <span class="w-7 h-7 flex items-center justify-center border rounded-full text-sm">
                    <img :src="'/images/phone.png'" class="w-5 h-5" />
                  </span>
                  <span class="text-xs sm:text-base font-medium">
                    +1 (775) 204-1037
                  </span>
                </a>

                <!-- Email -->
                <a href="mailto:help@tacticalabs.com"
                  class="flex items-center gap-1 text-gray-700 hover:text-black transition">
                  <span class="w-7 h-7 flex items-center justify-center border rounded-full text-sm">
                    <img :src="'/images/email.png'" class="w-5 h-5" />
                  </span>
                  <span class="text-xs sm:text-base font-medium">
                    help@tacticalabs.com
                  </span>
                </a>

              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useFormStore, useCartStore, useCheckoutStore, useShippingStore } from "~/stores";
import Spacer from "../Spacer.vue";
import BillingInfo from "./BillingInfo.vue";
import CustomButton from "../CustomButton.vue";
import Cart from "../orderSummary/Cart.vue";
import VipDetails from "../vipBox/VipDetails.vue";
import { LimitedStock, ShippingInfo, PaymentInfo, OrderQuanitySelector, OneTimeOffer, Testimonial } from "./export";
import { lazy } from "zod";

// const thankyouCase = storage.getSessionItem("thankyouCase");

// FormStore
const formStore = useFormStore();
const shippingStore = useShippingStore();
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
