<template>
  <section id="header" class="bg-gray-100">
    <!-- Heading -->
    <div class="bg-[#4b6b24] px-4">
      <p class="text-white text-center font-medium text-sm sm:text-base lg:text-lg py-1">
        <!-- <strong> Winter Sale: </strong> Save up to 65% Off! -->
      </p>
    </div>
    <!-- Header Images -->
<div class="w-full bg-gray-100">
  
  <div class="w-full max-w-6xl mx-auto bg-white grid grid-cols-1 lg:grid-cols-12 sm:grid-cols-12">

    <!-- LEFT SIDE -->
    <div class="lg:col-span-7 col-span-12 flex flex-col items-center justify-center text-center px-4 py-6 md:py-5 space-y-2">
      
      <!-- Logo -->
      <img src="/images/logo.svg" alt="Logo" class="h-10 object-contain" />

     <!-- Reviews Section -->
<div class="flex flex-col items-center space-y-3 text-center">
  
  <!-- Customers -->
  <div class="flex items-center justify-center gap-2 text-sm text-gray-900 font-normal">
    
    <div class="flex -space-x-2">
      <img class="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white" src="/images/testimonials/rev1.webp" />
      <img class="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white" src="/images/testimonials/rev2.webp" />
      <img class="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white" src="/images/testimonials/rev3.webp" />
    </div>

    <span class="flex items-center gap-1">
      <span class="font-semibold">100,000+</span>
      <span>Customers</span>
      <img :src="'/images/flex-biceps.png'" class="lg:w-5 lg:h-5 w-3 h-3" />
    </span>

  </div>

  <!-- Rating + Badges -->
  <div class="flex flex-col items-center gap-2">
    
   

    <!-- Badges -->
    <div class="flex lg:flex-wrap flex-nowrap justify-center items-center lg:gap-4 gap-1 lg:text-sm text-[0.7rem] text-gray-800">
     <div class="flex items-center text-yellow-400">

  <!-- 4 Full Stars -->
    <svg class="lg:w-5 lg:h-5 w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z"/>
  </svg>
    <svg class="lg:w-5 lg:h-5 w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z"/>
  </svg>
    <svg class="lg:w-5 lg:h-5 w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z"/>
  </svg>
    <svg class="lg:w-5 lg:h-5 w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z"/>
  </svg>

  <!-- Half Star -->
 <div class="relative lg:w-5 lg:h-5 w-2 h-2">
    <!-- Gray -->
    <svg class="absolute lg:w-5 lg:h-5 w-2 h-2 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.962c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.375 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.962-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163l1.295-3.961z"/>
    </svg>

    <!-- Yellow Half -->
    <div class="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
      <svg class="lg:w-5 lg:h-5 w-2 h-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962h4.163c.969 0 1.371 1.24.588 1。8１l-3.37 ２．4４８ １．２８７ ３．９６２c．３．９２１－．７５５ １．６８８－１．５４ １．１１８L１０ １３．３４８l－３．３７５ ２．８７８c－．７８４．５７－１．８３８－．１９７－１．５３９－１．１１８l１．２８７－３．９６２－３．３７－２．４４８c－．７８３－．５７－．３８－１．８１＋０．５８８－１．８１h４．１６３l１．２９５－３．９６１z"/>
      </svg>
    </div>
  </div>

</div>  
      <div class="flex items-center gap-1">
        <img class="lg:w-5 w-2" src="/images/secure.png" />
        <span class="text-[10px] lg:text-sm">30-Day Money-Back Guarantee</span>
      </div>

      <div class="flex items-center gap-1">
        <img class="lg:w-5 w-2" src="/images/lock.png" />
        <span class="text-[10px] lg:text-sm">Secure Checkout</span>
      </div>

    </div>

  </div>

</div>

    </div>

    <!-- RIGHT SIDE -->
    <div class="md:col-span-5 bg-gray-100 min-h-[120px] md:min-h-full lg:block hidden"></div>

  </div>

</div> 

  </section>
  <!-- Main Body header -->
  <!-- <header class="lg:my-7 px-4">
    <h1 class="responsive-heading">Rapidly Shred Belly Fat With The Tactical X
      Muscle Stimulator</h1>
  </header> -->
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
