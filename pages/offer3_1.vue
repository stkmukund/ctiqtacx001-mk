<script setup lang="ts">
import PurchaseSpinner from "~/components/PurchaseSpinner.vue";
import { useCheckoutStore } from "~/stores";

definePageMeta({
    layout: 'custom'
})
const checkoutStore = useCheckoutStore();
checkoutStore.addPageType("upsellPage3");
const transactionStatus = computed(() => checkoutStore.transactionStatus);
const config = useRuntimeConfig().public
const router = useRouter();
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

const productDetails: any = ref({
    product1_id: config.offer3_1[0],
    product2_id: config.offer3_1[1],
    variant1_id: "",
    variant2_id: 118,
    productQty: 1,
    productPrice: "",
    variantDetailId: "",
    pageTo: "/thankyou",
    event: "Downsell3cv",

});

let allVariants: { variantOptionName1: string; variantOptionName2: string; variantDetailId: string }[] = [];

const upsell = async () => {
    const { productId, variants, title } = await upsellProducts(config.offer3_1[0]);
    productDetails.value.productId = productId;
    productDetails.value.ItemName = title;
    allVariants = variants
}

const packCategory = {
    gender: ['Men', 'Women'],
    size: ['S/M', 'L/XL', 'XXL/XXXL']
}

const selectedPack = ref({ gender: 'Men', size: 'S/M' });

// Route to next page
const mayBeLater = async () => {
    checkoutStore.setStepCompleted(7);
    router.push({ path: '/thankyou' });
}

const imageList = ref<string[]>([
    "/images/offer3/downsell.png",
    "/images/offer3/Male-fat-burning-min.webp",
    "/images/offer3/Women-fat-burning-min.webp",
    "/images/offer4/scales1-min.webp",
    "/images/offer4/black-min.webp",
    "/images/offer4/app-min.webp"
])

const selectedImage = ref<string>(imageList.value[0])

const imageSelector = (index: number) => {
    selectedImage.value = imageList.value[index]
};

const handlePurchase = () => {
    const filteredVariant = allVariants.find((variant) => variant.variantOptionName1 === selectedPack.value.gender && variant.variantOptionName2 === selectedPack.value.size);
    if (filteredVariant) {
        productDetails.value.variant1_id = filteredVariant.variantDetailId;
        productDetails.value.productPrice = filteredVariant.price;
        importUpsell(productDetails.value)
    } else {
        console.error("No matching variant found for the selected options.");
    }
}
</script>
<template>
    <section id="offer3" class="bg-white text-gray-800">
        <!-- Main Content Box -->
        <div class="container-fluid bg-gray-100">
            <div class="p-3 md:p-2 text-center max-w-4xl mx-auto">
                <h2 class="text-xs md:text-xs lg:text-base mb-1"><b>Last Chance with an Even Bigger Discount!</b> Get
                    Our Revolutionary Fat Melting
                    Sauna Vest and AI Smart<br>Scale at <b>75% Off </b>for <b>Only $49.99 Today!</b>
                </h2>

            </div>
        </div>
        <div class="max-w-4xl mx-auto px-4">
            <!-- Comparison Section -->
            <div class="flex flex-col md:flex-row items-top justify-center p-2 md:p-1">

                <!-- Image Container -->
                <div class="max-w-md mb-2 mx-auto bg-gray-100 pr-4">
                    <NuxtImg :src="selectedImage" alt="Sauna Vest" class="mx-auto w-auto" />
                    <div class="flex space-x-2 mt-3">
                        <NuxtImg v-for="(source, index) in imageList" :src="source" :key="index"
                            class="w-12 h-10 ms-7 border-2 mb-3 rounded cursor-pointer"
                            @click="() => imageSelector(index)" />
                    </div>
                </div>

                <div class="max-w-lg mx-auto text-center pt-1 px-5 pb-5 lg:block hidden">
                    <h2 class="font-bold text-sm md:text-base mb-1">Tactical X Abs Customers Love Our Sauna Vest!</h2>

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
                                        <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Frank H. -
                                            Phoenix,
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
                                    had to change the gel pads a few times. But here is a tip, it’s best to buy as many
                                    as
                                    you can because
                                    the more you get, the more you save. You’ll have to change them eventually, so why
                                    not
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
                                        <span class="font-medium lg:text-xs text-[10px] text-gray-900">- Peter K. -
                                            Norfolk,
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
                                    Great replacement gel pads and they fit Tactical X perfectly. Quick to replace and
                                    they
                                    usually last me
                                    around 2 weeks before needing to be changed. My Tactical X is always working the
                                    best
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
                                    I was worried because I’m not that good with DIY stuff but changing the gel pads was
                                    so
                                    easy. Took me less than a minute.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
        <div class="max-w-4xl mx-auto ps-4">
            <p class="text-base mx-auto my-2 text-center max-w-2xl" style="line-height: 1.5;">Compliment your Tactical X
                Abs Stimulator with our best-selling Fat
                Melting Sauna Vest and cutting edge AI Smart Scale. <br> <br>Burn as much as 500 calories in
                just 30 minutes of wearing our revolutionary vest, while our intelligent AI Smart Scale tracks
                your BMI, fat loss, muscle gain, and more!
                <br> <br>
                These products together have a combined value of $200, but for a limited-time we're giving you
                the perfect tools to jumpstart your fitness journey for only $49.99!
            </p>

            <div class="bg-gray-100 md:p-2 max-w-xl mx-auto my-5">

                <h3 class="text-center font-semibold text-gray-700 mb-2 text-base">Choose Sauna Vest Options</h3>
                <!-- Options Section -->
                <div class="bg-white border border-gray-300 rounded-md p-2">
                    <div class="p-0 text-center">

                        <div class="mb-0">
                            <div class="mt-0">
                                <p class="font-medium mb-1 text-center text-gray-600">
                                    <span class="inline-block w-full border-t relative">
                                        <span
                                            class="text-nowrap text-sm absolute -top-3 bg-white px-2 left-1/2 -translate-x-1/2">
                                            Select <strong>Gender</strong>
                                        </span>
                                    </span>
                                </p>

                                <div class="flex justify-center space-x-2 mt-0 mx-auto py-2">
                                    <button v-for="(gender, index) in packCategory.gender" :key="index" id="maleBtn"
                                        @click="() => selectedPack.gender = gender"
                                        :class="['gender-btn px-2 text-sm py-1 rounded-lg shadow-md border', selectedPack.gender === gender ? 'bg-gray-500 text-white' : 'bg-white text-black']">
                                        {{ gender }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Size Options -->
                        <div class="mb-1">
                            <div class="mt-1">
                                <p class="font-medium mb-1 text-center text-gray-600">
                                    <span class="inline-block w-full border-t relative">
                                        <span
                                            class="text-nowrap text-sm absolute -top-3 bg-white px-2 left-1/2 -translate-x-1/2">
                                            Select <strong>Size</strong>
                                        </span>
                                    </span>
                                </p>

                                <div class="flex justify-center space-x-2 mt-0 mx-auto py-2">
                                    <button v-for="(size, index) in packCategory.size" :key="index" id="maleBtn"
                                        @click="() => selectedPack.size = size"
                                        :class="['gender-btn px-2 text-sm py-1 rounded-lg shadow-md border', selectedPack.size === size ? 'bg-gray-500 text-white' : 'bg-white text-black']">
                                        {{ size }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-4xl mx-auto px-4">

            <button v-if="!transactionStatus" @click="handlePurchase"
                class="w-full py-2 bg-[#30BD51] text-white font-semibold text-lg text-center uppercase">
                Complete Checkout
            </button>
            <PurchaseSpinner v-else />

        </div>
        <p class="lg:text-sm text-xs text-center mb-2 mt-1">We will ship it out to you FREE in the same order</p>


        <!-- Decline Offer -->
        <p class="text-center text-xs md:text-sm pb-5">
            <a @click="mayBeLater" class="cursor-pointer underline">No thank you, I don’t want to take advantage of this
                one-time offer</a>
        </p>
        <div class="max-w-4xl mx-auto text-center pt-1 px-4 pb-5 lg:hidden block">
            <h2 class="font-bold text-sm md:text-base mb-1">Tactical X Abs Customers Love Our Sauna Vest!</h2>

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

    <Alert message="" :pageTo="'/thankyou'" :stepCompleted="7" />
</template>