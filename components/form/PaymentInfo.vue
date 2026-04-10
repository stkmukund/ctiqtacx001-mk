<template>
  <section id="paymentManagemen" :class="className">
    <small class="font-poppins font-medium capitalize">All transactions are secure and encrypted</small>
    <div class="mt-2 border border-solid border-[#dadada] rounded-lg bg-white">
      <label for="creditCard" @click="() => handlePaymentOptionClick('CREDITCARD')"
        class="font-semibold flex items-center justify-between p-2 text-lg cursor-pointer">
        <!-- Right Section -->
        <aside class="flex items-center gap-1 sm:gap-3">
          <div @click="formStore.formValues.paymentMethod = 'CREDITCARD'" :class="[
            'w-5 h-5 rounded-full flex items-center justify-center cursor-pointer border-2',
            formStore.formValues.paymentMethod === 'CREDITCARD'
              ? 'border-[#0075FF]'
              : 'border-gray-400'
          ]">
            <div v-if="formStore.formValues.paymentMethod === 'CREDITCARD'" class="w-3 h-3 rounded-full bg-[#0075FF]">
            </div>
          </div>
          <span class="lg:text-base text-xs">Credit Card</span>
        </aside>
        <aside class="flex items-center lg:gap-2 gap-1">
          <NuxtImg src="/images/card.png" loading="lazy" class="w-32 sm:w-40" />
          <span class="lg:text-xs text-[10px] text-gray-300 whitespace-nowrap">
            and more...
          </span>
        </aside>
      </label>
      <Transition>
        <div v-if="formStore.formValues.paymentMethod === 'CREDITCARD'" class="bg-gray-100 p-2">

          <!-- Card Number -->
          <div class="relative mb-3">
            <CustomInput id="cardNumber" v-model="formValues!.cardNumber" type="text" placeholder="Card Number"
              :errorMessage="errors!.cardNumber" :maxLength="16" regex="^[0-9]*$" />

            <!-- Lock Icon -->
            <img :src="'/images/lock-black.png'"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-auto opacity-100 pointer-events-none" />

          </div>

          <!-- Expiry + CVV -->
          <div class="sm:flex sm:space-x-4">

            <!-- Expiry -->
            <div class="relative w-full mb-3 sm:mb-0">
              <!-- <CustomInput id="expiryMonth" v-model="formValues!.expiryMonth" type="text" placeholder="MM/YY" -->
              <!-- :errorMessage="errors!.expiryMonth" :maxLength="4" regex="^[0-9]*$" /> -->
              <CustomInput id="expiryMonth" v-model="expiryInput" type="text" placeholder="MM/YY"
                :errorMessage="errors!.expiryMonth" :maxLength="5" />
            </div>

            <!-- CVV -->
            <div class="relative w-full">
              <CustomInput id="cvv" v-model="formValues!.cvv" type="text" placeholder="CVV" :errorMessage="errors!.cvv"
                :maxLength="4" regex="^[0-9]*$" />

              <!-- Tooltip Wrapper -->
              <div class="absolute right-3 top-1/2 -translate-y-1/2 group">

                <!-- Question Icon -->
                <img :src="'/images/question.png'" class="w-4 h-auto cursor-pointer" />

                <!-- Tooltip -->
                <div
                  class="absolute bottom-6 right-0 w-52 h-auto hidden group-hover:block bg-black text-white text-xs rounded px-3 py-2 text-center">
                  3-digit security code usually found on the back of your card. American Express cards have a 4-digit
                  code located on the front.

                </div>

              </div>

            </div>
          </div>
        </div>
      </Transition>
      <aside @click="() => handlePaymentOptionClick('PAYPAL')"
        class="flex font-semibold items-center gap-2 sm:gap-3 p-2 text-lg cursor-pointer border-t-2">
        <div @click="formStore.formValues.paymentMethod = 'PAYPAL'" :class="[
          'w-5 h-5 rounded-full flex items-center justify-center cursor-pointer border-2 transition-all duration-200',
          formStore.formValues.paymentMethod === 'PAYPAL'
            ? 'border-[#0075FF]'
            : 'border-gray-400'
        ]">
          <div v-if="formStore.formValues.paymentMethod === 'PAYPAL'" class="w-3 h-3 rounded-full bg-[#0075FF]"></div>
        </div>
        <span>
          <NuxtImg src="/images/paypal.png" loading="lazy" class="w-24 sm:w-34" />
        </span>
      </aside>
      <Transition>
        <div v-if="formStore.formValues.paymentMethod === 'PAYPAL'" class="bg-gray-100 p-4">
          <NuxtImg @click="handleSubmit" src="/images/new-paypal-logo.webp" class="w-2/3 mx-auto cursor-pointer"
            loading="lazy" />
        </div>
      </Transition>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useFormStore } from "~/stores";
import CustomInput from "../CustomInput.vue";

defineProps({
  formValues: Object,
  errors: Object,
  className: String,
});

const expiryInput = ref('');

// formStore
const formStore = useFormStore();
const { handleSubmit } = formStore;

// Handle payment options click
const handlePaymentOptionClick = (option: string) => {
  formStore.formValues.paymentMethod = option;
};

watch(expiryInput, (val) => {
  if (!val) {
    formStore.formValues.expiryMonth = '';
    formStore.formValues.expiryYear = '';
    return;
  }

  // Remove non-numeric
  let clean = val.replace(/\D/g, '');

  // Format MM/YY
  if (clean.length >= 3) {
    expiryInput.value = clean.slice(0, 2) + '/' + clean.slice(2, 4);
  } else {
    expiryInput.value = clean;
  }

  // Store separately
  formStore.formValues.expiryMonth = clean.slice(0, 2);
  formStore.formValues.expiryYear = clean.length >= 4 ? clean.slice(2, 4) : '';

});
</script>
