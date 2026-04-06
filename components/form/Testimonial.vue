<template>
  <div v-for="testimonial in testimonials" :key="testimonial.profileImg"
    class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
    <!-- Profile Image -->
    <NuxtImg :src="testimonial.profileImg" alt="Profile"
      class="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] m-1 rounded-full object-cover" loading="lazy" />

    <div class="flex-1 ">
      <!-- Star Rating and Name -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <!-- Star icons -->
          <NuxtImg src="/images/testimonials/tps.svg" alt="star" class="w-[90px] h-[17px] mr-1 lg:mr-5"
            loading="lazy" />
          <span class="font-semibold lg:text-base text-xs sm:text-sm text-gray-900">- {{ testimonial.name }}</span>
        </div>

        <!-- Verified Badge -->
        <div class="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
          <span>Verified review</span>
          <NuxtImg src="/images/testimonials/verified.webp" alt="" class="w-4 sm:w-6" loading="lazy" />
        </div>
      </div>

      <!-- Review Text -->
      <p class="mt-2 leading-relaxed font-medium text-[10px] sm:text-xs lg:text-sm">{{ testimonial.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { lazy } from 'zod';


const testimonials = ref([
  {
    name: "Jeremy K.",
    profileImg: "/images/testimonials/rev6.webp",
    description: "As a busy restaurant manager, I don’t have time to go to the gym. This revolutionary device allows me to get a workout in each day whilest doing my daily accounting. Highly recommend it."
  },
  {
    name: "Debby F.",
    profileImg: "/images/testimonials/rev5.webp",
    description: "I have been using this twice a day for almost 2 weeks and already see a noticeable difference. My stomach is a lot tighter, more defined and flatter. You can feel your abs pulsating when you use it so I know it’s activating them. I use it on mode one level 5-7 on the lower part of my stomach then again on the upper part. Also I have had no issues with charging it and it holds a charge for about 1 week. Don’t hesitate just buy it!"
  },
  {
    name: "Jerry B.",
    profileImg: "/images/testimonials/rev1.webp",
    description: "This thing was a little weird at first but I ended up loving it. The best thing is I can be doing anything and feel like I'm working my abs at the same time! I've already shed some pounds after 2 weeks of using this."
  },
  {
    name: "John R.",
    profileImg: "/images/testimonials/rev2.webp",
    description: "It works great and is super easy to use. I've seen results and will continue to use - give it a try!"
  },
  {
    name: "Matthew A.",
    profileImg: "/images/testimonials/rev3.webp",
    description: "I love this abs stim. Busy family life and work doesn't leave me much time to go to a gym, this device has been a lifesaver!!"
  },
]);

const openIndex = ref(0);

function toggleAccordion(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>
