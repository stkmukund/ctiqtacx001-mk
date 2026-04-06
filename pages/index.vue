<template>
  <CheckoutHeader />
  <section class="container mx-auto lg:max-w-[1169px] 2xl:max-w-[1320px]">
    <FormComponent />
  </section>
  <ClientOnly>
    <LazyCheckoutFooter />
    <lazyAlert message="" />
    <LazyConfirmPaypalLoading />
  </ClientOnly>
</template>
<script lang="ts" setup>
import { CheckoutHeader } from "~/components/export";
import { useCartStore, useCheckoutStore, useFormStore, useShippingStore } from "~/stores";
const LazyAlert = defineAsyncComponent(() => import("~/components/Alert.vue"));
const LazyConfirmPaypalLoading = defineAsyncComponent(() => import("~/components/ConfirmPaypalLoading.vue"));
const LazyCheckoutFooter = defineAsyncComponent(() => import("~/components/CheckoutFooter.vue"));

definePageMeta({
  middleware: 'save-params'
});

const route = useRoute();
// Checkout Store
const checkoutStore = useCheckoutStore();

const ba_token = route.query.ba_token;
const payerID = route.query.PayerID;
if (payerID || ba_token) checkoutStore.updateConfirmPaypalLoading(true);
const productsParams = route.query.products;
const affId = route.query.affId;
const tester = route.query.cctester;

// Cart Store
const cartStore = useCartStore();
const { addProduct, loadCart, updateTacticalLabsCart } = cartStore;

// Shipping Store
const shippingStore = useShippingStore();
const { setCountry, setShippingMethods } = shippingStore;


const { updateVipProduct, addRequestUri, addPageType, addIpInfo, addAffId, updateStiProduct } = checkoutStore;
addPageType("checkoutPage");
if (tester) checkoutStore.updateTester(true);
// setUTMparams(route.query);

// formStore
const formStore = useFormStore();
// Fetch the results asynchronously
function fetchCampaignResults() {
  loadCart("true");
  requestIdleCallback(async () => {
    try {
      const { cartDetails, countries, shipProfiles, vipProductData, stiProductData } =
        await campaignQuery(productsParams);
      // debugger;
      const info = await fetchIpInfo(); // get ip address
      if (info) addIpInfo(info);
      if (cartDetails) updateTacticalLabsCart(cartDetails);
      else addProduct(emptyCart);
      if (vipProductData) updateVipProduct(vipProductData);
      if (stiProductData) updateStiProduct(stiProductData);
      if (countries) setCountry(countries);
      if (shipProfiles) await setShippingMethods(shipProfiles);
      addAffId(affId);
      setTimeout(() => {
        formStore.billSame();
      }, 1000);
      await getRequestUri().then(url => addRequestUri(url)); // add requestUri in store
      importClick();
    } catch (error) {
      console.error("Error fetching campaign results:", error);
    } finally {
      loadCart("false");
      fbCAPI("Checkout");
      setTimeout(() => {
        dataLayer("Checkout");
      }, 1000);

      const thankyouCase = storage.getSessionItem('thankyouCase');
      if (thankyouCase) {
        formStore.formValues.shippingMethod = '2';
      }
      if (checkoutStore.vipOptIn) {
        checkoutStore.updateVipOptIn(true);
      }
      if (checkoutStore.stiOptIn) {
        checkoutStore.updateStiOptIn(true);
      }
    }
  });
}

function setupCopyProtection() {
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData("text/plain", "Copying is not allowed. All rights reserved ©");
    }
  });
}

onMounted(() => {
  requestIdleCallback(async () => {
    loadCart("true");
    // Disable the write click
    setTimeout(async () => {
      setupCopyProtection();
      checkSteps();
      await confirmPaypal(); // need to test
      // Call the function
      setTimeout(() => {
        fetchCampaignResults();
        // moved here so that products can also load after coming back from PayPal
      }, 1000);
    }, 2000);

  })

});
</script>
