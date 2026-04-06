<template>
  <section id="header" class="bg-[#F6FDF8]">
    <!-- Heading -->
    <div class="bg-[#4b6b24] px-4">
      <p class="text-white text-center font-medium text-sm sm:text-base lg:text-lg py-1">
        <strong> Winter Sale: </strong> Save up to 65% Off!
      </p>
    </div>
    <!-- Header Images -->
    <div
      class="flex flex-col lg:flex-row lg:max-w-[1200px] 2xl:max-w-[1400px] mx-auto justify-between items-center py-4 px-4 gap-3 lg:gap-5">
      <div>
        <NuxtImg src="/images/logo.svg" alt="TacticalXabs-logo" class="w-[250px] sm:w-[300px] lg:w-[360px] h-auto" />
      </div>
      <div class="border-2 border-[#dde4df] p-3 rounded-md">
        <p class="text-center text-sm sm:text-base lg:text-lg font-semibold uppercase mb-2">secure checkout</p>
        <NuxtImg src="/images/secure-checkout.svg" alt="secure-checkout"
          class="w-[300px] sm:w-[350px] lg:w-[375px] h-auto" />
      </div>
      <div class="hidden lg:block">
        <NuxtImg src="/images/rating.svg" alt="ratings" class="lg:w-[224px] h-auto" loading="lazy"
          :placeholder="[224]" />
      </div>
    </div>
  </section>
  <!-- Main Body header -->
  <header class="lg:my-7 px-4">
    <h1 class="responsive-heading">Rapidly Shred Belly Fat With The Tactical X
      Muscle Stimulator</h1>
  </header>
</template>
<style scoped>
.responsive-heading {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
}

@media (min-width: 640px) {
  .responsive-heading {
    font-size: 1.125rem;
    /* sm:text-lg */
  }
}

@media (min-width: 1024px) {
  .responsive-heading {
    font-size: 1.5rem;
    /* lg:text-2xl */
  }
}
</style>
