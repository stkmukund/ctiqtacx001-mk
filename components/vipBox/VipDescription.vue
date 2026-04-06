<template>
  <p class="p-3 border-[4px] border-[#ccc] border-t-0 text-xs leading-5">
    <b class="font-semibold">Read More: </b>
    When you take advantage of our VIP Customer Benefits + Free S&H offer, you will save $4.99 on your purchase today.
    VIP customers receive tons of amazing benefits like free monthly products (A $100 Value), exclusive discounts and
    deals, special giveaways and more! Best of all, we let all of our VIP members to take advantage of their
    benefits
    for free over the first 30 days to make sure they love our VIP program. You can access all of your VIP benefits that
    are sure to save you hundreds of dollars per year for only ${{ vipProductPrice }} billed monthly after trying
    the service for
    free for 30 days. Keeping our customers happy is our #1 priority here at {{ svarBrand }} so if for any reason you
    don't
    absolutely love being a VIP Customer just let us know by emailing {{ svarsiteEmail }} and we will cancel your VIP
    benefits no questions asked.
  </p>
</template>
<script setup>
const vipProductPrice = 34.73;
const svarBrand = useRuntimeConfig().public.svarBrandName;
const svarsiteEmail = useRuntimeConfig().public.email;
</script>