<template>
  <div class="px-0 lg:px-0 pb-3">
    <!-- <FormSectionHeader label="Billing Information" /> -->
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0">
      <CustomInput id="billingFirstName" v-model="formValues.billingFirstName" type="text" placeholder="First Name"
        :errorMessage="errors.billingFirstName" />
      <CustomInput id="billingLastName" v-model="formValues.billingLastName" type="text" placeholder="Last Name"
        :errorMessage="errors.billingLastName" />
    </div>
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0">
    <CustomInput id="billingAddress1" v-model="formValues.billingAddress1" type="text" placeholder="Address 1"
      :errorMessage="errors.billingAddress1" />
    <CustomInput id="billingAddress2" v-model="formValues.billingAddress2" type="text" placeholder="Apt, suite, etc. (optional)" />
   
      </div>
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0">
      <div class="lg:w-1/3">
        <label for="country" id="ship-country-label">Country</label>
        <CustomSelect id="billingCountry" v-model="formValues.billingCountry" :options="countries" optionsValue="countryCode"
          displayName="countryName" :errorMessage="errors.billingCountry" @change="handleBillStateList"
          placeholder="Select country*" />
      </div>
    <div class="lg:w-1/3 -mt-1 lg:mt-0">
        <CustomInput id="billingPostalCode" v-model="formValues.billingPostalCode" type="text" placeholder="Zip Code*"
          :errorMessage="errors.billingPostalCode" :maxLength="10" :submitPartialOrder="submitPartialOrder" />
      </div>
      <div class="lg:w-1/3">
        <label for="state" id="ship-country-label">State</label>
        <CustomSelect id="billingState" v-model="formValues.billingState" :options="billState" optionsValue="stateCode"
          displayName="stateName" :errorMessage="errors.billingState" placeholder="Select state*" />
      </div>
<!--    <CustomSelect id="billingCountry" v-model="formValues.billingCountry" :options="countries" optionsValue="countryCode"
        displayName="countryName" :errorMessage="errors.billingCountry" @change="handleBillStateList"
        placeholder="Select country" />
       <CustomInput id="billingPostalCode" v-model="formValues.billingPostalCode" type="text" placeholder="Zip Code"
        :errorMessage="errors.billingPostalCode" />
        <CustomSelect id="billingState" v-model="formValues.billingState" :options="billState" optionsValue="stateCode"
        displayName="stateName" :errorMessage="errors.billingState" placeholder="Select state" /> -->
    
    </div>
    <div class="sm:flex sm:space-x-4 lg:mb-3 mb-0 -mt-1 lg:mt-2">
      <CustomInput id="billingCity" v-model="formValues.billingCity" type="text" placeholder="City*" :errorMessage="errors.billingCity"
        :submitPartialOrder="submitPartialOrder" />
    </div>
   
  </div>
</template>

<script setup>
import CustomInput from "../CustomInput.vue";
import CustomSelect from "../CustomSelect.vue";
import FormSectionHeader from "../FormSectionHeader.vue";
import { useShippingStore } from "~/stores/shippingStore";

const props = defineProps({
  formValues: Object,
  errors: Object,
});

const shippingStore = useShippingStore();
const countries = ref(shippingStore.countries); // Make sure to use ref
const billState = ref(shippingStore.billState); // Make sure to use ref
// Handle the state list update
const handleBillStateList = () => {
  shippingStore.handleBillStateList();
};

// address auto complete
const initAutocomplete = () => {
  if (typeof google === 'undefined') {
    console.error("Google Maps API is not loaded.");
    return;
  }

  const input = document.querySelector('#billingAddress1');
  const autocomplete = new google.maps.places.Autocomplete(input)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place && place.formatted_address) {
      extractAddressComponents(place.address_components, 'bill');
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
    shippingStore.handleBillStateList();
  }
);

// Watch for updates to BillState from the store
watch(
  () => shippingStore.billState,
  (newBillState) => {
    billState.value = newBillState; // Update local BillState
  }
);
</script>
