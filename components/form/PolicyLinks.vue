<template>
    <section id="policy-links" class="text-[10px] sm:text-sm flex items-center justify-between sm:justify-center sm:gap-4 font-semibold">
        <a v-for="{ name, url } in links" :href="url">{{ name }}</a>
    </section>
</template>
<script ts setup>
const links = [
    { name: 'Refund Policy', url: 'http://policy.tacticalxabs.com/tacticalxabs/policies/refunds.html' },
    { name: 'Shipping Policy', url: 'http://policy.tacticalxabs.com/tacticalxabs/policies/shipping.html' },
    { name: 'Terms of Service', url: 'http://policy.tacticalxabs.com/tacticalxabs/policies/terms.html' },
    { name: 'Privacy Policy', url: 'http://policy.tacticalxabs.com/tacticalxabs/policies/privacy.html' },
];
</script>