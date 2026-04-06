<script setup lang="ts">
import PurchaseSpinner from "~/components/PurchaseSpinner.vue";
import { useCheckoutStore } from "~/stores";
import type { upsellProductDetails } from "~/utils/interface";

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

const productDetails = ref<upsellProductDetails>({
    productId: "",
    productQty: 1,
    productPrice: "",
    variantDetailId: "",
    pageTo: "/offer4",
    ItemName: "",
    event: "Upsell3cv"
});

let allVariants: { variantOptionName1: string; variantOptionName2: string; variantDetailId: string }[] = [];

const upsell = async () => {
    const { productId, variants,title } = await upsellProducts(config.offer3);
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
    checkoutStore.setStepCompleted(5);
    router.push({ path: '/offer4' });
}

const imageList = ref<string[]>([
    "/images/offer3/Neoprene.webp",
    "/images/offer3/Male-fat-burning-min.webp",
    "/images/offer3/Women-fat-burning-min.webp"
])

const selectedImage = ref<string>(imageList.value[0])

const imageSelector = (index: number) => {
    selectedImage.value = imageList.value[index]
};

const handlePurchase = () => {
    const filteredVariant = allVariants.find((variant) => variant.variantOptionName1 === selectedPack.value.gender && variant.variantOptionName2 === selectedPack.value.size);
    if (filteredVariant) {
        productDetails.value.variantDetailId = filteredVariant.variantDetailId;
        productDetails.value.productPrice = filteredVariant.price;
        importUpsell(productDetails.value)
    } else {
        console.error("No matching variant found for the selected options.");
    }
}
</script>
<template>
    <section id="offer3" class="bg-white text-gray-800">
        <!-- Offer Section -->
        <div class="container mx-auto bg-white my-3">
            <!-- Flexbox Instead of Grid -->
            <div class="flex flex-col md:flex-row gap-6 bg-gray-100 p-8 mx-0 md:mx-10">
                <!-- Image & Gallery -->
                <div class="md:w-1/2 flex flex-col items-center lg:items-end">
                    <NuxtImg :src="selectedImage" alt="Sauna Vest" class="h-80 w-fit rounded shadow" />
                    <div class="flex space-x-2 mt-3">
                        <NuxtImg v-for="(source, index) in imageList" :src="source" :key="index"
                            class="w-14 h-14 border-2 rounded cursor-pointer" @click="() => imageSelector(index)" />
                    </div>
                </div>

                <!-- Description -->
                <div class="md:w-1/2  max-w-[500px] mx-auto">
                    <h2 class="text-lg md:text-2xl font-bold text-center text-gray-800"><span class="underline">Fat
                            Melting</span>
                        Sauna Vest (50% Off)</h2>
                    <ul class="py-3 text-base md:text-lg text-gray-700 space-y-2 font-medium">
                        <li>The more you sweat, <strong>the more fat you burn!</strong></li>
                        <li>It's time to turbo-charge your fat-burning with this revolutionary fat-melting sauna suit.
                        </li>
                        <li>Just 30 minutes of wearing it <strong>burns as much as 300-500 calories!</strong></li>
                        <li>Burns fat walking, sitting, at the gym, doing anything!</li>
                        <li>(Wear it under your normal clothes, no-body needs to know)</li>
                    </ul>
                    <p class="mt-3 italic text-base md:text-lg text-gray-600 font-medium">Choose Your Size and Gender
                        Below!</p>
                </div>
            </div>

            <!-- Green Banner -->
            <div class="bg-[#30bd51] text-white text-center py-3 mt-0 text-xl md:text-3xl font-bold md:mx-10">
                50% OFF FOR NEW CUSTOMERS! <br class="md:hidden" />
                <span class="font-normal block">(Only Available On This Page)</span>
            </div>


            <div class="max-w-5xl mx-auto bg-gray-100 pb-16">
                <h3 class="font-bold text-center text-2xl py-8">VERIFIED CUSTOMER REVIEWS</h3>
                <div class="flex items-center justify-center">
                    <div class="items-top justify-between space-y-6 md:px-16 w-5/6">
                        <div class="flex border items-start lg:gap-3 gap-1 mb-6 rounded-md lg:p-4 p-1 ">
                            <!-- Profile Image -->
                            <NuxtImg src="/images/offer3/testimonials/rev6.webp" alt="Profile"
                                class="w-10 h-10 rounded-full object-cover" />

                            <div class="flex-1">
                                <!-- Star Rating and Name -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <!-- Star icons -->
                                        <NuxtImg src="/images/offer3/testimonials/tps.svg" alt="star"
                                            class="lg:w-24 w-16 lg:mr-2" />
                                        <span class="font-semibold lg:text-sm text-sm text-gray-900">- Jeremy K.</span>
                                    </div>

                                    <!-- Verified Badge -->
                                    <div class="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Verified review</span>
                                        <NuxtImg src="/images/offer3/testimonials/verified.webp" alt="" class="w-6" />
                                    </div>
                                </div>

                                <!-- Review Text -->
                                <p class="mt-2 leading-relaxed text-left">
                                    As a busy restaurant manager, I don’t have time to go to the gym. This magical vest
                                    allows me to burn a lot of fat each day whilstgoing about my normal day. Highly
                                    recommend it.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                            <!-- Profile Image -->
                            <NuxtImg src="/images/offer3/testimonials/rev5.webp" alt="Profile"
                                class="w-10 h-10 rounded-full object-cover" />

                            <div class="flex-1">
                                <!-- Star Rating and Name -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <!-- Star icons -->
                                        <NuxtImg src="/images/offer3/testimonials/tps.svg" alt="star"
                                            class="lg:w-24 w-16 lg:mr-2" />
                                        <span class="font-semibold lg:text-sm text-sm text-gray-900">- Debby F.</span>
                                    </div>

                                    <!-- Verified Badge -->
                                    <div class="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Verified review</span>
                                        <NuxtImg src="/images/offer3/testimonials/verified.webp" alt="" class="w-6" />
                                    </div>
                                </div>

                                <!-- Review Text -->
                                <p class="mt-2 leading-relaxed text-left">
                                    I have been using this for 1-2 hours day for almost 2 weeks and already see a
                                    noticeable difference. My stomach has shrunk, it's more defined and flatter. You can
                                    feel your body burning hotter than normal. Also I have had no issues with wearing it
                                    under my normal clothes. Don’t hesitate just buy it!
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                            <!-- Profile Image -->
                            <NuxtImg src="/images/offer3/testimonials/rev1.webp" alt="Profile"
                                class="w-10 h-10 rounded-full object-cover" />

                            <div class="flex-1">
                                <!-- Star Rating and Name -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <!-- Star icons -->
                                        <NuxtImg src="/images/offer3/testimonials/tps.svg" alt="star"
                                            class="lg:w-24 w-16 lg:mr-2" />
                                        <span class="font-semibold lg:text-sm text-sm text-gray-900">- Jerry B.</span>
                                    </div>

                                    <!-- Verified Badge -->
                                    <div class="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Verified review</span>
                                        <NuxtImg src="/images/offer3/testimonials/verified.webp" alt="" class="w-6" />
                                    </div>
                                </div>

                                <!-- Review Text -->
                                <p class="mt-2 leading-relaxed text-left">
                                    This thing was a little weird at first but I ended up loving it. The best thing is I
                                    can be wearing if anywhere, anytime. I've already shed some pounds after 2 weeks of
                                    using this.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                            <!-- Profile Image -->
                            <NuxtImg src="/images/offer3/testimonials/rev2.webp" alt="Profile"
                                class="w-10 h-10 rounded-full object-cover" />

                            <div class="flex-1">
                                <!-- Star Rating and Name -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <!-- Star icons -->
                                        <NuxtImg src="/images/offer3/testimonials/tps.svg" alt="star"
                                            class="lg:w-24 w-16 lg:mr-2" />
                                        <span class="font-semibold lg:text-sm text-sm text-gray-900">- John R.</span>
                                    </div>

                                    <!-- Verified Badge -->
                                    <div class="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Verified review</span>
                                        <NuxtImg src="/images/offer3/testimonials/verified.webp" alt="" class="w-6" />
                                    </div>
                                </div>

                                <!-- Review Text -->
                                <p class="mt-2 leading-relaxed text-left">
                                    It works great and is super easy to use. I've seen results and will continue to use
                                    - give it a try!
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                            <!-- Profile Image -->
                            <NuxtImg src="/images/offer3/testimonials/rev3.webp" alt="Profile"
                                class="w-10 h-10 rounded-full object-cover" />

                            <div class="flex-1">
                                <!-- Star Rating and Name -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <!-- Star icons -->
                                        <NuxtImg src="/images/offer3/testimonials/tps.svg" alt="star"
                                            class="lg:w-24 w-16 lg:mr-2" />
                                        <span class="font-semibold lg:text-sm text-sm text-gray-900">- Matthew A.</span>
                                    </div>

                                    <!-- Verified Badge -->
                                    <div class="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Verified review</span>
                                        <NuxtImg src="/images/offer3/testimonials/verified.webp" alt="" class="w-6" />
                                    </div>
                                </div>

                                <!-- Review Text -->
                                <p class="mt-2 leading-relaxed text-left">
                                    I love this Fat Melting vest. Busy family life and work doesn't leave me much time
                                    to go to a gym, this is a 'fat melting' lifesaver!!
                                </p>
                            </div>


                        </div>
                        <div class="bg-gray-100 md:p-6 max-w-xl mx-auto">
                            <!-- Heading -->
                            <h2 class="text-2xl font-bold text-center mb-2">
                                <u>Order</u> Your Fat Melting Sauna Vest Now!
                            </h2>

                            <!-- Stars -->
                            <div class="flex justify-center text-yellow-500 text-xl mb-4">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <!-- Pricing -->
                            <div class="text-center mb-6 bg-gray-300">
                                <span class="text-red-600 line-through text-lg font-bold">Regular price: $60.00</span>
                                <span class="font-bold text-lg px-2 py-1 rounded ml-2">Today's Price: $29.99</span>
                            </div>
                            <h3 class="text-center font-semibold text-gray-700 mb-4">Choose Options Here:</h3>
                            <!-- Options Section -->
                            <div class="bg-white rounded shadow p-4">
                                <div class="flex justify-between items-center border-b text-sm text-gray-400 mb-4">
                                    <div class="w-1/2">
                                        Product
                                    </div>
                                    <div class="w-1/2 text-right">
                                        Price
                                    </div>
                                </div>
                                <div class="border p-5">
                                    <!-- Product Row -->
                                    <div class="flex justify-between items-center border-b pb-2 mb-4">
                                        <label class="flex items-center gap-2">
                                            <input type="radio" name="product" checked class="accent-blue-500" />
                                            <span class="text-gray-800 font-light text-sm">Fat Melting Sauna Suit</span>
                                        </label>
                                        <span class="font-semibold  text-sm text-gray-700">$29.99</span>
                                    </div>

                                    <!-- Gender Options -->
                                    <div class="mb-2">
                                        <div class="mt-3">
                                            <p class="font-medium mb-1 text-center text-gray-600">
                                                <span class="inline-block w-full border-t relative">
                                                    <span
                                                        class="text-nowrap absolute -top-3 bg-white px-2 left-1/2 -translate-x-1/2">
                                                        Select a <strong>Gender</strong>
                                                    </span>
                                                </span>
                                            </p>

                                            <div class="flex justify-start space-x-4 mt-3">
                                                <button v-for="(gender, index) in packCategory.gender" :key="index"
                                                    id="maleBtn" @click="() => selectedPack.gender = gender"
                                                    :class="['gender-btn px-4 text-sm py-2 rounded-lg shadow-md border', selectedPack.gender === gender ? 'bg-gray-500 text-white' : 'bg-white text-black']">
                                                    {{ gender }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Size Options -->
                                    <div class="mb-4">
                                        <div class="mt-1">
                                            <p class="font-medium mb-1 text-center text-gray-600">
                                                <span class="inline-block w-full border-t relative">
                                                    <span
                                                        class="text-nowrap absolute -top-3 bg-white px-2 left-1/2 -translate-x-1/2">
                                                        Select a <strong>Size</strong>
                                                    </span>
                                                </span>
                                            </p>

                                            <div class="flex justify-start space-x-4 mt-4">
                                                <button v-for="(size, index) in packCategory.size" :key="index"
                                                    id="maleBtn" @click="() => selectedPack.size = size"
                                                    :class="['gender-btn px-4 text-sm py-2 rounded-lg shadow-md border', selectedPack.size === size ? 'bg-gray-500 text-white' : 'bg-white text-black']">
                                                    {{ size }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- CTA -->
        <div class=" bg-[#404040] py-5 text-center mt-2">
            <button v-if="!transactionStatus" @click="handlePurchase"
                class="bg-green-600 text-white text-sm md:text-xl px-6 py-3 mb-4 rounded shadow-lg hover:bg-green-700">
                Complete Checkout
            </button>
            <PurchaseSpinner v-if="transactionStatus" />
            <div class="flex justify-center gap-4 mt-2">
                <NuxtImg src="/images/offer3/guarantees.webp" class="h-10 md:h-12 w-auto" />
            </div>
        </div>

        <!-- Decline Offer -->
        <p
            class="text-center text-sm md:text-lg text-gray-600 mt-2 border py-4 lg:w-fit px-4 w-[90vw] shadow mx-auto rounded-md">
            <a @click="mayBeLater" class="cursor-pointer underline">No thank you, I don’t want to take advantage of this
                one-time offer ></a>
        </p>

        <!-- Guarantee -->
        <div class="text-center mt-6 pb-8">
            <NuxtImg src="/images/offer3/guarantee+shipping.webp" alt="Guarantee and Shipping" class="mx-auto h-24" />
        </div>
    </section>

    <Alert message="" :pageTo="'/offer4'" :stepCompleted="5" />
</template>