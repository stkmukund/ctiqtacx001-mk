<template>
  <section :class="className">
    <div id="one_time" class="mt-1 w-full p-[5px]">
      <VipTimer />
      <VipOffer />
    </div>
    <VipDescription />
  </section>
</template>
<script setup>
import VipDescription from "./VipDescription.vue";
import VipOffer from "./VipOffer.vue";
import VipTimer from "./VipTimer.vue";

defineProps({
  className: {
    type: String,
    default: "",
    required: false,
  },
});
</script>
