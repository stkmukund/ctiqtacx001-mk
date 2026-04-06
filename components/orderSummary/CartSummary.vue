<template>
  <tbody class="h-[40px] border-t">
    <tr v-for="(label, index) in summaryItems" :key="index">
      <td class="px-4 font-semibold">{{ label.name }}</td>
      <td class="px-4"></td>
      <td class="font-semibold text-right pr-4">
        <template v-if="!loading">
          <template v-if="label.loading">
            <LoadingSpinner />
          </template>
          <template v-else>
            <template v-if="label.value === 'FREE'">
              {{ label.value }}
            </template>
            <template v-else> ${{ label.value }}</template>

          </template>
        </template>
        <template v-else>
          <LoadingSpinner />
        </template>
      </td>
    </tr>
  </tbody>
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
