<template>
  <section id="paymentManagemen" :class="className">
    <small class="font-poppins font-medium">All transactions are secure and encrypted</small>
    <div class="mt-2 border border-solid border-[#dadada] rounded-lg">
      <label for="creditCard" @click="() => handlePaymentOptionClick('CREDITCARD')"
        class="font-montserrat font-semibold flex items-center justify-between p-4 text-lg cursor-pointer">
        <!-- Right Section -->
        <aside class="flex items-center gap-2 sm:gap-3">
          <div
            :class="['w-3 h-3 rounded-full', formStore.formValues.paymentMethod === 'CREDITCARD' ? 'bg-green-500' : 'bg-white border border-gray-400']">
          </div>
          <span>Credit/Debit Card</span>
        </aside>
        <NuxtImg src="/images/card.svg" loading="lazy" class="w-24 sm:w-34" />
      </label>
      <Transition>
        <div v-if="formStore.formValues.paymentMethod === 'CREDITCARD'" class="bg-[#fafafa] p-4">
          <CustomInput id="cardNumber" v-model="formValues!.cardNumber" type="text" placeholder="Card Number"
            :errorMessage="errors!.cardNumber" :maxLength="16" regex="^[0-9]*$" />
          <div class="sm:flex sm:space-x-4">
            <CustomInput id="expiryMonth" v-model="formValues!.expiryMonth" type="text" placeholder="MM"
              :errorMessage="errors!.expiryMonth" :maxLength="2" regex="^[0-9]*$" />
            <CustomInput id="expiryYear" v-model="formValues!.expiryYear" type="text" placeholder="YYYY"
              :errorMessage="errors!.expiryYear" :maxLength="4" regex="^[0-9]*$" />
            <CustomInput id="cvv" v-model="formValues!.cvv" type="text" placeholder="CVV Code"
              :errorMessage="errors!.cvv" :maxLength="4" regex="^[0-9]*$" />
          </div>
        </div>
      </Transition>
      <aside @click="() => handlePaymentOptionClick('PAYPAL')"
        class="flex font-semibold items-center gap-2 sm:gap-3 p-4 text-lg cursor-pointer">
        <div
          :class="['w-3 h-3 rounded-full', formStore.formValues.paymentMethod === 'PAYPAL' ? 'bg-green-500' : 'bg-white border border-gray-400']">
        </div>
        <span>
          <NuxtImg src="/images/paypal-title.svg" loading="lazy" class="w-24 sm:w-34" />
        </span>
      </aside>
      <Transition>
        <div v-if="formStore.formValues.paymentMethod === 'PAYPAL'" class="bg-[#fafafa] p-6">
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

// formStore
const formStore = useFormStore();
const { handleSubmit } = formStore;

// Handle payment options click
const handlePaymentOptionClick = (option: string) => {
  formStore.formValues.paymentMethod = option;
};
</script>
