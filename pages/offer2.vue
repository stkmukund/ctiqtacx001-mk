<script setup lang="ts">
import PurchaseSpinner from "~/components/PurchaseSpinner.vue";
import { useCheckoutStore } from "~/stores";

definePageMeta({
    layout: 'custom'
})
const checkoutStore = useCheckoutStore();
checkoutStore.addPageType("upsellPage2");
const transactionStatus = computed(() => checkoutStore.transactionStatus);
const router = useRouter();
const config = useRuntimeConfig().public;
const checkfacpi = router.options.history.state;


onMounted(async () => {
    await checkSteps();
    startCountdown();
 if (checkfacpi.from && checkfacpi.from == 'importupsell') {
        UpsellsfbCAPI(checkfacpi.datalayerobj);
        upsellsDataLayer(checkfacpi.datalayerobj);
        window.history.replaceState({}, '', window.location.pathname + window.location.search)
    }
    importClick();
    upsell();
});

const packs: { [key: string]: { originalPrice: number; offerPrice: number, gelPads: number; supply: string,variantDetailId:Number } } = {
    pack1: {
        originalPrice: 39.99,
        offerPrice: 19.99,
        gelPads: 12,
        supply: '1 month supply',
        variantDetailId:100
    },
    pack2: {
        originalPrice: 159.99,
        offerPrice: 39.99,
        gelPads: 96,
        supply: '12 months supply',
        variantDetailId:101
    },
}

const selectedPack = ref('pack1');

const handlePackSelector = (pack: string) => {
    selectedPack.value = pack
};

const productDetails: any = ref({
    productId: "",
    productQty: 1,
    productPrice: "",
    variantDetailId: "",
    pageTo: "/offer3",
    ItemName: "",
    event: "Upsell2cv"
})

// Route to next page
const mayBeLater = async () => {
    checkoutStore.setStepCompleted(3);
    router.push({ path: '/offer2_1' });
}

const imageList = ref<string[]>([
    "/images/offer2/gelpads1.webp",
    "/images/offer2/gel-pads2.webp",
    "/images/offer2/gel-pads3.webp",
    "/images/offer2/gel-pads4.webp"
])

const selectedImage = ref<string>(imageList.value[0])

const imageSelector = (index: number) => {
    selectedImage.value = imageList.value[index]
};

let allVariants: { productSku: string; variantDetailId: string }[] = [];
// Get Upsell product details
const upsell = async () => {
    const { productId, variants,title } = await upsellProducts(config.offer2);
    productDetails.value.productId = productId;
    productDetails.value.ItemName = title;
    allVariants = variants
}

const handlePurchase = () => {
    const filteredVariant = allVariants.find((variant) => Number(variant.variantDetailId) === packs[selectedPack.value].variantDetailId);
    if (filteredVariant) {
        productDetails.value.variantDetailId = filteredVariant.variantDetailId;
        productDetails.value.productPrice = packs[selectedPack.value].offerPrice;
        importUpsell(productDetails.value)
    } else {
        console.error("No matching variant found for the selected options.");
    }
}

const { minutes, seconds, startCountdown } = useCountdown(6, 15);
</script>
<template>
    <section id="offer2" class="bg-white text-gray-800">
        <!-- Main Content Box -->
        <div class="container-fluid bg-gray-100 ">
            <div class="p-3 md:p-2 shadow text-center">
                <h3 class="text-2xl md:text-lg font-bold mb-2">WAIT! Here’s an Exclusive Offer to Complement Your Order!
                </h3>
                <p class="text-center  md:text-sm">After using the Abs Stimulator every day, the Gel Pads that stick the
                    device
                    to your body get dirty and lose their stickiness. It’s best to replace<br> them from time-to-time.
                    <strong>Add
                        this to your order and get a 60% discount.</strong> We will ship it FREE with your other items.
                </p>
            </div>
        </div>
        <div class="container mx-auto px-4">
            <!-- Comparison Section -->
            <div class="flex flex-col md:flex-row items-top justify-center p-2 md:p-4">

                <!-- Image Container -->
                <div class="md:w-1/4 mb-4 mx-auto bg-white">
                    <NuxtImg :src="selectedImage" alt="" class="h-80 w-80" />
                    <!-- Image Selectors -->
                    <div class="flex space-x-2 mt-3">
                        <NuxtImg v-for="(source, index) in imageList" :src="source" :key="index"
                            class="w-14 h-14 border-2 rounded cursor-pointer" @click="() => imageSelector(index)" />
                    </div>
                </div>

                <div class="lg:w-2/4 bg-white md:pl-16">
                    <h3 class="font-bold text-3xl text-center md:text-lg">Keep Your Tactical X Muscle Stimulator Sticky
                        For Longer
                        With Extra Gel Pads</h3>
                    <div class="flex flex-col md:flex-row items-center justify-center py-2">
                        <div class="md:w-1/4 w-full">
                            <NuxtImg src="/images/offer2/5stars.webp" alt="" class="w-32 md:w-20 mx-auto" />
                        </div>
                        <div
                            class="md:w-3/4 w-full mb-6 md:mb-1 text-left text-base md:text-sm flex items-center flex-col md:flex-row gap-1 md:gap-2">
                            <del class="text-red-500 font-medium">Regular price: $159.99</del>
                            <strong>Today's Price: From $19.99</strong>
                        </div>
                    </div>

                    <div class="text-base md:text-sm mb-6 md:mb-3 text-center font-semibold" style="line-height: 1;">
                        Choose between 12 Gel Pads (1 month's supply for $19.99)<br>

                        or<br>

                        96 Gel Pads (12 month's supply for $39.99)
                    </div>

                    <!-- Pack Selectors -->
                    <div
                        class="md:space-x-2 mt-2 product-list max-w-lg flex flex-col md:flex-row mx-auto items-center justify-center gap-2">
                        <!-- Highlighted Offer -->
                        <label @click="() => handlePackSelector('pack1')"
                            class="overflow-hidden flex items-center border rounded cursor-pointer transition-colors duration-200 p-2 space-x-2 w-full relative">
                            <input type="radio" :checked="selectedPack === 'pack1'" name="product"
                                class="form-radio text-blue-500 w-5 h-5 md:w-3 md:h-3" />
                            <NuxtImg src="/images/offer2/10-Gel-Pads.jpeg" alt="Product" class="w-16 border md:w-10" />
                            <span
                                class="absolute md:-right-7 -right-9 top-4 md:top-3 w-[120px] text-center text-white text-xs py-1 rotate-[40deg]"
                                style="background: #000;">12</span>
                        </label>
                        <label @click="() => handlePackSelector('pack2')"
                            class="overflow-hidden flex items-center border rounded cursor-pointer transition-colors duration-200 p-2 space-x-2 w-full relative">
                            <input type="radio" :checked="selectedPack === 'pack2'" name="product"
                                class="form-radio text-blue-500 w-5 h-5 md:w-3 md:h-3" />
                            <NuxtImg src="/images/offer2/10-Gel-Pads.jpeg" alt="Product" class="w-16 border md:w-10" />
                            <span
                                class="absolute md:-right-7 -right-9 top-4 md:top-3 w-[120px] text-center text-white text-xs py-1 rotate-[40deg]"
                                style="background: #2e408c;">96</span>
                        </label>

                    </div>


                    <!-- Product Row -->
                    <div class="mx-auto p-2 md:p-4 bg-white">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-semibold text-sm">{{ packs[selectedPack].gelPads }} Extra Gel Pads <span
                                        class="font-normal">({{ packs[selectedPack].supply }})</span>
                                </p>
                            </div>
                            <div class="text-right">

                                <p class="text-lg md:text-sm font-semibold">
                                    <span class="text-xs text-gray-400 font-light line-through">${{
                                        packs[selectedPack].originalPrice }}</span> &nbsp;
                                    ${{ packs[selectedPack].offerPrice }}
                                </p>
                            </div>
                        </div>

                        <!-- Divider -->
                        <hr class="my-1 border-gray-200">

                        <!-- Total Row -->
                        <div class="flex justify-between">
                            <p class="font-semibold text-sm text-gray-700">Total</p>
                            <p class="text-sm font-semibold text-gray-700">${{ packs[selectedPack].offerPrice }}</p>
                        </div>
                        <div class="mx-auto flex items-center justify-center mt-3">
                            <button v-if="!transactionStatus" @click="handlePurchase"
                                class="bg-[#30bd51] p-4 text-white text-xl shadow-lg rounded-lg mb-1 w-96">
                                COMPLETE CHECKOUT
                            </button>
                            <PurchaseSpinner v-if="transactionStatus" />

                        </div>
                        <p class="text-sm text-center mb-3">We will ship it out to you FREE in the same order</p>
                        <NuxtImg src="/images/offer2/guarantees.webp" alt="gurantee img" class="w-full mx-auto mb-3" />
                        <p class="text-base mb-5">People everywhere are raving about Tactical X and
                            <strong>how fast this incredible muscle stimulator can help you on your fitness
                                journey.</strong>
                            <br><br>
                            And TODAY, Tactical X is offering a fantastic discount on replaceable gel pads that will
                            keep the best
                            conductivity <strong>between Tactical X and your body.</strong>
                            <br><br>
                            At some point, you’re going to need to replace your gel pads, so stock up NOW at the best
                            price!
                        </p>
                        <ul class="list-disc ml-4">
                            <li>Made of high quality hydrogel</li>
                            <li>Easy to replace with no tools or assistance</li>
                            <li>Improves the conductivity and effectiveness of your Tactical X Muscle Stimulator</li>
                        </ul>

                        <div class="w-full p-2 border text-center my-3">
                            <!-- Headline -->
                            <p class="font-regular text-gray-800 md:text-lg text-sm mb-2">
                                <span class="font-bold">Act Fast:</span><br />
                                Increase the effectiveness of your Tactical X with replaceable gel pads.<br />
                                This offer is only available for the next:
                            </p>

                            <!-- Timer -->
                            <div class="flex justify-center space-x-6 mt-2 mb-2 text-gray-700">
                                <div class="text-center">
                                    <p class="text-3xl font-light">00</p>
                                    <p class="text-xs text-gray-500">Hours</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-3xl font-light">{{ minutes.toString().padStart(2, '0') }}</p>
                                    <p class="text-xs text-gray-500">Minutes</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-3xl font-light">{{ seconds.toString().padStart(2, '0') }}</p>
                                    <p class="text-xs text-gray-500">Seconds</p>
                                </div>
                            </div>

                            <!-- Decline link -->

                        </div>
                        <div class="flex justify-center">
                            <a @click="mayBeLater"
                                class="cursor-pointer text-sm text-gray-600 underline hover:text-gray-800 items-center text-center">
                                No thank you, I don’t want to take advantage of this one-time offer
                            </a>

                        </div>
                    </div>

                </div>


            </div>
        </div>
        <div class="bg-gray-100 w-full text-center py-6 px-2 leading-8">
            <h3 class="font-bold text-2xl mb-2">For A Limited Time</h3>
            <p class="mb-4">Grab Tactical X replaceable Gel Pads for an unbeatable price!</p>

            <ul>
                <li> ✅ Don’t get fooled by knockoffs or cheap imitations</li>
                <li> ✅ Designed exclusively for Tactical X Abs</li>
                <li> ✅ Key part of Tactical X Abs conductivity</li>
                <li> ✅ Incredible discount for a limited-time</li>
            </ul>


            <div class="mx-auto flex items-center justify-center mt-3">
                <button v-if="!transactionStatus" @click="handlePurchase"
                    class="bg-[#30bd51] p-4 text-white text-xl shadow-lg rounded-lg mb-1 w-96">
                    COMPLETE CHECKOUT
                </button>
                <PurchaseSpinner v-if="transactionStatus" />
            </div>
            <p class="text-sm text-center mb-3">We will ship it out to you FREE in the same order</p>
            <NuxtImg src="/images/offer2/guarantees.webp" alt="" class="h-12 mx-auto mb-3" />
            <a @click="mayBeLater"
                class="cursor-pointer text-sm md:text-base underline text-gray-500 text-center line-clamp-3">
                No thank you, I don’t want to take advantage of this one-time offer</a>

        </div>
        <div class="container mx-auto px-4">
            <div class="mx-auto text-center pt-3">
                <h2 class="font-bold text-xl md:text-2xl mb-4">1000+ Customers Love This, and So Will You</h2>

                <div class="flex flex-col sm:flex-row items-top justify-between md:px-16 gap-4">
                    <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                        <!-- Profile Image -->
                        <NuxtImg src="/images/offer2/testimonials/rev22.webp" alt="Profile"
                            class="w-10 h-10 rounded-full object-cover" />

                        <div class="flex-1">
                            <!-- Star Rating and Name -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <!-- Star icons -->
                                    <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                        class="lg:w-24 w-16 lg:mr-2" />
                                    <span class="font-semibold lg:text-sm text-sm text-gray-900">- Frank H. - Phoenix,
                                        AR</span>
                                </div>

                                <!-- Verified Badge -->
                                <div class="flex items-center gap-1 text-xs text-gray-400">
                                    <span>Verified review</span>
                                    <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-6" />
                                </div>
                            </div>

                            <!-- Review Text -->
                            <p class="mt-2 leading-relaxed text-left">
                                <b>"Long-lasting and high-quality"</b><br>I love my Tactical X. I use it every day it
                                seems, and I have
                                had to change the gel pads a few times. But here is a tip, it’s best to buy as many as
                                you can because
                                the more you get, the more you save. You’ll have to change them eventually, so why not
                                just get the best
                                price?
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                        <!-- Profile Image -->
                        <NuxtImg src="/images/offer2/testimonials/rev11.webp" alt="Profile"
                            class="w-10 h-10 rounded-full object-cover" />

                        <div class="flex-1">
                            <!-- Star Rating and Name -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <!-- Star icons -->
                                    <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                        class="lg:w-24 w-16 lg:mr-2" />
                                    <span class="font-semibold lg:text-sm text-sm text-gray-900">- Peter K. - Norfolk,
                                        VA</span>
                                </div>

                                <!-- Verified Badge -->
                                <div class="flex items-center gap-1 text-xs text-gray-400">
                                    <span>Verified review</span>
                                    <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-6" />
                                </div>
                            </div>

                            <!-- Review Text -->
                            <p class="mt-2 leading-relaxed text-left">
                                <b>"Long-lasting and high-quality"</b><br>
                                Great replacement gel pads and they fit Tactical X perfectly. Quick to replace and they
                                usually last me
                                around 2 weeks before needing to be changed. My Tactical X is always working the best
                                thanks to these.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="flex flex-col sm:flex-row items-top justify-between md:px-16 text-sm gap-4">
                <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev33.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                    class="lg:w-24 w-16 lg:mr-2" />
                                <span class="font-semibold lg:text-sm text-sm text-gray-900">- Pamela M. -
                                    Columbia</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1 text-xs text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-6" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-2 leading-relaxed text-left">
                            <b>"Long-lasting and high-quality"</b><br>I was worried because I’m not that good with DIY
                            stuff but
                            changing the gel pads was so easy. Took me less than a minute.
                        </p>
                    </div>
                </div>

                <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer2/testimonials/rev44.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer2/testimonials/tps.svg" alt="star"
                                    class="lg:w-24 w-16 lg:mr-2" />
                                <span class="font-semibold lg:text-sm text-sm text-gray-900">- Lamar T. - Seattle, WA

                                </span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1 text-xs text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer2/testimonials/verified.webp" alt="" class="w-6" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-2 leading-relaxed text-left">
                            <b>"Long-lasting and high-quality"</b><br>
                            So stoked these replacement gel pads are on for such a fantastic price. They make such a
                            difference in the
                            conductivity of my Tactical X Abs. And these gel pads have never been priced so low. Take
                            advantage while
                            you can! I sure did.
                        </p>
                    </div>
                </div>

            </div>
            <div class="text-center pb-10">
                <div class="mx-auto flex items-center justify-center mt-3">
                    <button v-if="!transactionStatus" @click="handlePurchase"
                        class="bg-[#30bd51] p-4 text-white text-xl shadow-lg rounded-lg mb-1 w-96">
                        COMPLETE CHECKOUT
                    </button>
                    <PurchaseSpinner v-if="transactionStatus" />
                </div>
                <p class="text-sm text-center mb-3">We will ship it out to you FREE in the same order</p>
                <NuxtImg src="/images/offer2/guarantees.webp" alt="" class="h-12 mx-auto  mb-3" />
                <a @click="mayBeLater" class="underline cursor-pointer text-gray-500 text-sm text-center mb-3">
                    No thank you, I don’t want to take advantage of this one-time offer</a>

            </div>
        </div>
    </section>

    <Alert message="" :pageTo="'/offer3'" :stepCompleted="3" />
</template>