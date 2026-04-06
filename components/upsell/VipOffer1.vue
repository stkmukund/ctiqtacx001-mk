<script setup lang="ts">
import { useCheckoutStore } from '~/stores';
import Footer from '../vipUpsell/Footer.vue';

const props = defineProps<{
    mayBeLater: () => void;
    handlePurchase: () => void;
}>();

const offers = ref([
    {
        title: "3-pack FlexiKnee™️ - Natural Knee Pain Patches",
        price: "$119.95 Value",
    },
    {
        title: "VIP Customer Benefits",
        price: "",
    },
    {
        title: "FREE Same Day Processing",
        price: "$9.99 Value",
    },
    {
        title: "FREE Expedited Shipping",
        price: "$9.99 Value",
    },
    {
        title: "FREE Monthly Products",
        price: "Over $400 Value",
    }
])

const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);
</script>

<template>
    <section class="">
        <div class="container lg:w-3/4 sm:w-full mx-auto bg-white shadow-xl mb-24 py-4 px-1 sm:py-6 sm:px-4">
            <h1 class="text-3xl lg:text-5xl font-bold text-center text-black">
                <span class="text-[#393D46]">Hurry...</span> Don't Miss Your <span class="text-[#393D46]">BONUS
                    OFFER!</span>
            </h1>
            <h2 class="text-xl lg:text-3xl font-semibold text-center text-black mt-2">
                Get This Amazing <span class="text-[#393D46]">One Time Offer</span> Today Only!
            </h2>

            <div class="flex-col flex lg:flex-row mt-8 sm:mt-12">
                <!-- left side -->
                <div class="w-full xl:w-1/2 px-4">
                    <div class="">
                        <!-- Header -->
                        <div
                            class="relative bg-[#393D46] text-white text-center py-2 sm:py-3 rounded-t-lg font-bold text-base sm:text-xl">
                            EXCLUSIVE OFFER
                            <div class="absolute sm:-top-7 -top-4 sm:-right-5 -right-6">
                                <NuxtImg src="/images/offer1/save.webp" alt="save-img" class="w-16 sm:w-24" />
                            </div>
                        </div>
                        <!-- Content -->
                        <div class="py-4 px-2 border-2 border-[#393D46] bg-[#f7f7f7] rounded-b-lg w-full">
                            <div class="flex items-start gap-4 px-2 w-full">
                                <NuxtImg src="images/offer1/up2_vip.webp" alt="logo" class="sm:w-16 w-8" />
                                <div class="w-full">
                                    <div v-for="(offer, index) in offers" :key="index"
                                        class="w-full flex items-start justify-between gap-8"
                                        :class="[index > 1 ? 'font-medium text-[10px] md:text-base mb-1 text-nowrap' : 'font-bold text-xs md:text-lg mb-2']">
                                        <h3 class="w-4/5 flex items-start">
                                            <NuxtImg v-if="index > 1" src="/images/offer1/tick.svg" alt="tick"
                                                width="18" height="20" class="mt-[2px]" /> {{ offer.title }}
                                        </h3>
                                        <p class="text-red-600 font-bold text-nowrap text-right">{{ offer.price }}</p>
                                    </div>
                                    <div class="mt-6">
                                        <h3 class="text-base sm:text-2xl font-bold text-red-600">Total Value Over $540!!
                                        </h3>
                                        <p class="text-[10px] font-medium sm:text-sm text-nowrap">$31.67/mo. Zero Risk & 100% Satisfaction
                                            Guaranteed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between px-10 sm:px-14 mt-6">
                        <div class="text-center text-[#393D46]">
                            <p class="font-semibold">Total Value Over:</p>
                            <h3 class="text-2xl font-bold line-through">$540</h3>
                        </div>
                        <div class="text-center text-red-600">
                            <p class="font-semibold ">Your Price Today</p>
                            <h2 class="text-2xl font-bold">$31.67</h2>
                        </div>
                    </div>

                    <div class="text-center mt-6">
                        <button v-if="!transactionStatus" @click="handlePurchase"
                            class="w-full py-4 bg-[#00C2CB] text-white text-base sm:text-2xl font-semibold rounded-lg shadow-lg">
                            Complete My Order
                        </button>
                        <PurchaseSpinner v-if="transactionStatus" />

                        <button @click="props.mayBeLater" class="mt-4 text-gray-800 font-semibold underline">
                            No thanks, I don't want this deal.
                        </button>
                    </div>
                </div>
                <!-- right Side -->
                <div class="w-full lg:w-1/2 px-4 mt-6 lg:mt-0 flex justify-center h-fit">
                    <NuxtImg src="images/offer1/right-side.webp" alt="logo"
                        class="rounded-lg border-4 border-[#393D46] w-5/6 lg:w-4/5" />
                </div>
            </div>
        </div>
    </section>

    <Footer />
</template>
