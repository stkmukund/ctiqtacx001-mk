<template>
  <table class="bg-[#FFD439] text-xs">
    <tbody>
      <tr class="flex gap-2 p-2">
        <td>
          <NuxtImg id="pulse1" alt="left-arrow" src="/images/right-arrow.svg" width="22" height="13"
            class="min-w-[30px] h-auto" />
        </td>
        <td>
          <input v-model="vipOptIn" @click="() => updateVipOptIn(false)" id="checkbox" type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer" />
        </td>
        <td>
          <p class="font-semibold cursor-pointer" @click="() => updateVipOptIn(false)">
            Claim FREE S&H on my order today (Save $4.99). This offer expires once you leave the page! I am 18 years or older
            and agree to the <a href="http://policy.tacticalxabs.com/tacticalxabs/policies/terms.html" target="_blank"
              class="link">terms and
              conditions</a> and <a href="http://policy.tacticalxabs.com/tacticalxabs/policies/privacy.html" target="_blank"
              class="link">privacy
              policy</a>.
          </p>
        </td>
        <td>
          <NuxtImg id="pulse1" alt="left-arrow" src="/images/left-arrow.svg" width="22" height="13"
            class="min-w-[30px] h-auto" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { useCheckoutStore } from "~/stores/checkoutStore";

const checkoutStore = useCheckoutStore();
const { updateVipOptIn } = checkoutStore;
// Access vipOptIn directly from the store
const vipOptIn = computed(() => checkoutStore.vipOptIn);
</script>
<style scoped>
.link {
  color: #0008ff;
}

.link:hover {
  text-decoration: underline;
}
</style>
