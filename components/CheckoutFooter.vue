<template>
  <footer class="bg-green-50 mt-8 py-6 text-center text-xs sm:text-base text-gray-800 font-medium">
    <NuxtImg src="/images/logo.svg" alt="TacticalXAbs" class="mx-auto h-10 mb-2" />
    <p class="py-1"><a :href="links.contact" target="_blank">Contact</a> | <a :href="links.refundPolicy"
        target="_blank">Refund Policy</a> | <a :href="links.shippingPolicy"
        target="_blank">Shipping Policy</a> | <a :href="links.termsOfService" target="_blank">Terms of Service</a> | <a
        :href="links.privacyPolicy" target="_blank">Privacy Policy</a></p>
    <p class="mt-1 py-1">10785 W Twain Ave, Las Vegas, NV</p>
    <p>© {{ currentYear }} - Tactical X Abs</p>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear();
const links = {
  contact: "https://www.tacticalxabs.com/pages/contact",
  refundPolicy: "http://policy.tacticalxabs.com/tacticalxabs/policies/refunds.html",
  shippingPolicy: "http://policy.tacticalxabs.com/tacticalxabs/policies/shipping.html",
  termsOfService: "http://policy.tacticalxabs.com/tacticalxabs/policies/terms.html",
  privacyPolicy: "http://policy.tacticalxabs.com/tacticalxabs/policies/privacy.html",
}
</script>
