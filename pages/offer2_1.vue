<script setup lang="ts">
import { useCheckoutStore } from "~/stores";

definePageMeta({
    layout: 'custom'
})
const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);
const router = useRouter();
const config = useRuntimeConfig().public
const checkfacpi = router.options.history.state;

onMounted(async () => {
    await checkSteps();
 if (checkfacpi.from && checkfacpi.from == 'importupsell') {
        UpsellsfbCAPI(checkfacpi.datalayerobj);
        upsellsDataLayer(checkfacpi.datalayerobj);
        window.history.replaceState({}, '', window.location.pathname + window.location.search)
    }
    importClick();
    upsell();
});

let allVariants: { productSku: string; variantDetailId: string; productQty: string }[] = [];
const upsell = async () => {
    const { productId, variants,title } = await upsellProducts(config.offer2_1);
    productDetails.value.productId = productId;
    productDetails.value.ItemName=title;
    allVariants = variants
}

const selectedQuantity = ref(1);
const isFirstSelected = ref(true);
const gellpads = ref('12 Extra Gel Pads');

const packs: { [key: string]: { offerprice: number; gelPads: number,variantDetailId:number } } = { pack1: { offerprice: 14.99, gelPads: 10, variantDetailId:81}, pack2: { offerprice: 35.88, gelPads: 20, variantDetailId:82} }

const productDetails: any = ref({
    productId: "",
    productQty: 1,
    variantDetailId: "",
    pageTo: "/offer3",
    event: "Downsell2cv",
})

const selectedPack = ref('pack1');
const handlePackSelector = (pack: string) => {
    gellpads.value = ref(pack === 'pack2' ? '96 Extra Gel Pads' : '12 Extra Gel Pads');
    selectedPack.value = pack;
    isFirstSelected.value = pack === 'pack1';
};


// Route to next page
const mayBeLater = async () => {
    checkoutStore.setStepCompleted(5);
    router.push({ path: '/offer3' });
}

const imageList = ref<string[]>([
    "/images/offer2/gelpads1.webp",
    "/images/offer2/gel-pads2.webp",
    "/images/offer2/gel-pads3.webp",
    "/images/offer2/gel-pads4.webp"
])

const handlePurchase = () => {
    // console.log('1111111',allVariants);
    //     console.log('22',packs[selectedPack.value]);

       const filteredVariant = allVariants.find((variant) => Number(variant.variantDetailId) === packs[selectedPack.value].variantDetailId);
    if (filteredVariant) {
        productDetails.value.variantDetailId = filteredVariant.variantDetailId;
        productDetails.value.productQty = selectedQuantity;
        productDetails.value.productPrice=filteredVariant.price;
        importUpsell(productDetails.value)
    } else {
        console.error("No matching variant found for the selected options.");
    }
}

const selectedImage = ref<string>(imageList.value[0])

const imageSelector = (index: number) => {
    selectedImage.value = imageList.value[index]
};
</script>
<template>
     <section id="offer2_1" class="bg-white text-gray-800">
        <!-- Main Content Box -->
        <div class="container-fluid bg-gray-100">
            <div class="p-3 md:p-2 text-center max-w-4xl mx-auto">
                 <h2 class="text-[10px] md:text-xs lg:text-sm mb-1"><b>Last Chance!</b> Keep Your Tactical X Abs Stimulator Sticky for Longer with Extra Gel Pads <b>up to 78% Off!</b>
                </h2>

            </div>
        </div>
        <div class="max-w-5xl mx-auto px-4">
            <!-- Comparison Section -->
            <div class="flex flex-col md:flex-row items-top justify-center p-2 md:p-2">

                <!-- Image Container -->
                <div class="max-w-sm mb-2 mx-auto bg-white">
                    <NuxtImg :src="selectedImage" alt="" class="h-72 w-72" />
                    <!-- Image Selectors -->
                    <div class="flex space-x-2 mt-3">
                        <NuxtImg v-for="(source, index) in imageList" :src="source" :key="index"
                            class="w-16 h-16 border-2 rounded cursor-pointer" @click="() => imageSelector(index)" />
                    </div>
                </div>
           <div class="max-w-xl mx-auto text-center pt-1 px-5 pb-5 lg:block hidden">
                <h2 class="font-bold text-sm md:text-base mb-1">10,000+ Satisfied Customers!</h2>

                <div class="md:px-1 gap-1">
                    <div class="flex items-start lg:gap-3 gap-1 mb-2 border rounded-md lg:p-2 p-1 border-gray-300">
                        <!-- Profile Image -->
                        <NuxtImg src="/images/offer2/testimonials/rev22.webp" alt="Profile"
                            class="w-10 h-10 rounded-full object-cover border" />

                        <div class="flex-1">
                            <!-- Star Rating and Name -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <!-- Star icons -->
                                    <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                        class="lg:w-14 w-12 lg:mr-1" />
                                    <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Frank H. - Phoenix,
                                        AR</span>
                                </div>

                                <!-- Verified Badge -->
                                <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                    <span>Verified review</span>
                                    <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                                </div>
                            </div>

                            <!-- Review Text -->
                            <p class="mt-0 leading-tight text-left text-xs">
                              I love my Tactical X. I use it every day it
                                seems, and I have
                                had to change the gel pads a few times. But here is a tip, it’s best to buy as many as
                                you can because
                                the more you get, the more you save. You’ll have to change them eventually, so why not
                                just get the best
                                price?
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start lg:gap-3 gap-1 mb-1 border rounded-md lg:p-2 p-1 border-gray-300">
                        <!-- Profile Image -->
                        <NuxtImg src="/images/offer2/testimonials/rev11.webp" alt="Profile"
                            class="w-10 h-10 rounded-full object-cover" />

                        <div class="flex-1">
                            <!-- Star Rating and Name -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <!-- Star icons -->
                                    <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                     class="lg:w-14 w-12 lg:mr-1" />
                                    <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Peter K. - Norfolk,
                                        VA</span>
                                </div>

                                <!-- Verified Badge -->
                                <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                    <span>Verified review</span>
                                    <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                                </div>
                            </div>

                            <!-- Review Text -->
                            <p class="mt-0 leading-tight text-left text-xs">
                                Great replacement gel pads and they fit Tactical X perfectly. Quick to replace and they
                                usually last me
                                around 2 weeks before needing to be changed. My Tactical X is always working the best
                                thanks to these.
                            </p>
                        </div>
                    </div>


          <div class="flex items-start lg:gap-3 gap-1 mb-1 border rounded-md lg:p-2 p-1 border-gray-300">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev33.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                class="lg:w-14 w-12 lg:mr-1" />
                                    <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Pamela M. -
                                    Columbia</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-0 leading-tight text-left text-xs">
                           I was worried because I’m not that good with DIY stuff but changing the gel pads was so easy. Took me less than a minute.
                        </p>
                    </div>
                </div>

                <div class="flex items-start lg:gap-3 gap-1 mb-1 border rounded-md lg:p-2 p-1 border-gray-300">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev44.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                  class="lg:w-14 w-12 lg:mr-1" />
                                    <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Lamar T. - Seattle, WA

                                </span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                            </div>
                        </div>

                        <!-- Review Text -->
                      <p class="mt-0 leading-tight text-left text-xs">
                            So stoked these replacement gel pads are on for such a fantastic price. They make such a
                            difference in the
                            conductivity of my Tactical X Abs. And these gel pads have never been priced so low. Take
                            advantage while
                            you can! I sure did.
                        </p>
                    </div>
                </div>
             </div>
            </div>
                    </div>
                    </div>
                     <div class="lg:max-w-4xl max-w-3xl  lg:px-0 px-3 py-4 mx-auto bg-white">
            <div class="py-0 mb-3">
                       <div class="max-w-sm pl-3 mx-auto mb-1">
                            <NuxtImg src="/images/offer2/5stars.webp" alt="" class="w-32 md:w-20" />
                        </div>
                   <div class="w-full mb-1 md:mb-1 text-center text-sm md:text-sm font-medium">
                            <del class="text-red-500 text-sm">Regular price: $159.99</del>

                            <strong class="text-lg"> Today's Price: from  ${{ isFirstSelected ? (packs.pack1.offerprice *
                                    selectedQuantity).toFixed(2) :
                                    (packs.pack2.offerprice * selectedQuantity).toFixed(2) }}</strong>
                        </div>
                    </div>

                            <!-- Pack Selectors -->
                    <div class="w-full max-w-xl mx-auto my-3">
  <!-- Heading with lines -->
        <!-- Select Amount Text -->
                        <div class="relative text-center my-3">
                            <div
                                class="absolute left-0 top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2">
                            </div>
                            <span class="bg-white px-2 text-sm font-semibold relative">Select Desired <span
                                    class="text-black">Gel Pads per Packet</span></span>
                        </div>

                        <!-- Gel Pad Buttons -->
                        <div class="flex justify-center mb-2 gap-1">
                            <button @click="() => handlePackSelector('pack1')"
                                :class="['text-xs md:text-sm px-4 py-2 rounded shadow', isFirstSelected ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 ']">
                                12 Extra Gel Pads</button>
                            <button @click="() => handlePackSelector('pack2')"
                                :class="['border text-xs md:text-sm border-gray-300 px-4 py-2 rounded shadow', !isFirstSelected ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 ']">
                                96 Extra Gel Pads</button>
                        </div>
<div class="relative text-center my-3">
                            <div
                                class="absolute left-0 top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2">
                            </div>
                            <span class="bg-white px-2 text-sm font-semibold relative z-10">Select Number<span
                                    class="text-black"> of Packets</span></span>
                        </div>
    <div class="flex justify-center gap-2 mt-2">
 <div class="flex justify-center mb-0">
                            <select v-model="selectedQuantity" class="border rounded px-2 py-1 text-xs">
                                <option v-for="length in 10" :value="length" :key="length">{{ length }}
                                </option>
                            </select>
                        </div>

</div>
</div>

                    <div class="max-w-xl mx-auto p-2 md:p-2 bg-white">
                        <p class="text-sm mx-auto mb-1">After regular use of the Tactical X Abs Stimulator, the Gel Pads that stick the device to your body will get dirty and lose their stickiness. These will need to be replaced, so stock up now with this unbeatable price!</p>
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="font-semibold lg:text-base text-xs">{{ gellpads
                                        }} <span
                                        >({{ packs[selectedPack].supply }})</span>
                                </p>
                            </div>
                            <div class="text-right">

                                <p class="text-xs md:text-base font-semibold">
                                    <!-- <span class="text-[10px] text-gray-500 font-normal line-through">${{
                                        packs[selectedPack].originalPrice }}</span> -->
                                        <br>
                                   ${{ isFirstSelected ? (packs.pack1.offerprice *
                                    selectedQuantity).toFixed(2) :
                                    (packs.pack2.offerprice * selectedQuantity).toFixed(2) }}
                                </p>
                            </div>
                        </div>

                        <!-- Divider -->
                        <hr class="my-1 border-gray-200">

                        <!-- Total Row -->
                        <div class="flex justify-between">
                            <p class="font-semibold text-base text-gray-700">Total</p>
                            <p class="text-base font-normal text-gray-700">${{ isFirstSelected ? (packs.pack1.offerprice *
                                    selectedQuantity).toFixed(2) :
                                    (packs.pack2.offerprice * selectedQuantity).toFixed(2) }}</p>
                        </div>
                        </div>
                        <div class="mx-auto flex items-center justify-center my-3">
                            <button v-if="!transactionStatus" @click="handlePurchase"
                                class="w-96 py-2 bg-[#30BD51] text-white font-semibold text-lg text-center uppercase">
                                COMPLETE CHECKOUT
                            </button>
                            <PurchaseSpinner v-else/>
                        </div>
                        <p class="lg:text-sm text-xs text-center mb-2 mt-1">We will ship it out to you FREE in the same order</p>
                        <div class="flex justify-center pb-5">
                            <a @click="mayBeLater"
                                class="cursor-pointer lg:text-sm text-xs text-gray-800 underline hover:text-gray-800 items-center text-center">
                                No thank you, I don’t want to take advantage of this one-time offer
                            </a>

                        </div>
                    </div>

                    <div class="max-w-xl mx-auto text-center pt-1 px-5 pb-5 lg:hidden block">
            <h2 class="font-bold text-sm md:text-base mb-1">10,000+ Satisfied Customers!</h2>

            <div class="md:px-1 gap-1">
                <div class="flex items-start lg:gap-3 gap-1 mb-2 border rounded-md lg:p-2 p-1 border-gray-300">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev22.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover border" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                    class="lg:w-14 w-12 lg:mr-1" />
                                <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Frank H. - Phoenix,
                                    AR</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-0 leading-tight text-left text-xs">
                            I love my Tactical X. I use it every day it
                            seems, and I have
                            had to change the gel pads a few times. But here is a tip, it’s best to buy as many as
                            you can because
                            the more you get, the more you save. You’ll have to change them eventually, so why not
                            just get the best
                            price?
                        </p>
                    </div>
                </div>

                <div class="flex items-start lg:gap-3 gap-1 mb-1 border rounded-md lg:p-2 p-1 border-gray-300">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev11.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                    class="lg:w-14 w-12 lg:mr-1" />
                                <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Peter K. - Norfolk,
                                    VA</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-0 leading-tight text-left text-xs">
                            Great replacement gel pads and they fit Tactical X perfectly. Quick to replace and they
                            usually last me
                            around 2 weeks before needing to be changed. My Tactical X is always working the best
                            thanks to these.
                        </p>
                    </div>
                </div>


                <div class="flex items-start lg:gap-3 gap-1 mb-1 border rounded-md lg:p-2 p-1 border-gray-300">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev33.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                    class="lg:w-14 w-12 lg:mr-1" />
                                <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Pamela M. -
                                    Columbia</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-0 leading-tight text-left text-xs">
                            I was worried because I’m not that good with DIY stuff but changing the gel pads was so
                            easy. Took me less than a minute.
                        </p>
                    </div>
                </div>

                <div class="flex items-start lg:gap-3 gap-1 mb-1 border rounded-md lg:p-2 p-1 border-gray-300">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev44.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                    class="lg:w-14 w-12 lg:mr-1" />
                                <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Lamar T. - Seattle, WA

                                </span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1  text-[10px] text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-4" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-0 leading-tight text-left text-xs">
                            So stoked these replacement gel pads are on for such a fantastic price. They make such a
                            difference in the
                            conductivity of my Tactical X Abs. And these gel pads have never been priced so low. Take
                            advantage while
                            you can! I sure did.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <Alert message="" :pageTo="'/offer3'" :stepCompleted="5" />
</template>