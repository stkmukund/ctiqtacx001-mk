<template>
  <div>
    <FormSectionHeader label="Customer Info" />
    <CustomInput id="email" v-model="formValues.email" type="email" placeholder="Email (For Order Confirmation)"
      :errorMessage="errors.email" :maxLength="50" :submitPartialOrder="submitPartialOrder" />

    <section id="phone-field">
      <CustomInput id="phone" v-model="formValues.phone" type="text" placeholder="Phone (For Courier Delivery)"
        :errorMessage="errors.phone" :maxLength="14" regex="^[0-9]*$" :submitPartialOrder="submitPartialOrder" />

    </section>
  </div>
</template>

<script setup>
import { useCheckoutStore } from "~/stores";
import CustomInput from "../CustomInput.vue";
import FormSectionHeader from "../FormSectionHeader.vue";

const props = defineProps({
  formValues: Object,
  errors: Object,
});
// Checkout store
const checkoutStore = useCheckoutStore();

// Directly assign the customerInfo array to inputFields
const inputFields = inputConfig.customerInfo;
const handleEmailOptIn = () => {
  checkoutStore.emailOptIn = !checkoutStore.emailOptIn;
}
</script>
