<template>
    <div class="">
        <section id="header"
            class="max-w-screen-xl mx-auto py-4 px-5 sm:px-10 flex flex-col gap-2 sm:flex-row sm:gap-0 items-center justify-between">
            <div class="w-[100px] lg:w-[120px]">
                <NuxtImg src="/images/logo.webp" loading="eager" alt="logo" />
            </div>
            <div class="bg-[#e8e8e8] rounded-full flex items-center gap-2 px-6 py-1">
                <!-- Warning -->
                <div class="sm:w-[20px] w-[15px]">
                    <NuxtImg src="/images/warning.svg" loading="eager" alt="logo" />
                </div>
                <p class="text-[10px] sm:text-base font-semibold">Offer will expire when the window is closed.</p>
            </div>
        </section>
    </div>
    <section id="header" class="bg-black text-base sm:text-xl py-2 sm:py-4 flex items-center justify-center gap-4">
        <div class="bg-[#d8d8d8] w-fit py-2 px-16 rounded-r-xl hidden lg:block">
            <p class="uppercase"><span class="font-bold">step 1:</span> checkout</p>
        </div>
        <div class="bg-[#393D46] text-white w-fit py-2 px-16 rounded-r-xl">
            <p class="uppercase"><span class="font-bold">step 2:</span> special offer</p>
        </div>
        <div class="bg-[#d8d8d8] w-fit py-2 px-16 rounded-r-xl hidden lg:block">
            <p class="uppercase"><span class="font-bold">step 3:</span> summary</p>
        </div>
    </section>
</template>