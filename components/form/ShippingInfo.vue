<template>
  <SectionLabel title="Contact Information" />
  <div class="px-0 lg:px-0 pb-5">
    <!-- <FormSectionHeader label="Shipping Information" /> -->
    <CustomInput id="email" v-model="formValues.email" type="email" placeholder="Email*" :errorMessage="errors.email"
      :maxLength="50" :submitPartialOrder="submitPartialOrder" />
  </div>
  <SectionLabel title="Shipping Address" />
  <small class="pl-0">Fields marked as (*) are required</small>
  <div class="px-0 lg:px-0 pb-3">
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0">
      <CustomInput id="firstName" v-model="formValues.firstName" type="text" placeholder="First Name*"
        :errorMessage="errors.firstName" :submitPartialOrder="submitPartialOrder" />
      <CustomInput id="lastName" v-model="formValues.lastName" type="text" placeholder="Last Name*"
        :errorMessage="errors.lastName" :submitPartialOrder="submitPartialOrder" />
    </div>
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0">
      <CustomInput id="address1" @focus="initAutocomplete" v-model="formValues.address1" type="text"
        placeholder="Address*" :errorMessage="errors.address1" :submitPartialOrder="submitPartialOrder" />
      <CustomInput id="address2" v-model="formValues.address2" type="text" placeholder="Apt, suite, etc. (optional)" />
    </div>

    <div class="sm:flex sm:space-x-4 lg:mb-2 mb-0">
      <div class="lg:w-1/3">
        <label for="country" id="ship-country-label">Country</label>
        <CustomSelect id="country" v-model="formValues.country" :options="countries" optionsValue="countryCode"
          displayName="countryName" :errorMessage="errors.country" @change="handleStateList"
          placeholder="Select country*" />
      </div>
      <div class="lg:w-1/3 -mt-1 lg:mt-0">
        <CustomInput id="postalCode" v-model="formValues.postalCode" type="text" placeholder="Zip Code*"
          :errorMessage="errors.postalCode" :maxLength="10" :submitPartialOrder="submitPartialOrder" />
      </div>
      <div class="lg:w-1/3">
        <label for="state" id="ship-country-label">State</label>
        <CustomSelect id="state" v-model="formValues.state" :options="shipState" optionsValue="stateCode"
          displayName="stateName" :errorMessage="errors.state" placeholder="Select state*" />
      </div>
    </div>
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0 -mt-1 lg:mt-2">
      <CustomInput id="city" v-model="formValues.city" type="text" placeholder="City*" :errorMessage="errors.city"
        :submitPartialOrder="submitPartialOrder" />
      <CustomInput id="phone" v-model="formValues.phone" type="text" placeholder="Phone*" :errorMessage="errors.phone"
        :maxLength="14" regex="^[0-9]*$" :submitPartialOrder="submitPartialOrder" />
    </div>

  </div>
  <SectionLabel title="Billing Address" />
  <div class="px-0 lg:px-0 pb-3 mt-3 mb-3">
    <div class="border rounded-lg p-4 space-y-3 border-gray-400">

      <!-- Option 1 -->
      <!-- <label class="flex items-center space-x-3 cursor-pointer" @click="handleBillSame">
        <input v-model="formValues.sameAddress" type="radio" name="billing" value="same"
          class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" selected />
        <span class="text-gray-800">Same as shipping address</span>
      </label> -->

      <!-- Option 2 -->
      <!-- <label class="flex items-center space-x-3 cursor-pointer" @click="handleBillDifferent">
        <input v-model="formValues.sameAddress" type="radio" name="billing" value="different"
          class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
        <span class="text-gray-800">Use a different billing address</span>
      </label> -->
      <!-- Option 1 -->
      <label class="flex items-center space-x-3 cursor-pointer">
        <input v-model="formValues.sameAddress" type="radio" name="billing" value="same"
          class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
        <span class="text-gray-800">Same as shipping address</span>
      </label>

      <!-- Option 2 -->
      <label class="flex items-center space-x-3 cursor-pointer">
        <input v-model="formValues.sameAddress" type="radio" name="billing" value="different"
          class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
        <span class="text-gray-800">Use a different billing address</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useShippingStore, useFormStore } from "~/stores";
import CustomInput from "../CustomInput.vue";
import CustomSelect from "../CustomSelect.vue";
import FormSectionHeader from "../FormSectionHeader.vue";

const shippingStore = useShippingStore();
const shippingStoreslist = shippingStore.shippingMethods;
const formStore = useFormStore();
const countries = ref(shippingStore.countries); // Make sure to use ref
const shipState = ref(shippingStore.shipState); // Make sure to use ref
// Handle the state list update
const handleStateList = () => {
  shippingStore.handleStateList();
};

const props = defineProps({
  formValues: Object,
  errors: Object,
});

// const handleBillSame = () => {
//   props.formValues.sameAddress = true
//   formStore.billSame("same");
// }
// const handleBillDifferent = () => {
//   props.formValues.sameAddress = false
//   formStore.billSame("different");
// }
// address auto complete
const initAutocomplete = () => {
  if (typeof google === 'undefined') {
    console.error("Google Maps API is not loaded.");
    return;
  }

  const input = document.querySelector('#address1');
  const autocomplete = new google.maps.places.Autocomplete(input)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place && place.formatted_address) {
      extractAddressComponents(place.address_components);
    }
  })
}

onMounted(() => {
  initAutocomplete(); // Initialize on component mount
});

// Watch for updates to countries from the store
watch(
  () => shippingStore.countries,
  (newCountries) => {
    countries.value = newCountries; // Update local countries
    shippingStore.handleStateList();
  }
);

// Watch for updates to shipState from the store
watch(
  () => shippingStore.shipState,
  (newShipState) => {
    shipState.value = newShipState; // Update local shipState
  }
);
</script>

