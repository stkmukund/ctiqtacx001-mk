<template>
  <table class="w-full bg-white text-sm sm:text-base hidden sm:table">
    <tbody class="">
      <tr v-for="(label, index) in summaryItems" :key="index">
        <td class="px-4 py-1.5 font-semibold" width="80%">{{ label.name }}</td>
        <!-- <td class="px-4"></td> -->
        <td class="font-semibold text-right pr-4">
          <template v-if="!loading">
            <template v-if="label.loading">
              <LoadingSpinner />
            </template>
            <template v-else>
              <template v-if="label.value === 'FREE'">
                <span class="text-[#4B6B24]">{{ label.value }}</span>
              </template>
              <template v-else> <span
                  :class="{ 'text-[#4B6B24] ': (label.name === 'Shipping') || (label.name === 'Discount') }">
                  ${{ label.value }}
                </span> </template>
            </template>
          </template>
          <template v-else>
            <LoadingSpinner />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  summaryItems: Array<{
    name: string;
    value: Number | String; // Optional to handle cases where value might not be present
    loading?: boolean; // Optional to handle cases where loading status might be present
  }>;
  loading: boolean;
}>();
</script>
