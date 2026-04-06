<script setup lang="ts">
import PurchaseSpinner from "~/components/PurchaseSpinner.vue";
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
    startCountdown();
    upsell();
});

// let allVariants: { productSku: string; variantDetailId: string; productQty:string }[] = [];
const upsell = async () => {
    const { productId, variants , title} = await upsellProducts(config.offer4);
    productDetails.value.productId = productId;
    productDetails.value.ItemName = title;
    productDetails.value.productPrice = variants[0].price;
    // allVariants = variants
}

const productDetails: any = ref({
    productId: "60",
    productQty: 1,
    productPrice: "",
    variantDetailId: "2",
    pageTo: "/thankyou",
    ItemName: "",
    event: "Upsell4cv"
})

const totalprice = ref(44.99);
// Route to next page
const mayBeLater = async () => {
    checkoutStore.setStepCompleted(6);
    router.push({ path: '/thankyou' });
}

const imageList = ref<string[]>([
    "/images/offer4/scales1-min.webp",
    "/images/offer4/app-min.webp",
    "/images/offer4/black-min.webp"
])

const selectedImage = ref<string>(imageList.value[0])

const imageSelector = (index: number) => {
    selectedImage.value = imageList.value[index]
};

const handlePurchase = () => {
    // const filteredVariant = allVariants.find((variant) => variant.productSku === packs[selectedPack.value].gelPads + 'GEL');
    // if (filteredVariant) {
    // productDetails.value.variantDetailId = filteredVariant.variantDetailId;
    // productDetails.value.productQty = selectedQuantity;
    importUpsell(productDetails.value)
    // } else {
    //     console.error("No matching variant found for the selected options.");
    // }
}

const { minutes, seconds, startCountdown } = useCountdown(6, 15);
</script>
<template>
    <section id="offer4" class="bg-white text-gray-800">
        <div class="bg-gray-100 p-3">
            <div class="w-fit md:w-3/5 mx-auto">
                <!-- Title -->
                <h1 class="text-center text-xl md:text-2xl font-semibold mb-2">
                    <span class="text-black font-bold"> WAIT!</span> Last & <span class="underline">Final</span> Offer
                    to <span class="text-black font-bold">Compliment Your Order!</span>
                </h1>
                <p class="text-center text-sm md:text-base mb-1">
                    After using the Abs Stimulator every day, you'll want to track your progress to see how much fat
                    you've lost and
                    how much lean muscle mass you've gained! <span class="text-black font-bold">Add this to your order
                        and get a 66%
                        discount.</span> (We will ship it FREE with your other items.)
                </p>
            </div>
        </div>

        <div class="max-w-5xl mx-auto md:px-4 py-4 bg-white">
            <!-- FLEXBOX Product Section -->
            <div class="flex flex-col md:flex-row gap-6 items-start  bg-white p-6">
                <div class="w-full md:w-1/3 flex flex-col items-center">
                    <NuxtImg :src="selectedImage" alt="AI Smart Scale" class="rounded h-56 w-auto" />
                    <div class="flex space-x-2 mt-3">
                        <NuxtImg v-for="(link, index) in imageList" :key="index" @click="() => imageSelector(index)"
                            :src="link" class="w-14 h-14 border rounded cursor-pointer" />
                    </div>
                </div>

                <div class="md:w-2/3">
                    <h3 class="text-xl md:text-2xl font-bold mb-2">Track Your Fat Loss with these intelligent AI 'Smart
                        Scales'
                    </h3>
                    <NuxtImg src="" />

                    <p class="text-lg md:text-2xl font-bold"> <del
                            class="text-sm font-normal mr-3 text-red-600 line-through">$119.99</del>Today’s Price: ${{
                        totalprice.toFixed(2) }}</p>
                    <hr class="border my-4">
                    <div class="flex items-top">
                        <div class="w-4/6 text-sm md:text-base font-bold text-gray-600">Total</div>
                        <div class="w-2/6 text-sm md:text-base text-right text-gray-600">$ {{ totalprice.toFixed(2) }}
                        </div>
                    </div>
                    <div class="text-center">
                        <button v-if="!transactionStatus" @click="handlePurchase"
                            class="mt-4 bg-green-500 text-lg md:text-xl text-white font-semibold py-3 px-4 rounded hover:bg-green-600 md:w-4/5 shadow-md">
                            Complete Checkout
                        </button>
                        <PurchaseSpinner v-if="transactionStatus" />
                        <p class="text-center text-sm md:text-base mt-2 text-gray-800">We will ship it out to you FREE
                            in the same
                            order</p>

                        <div class="flex justify-center space-x-2 mt-2">
                            <NuxtImg src="/images/offer4/guarantees.webp" class="h-10" alt="Guarantees" />
                        </div>
                    </div>
                    <p class="text-lg mt-4">If you want to lose fat, tracking your BMI is a must.
                    </p>

                    <p class="text-lg mt-4">
                        It's the most important trackable index you can do at home if you want to lose fat and gain lean
                        muscle...
                    </p>
                    <p class="text-lg mt-4">
                        Because: <strong>"What gets measured, gets improved"</strong>
                    </p>
                    <p class="text-lg mt-4">
                        And TODAY only, Tactical-X is offering a fantastic discount on these AI 'Smart Scales' that will
                        track your
                        fat loss and lean muscle mass to a free smartphone app!
                    </p>
                    <p class="text-lg mt-4">It keeps an accurate history of your:</p>
                    <ul class="list-disc list-inside text-lg mt-4 space-y-1">
                        <li>Body Mass Index</li>
                        <li>Fat Loss</li>
                        <li>Muscle Gain</li>
                        <li>Water Retention</li>
                        <li>Visceral Fat</li>
                    </ul>

                    <div class="border p-4 rounded mt-6 text-center">
                        <p class="font-semibold text-lg text-gray-700"><strong class="font-bold">Act Fast:
                            </strong><br>Increase the
                            effectiveness of your health and fitness now.</p>
                        <p class="text-sm">This offer is only available for the next:</p>
                        <!-- Timer -->
                        <div class="flex justify-center space-x-6 mt-2 mb-2 text-gray-500">
                            <div class="text-center">
                                <p class="text-3xl font-semibold">00</p>
                                <p class="text-xs text-gray-500">Hours</p>
                            </div>
                            <div class="text-center">
                                <p class="text-3xl  font-semibold ">{{ minutes.toString().padStart(2, '0') }}</p>
                                <p class="text-xs text-gray-500">Minutes</p>
                            </div>
                            <div class="text-center">
                                <p class="text-3xl font-semibold">{{ seconds.toString().padStart(2, '0') }}</p>
                                <p class="text-xs text-gray-500">Seconds</p>
                            </div>
                        </div>

                    </div>

                    <p @click="mayBeLater"
                        class="text-center text-sm md:text-base mt-2 text-gray-500 underline cursor-pointer">
                        No thank you, I don’t want to take advantage of this one-time offer
                    </p>


                </div>
                <!-- Countdown Timer -->


            </div>
        </div>

        <!-- Guarantee & Feature List -->
        <div class="bg-gray-100 mt-4 p-6 rounded shadow">
            <div class="max-w-3xl mx-auto text-center text-xl">
                <h4 class="text-center text-2xl font-bold mb-4">Grab Your AI Smart Scales At This Super Low Price!</h4>
                <p class="text-center text-lg mb-4 font-bold ">This Offer Is Only Available On This Page.</p>

                <ul class="space-y-2 text-base">
                    <li>✅ High Quality Tech AI Smart Scales</li>
                    <li>✅ Designed exclusively for Tactical X Abs customers</li>
                    <li>✅ Personalized Roadmap to your Health & Fitness Goals</li>
                    <li>✅ Incredible discount available only on this page</li>
                </ul>

                <button v-if="!transactionStatus" @click="handlePurchase"
                    class="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded hover:bg-green-600 w-full lg:w-3/5">
                    Complete Checkout
                </button>
                <PurchaseSpinner v-if="transactionStatus" />


                <p class="text-center text-base mt-2 text-gray-800">We will ship it out to you FREE in the same order
                </p>
                <NuxtImg src="/images/offer4/guarantees.webp" alt="" class="w-72 mx-auto my-3" />


                <p @click="mayBeLater"
                    class="text-center text-xs md:text-sm mt-2 text-gray-800 underline cursor-pointer">
                    No thank you, I don’t want to take advantage of this one-time offer >
                </p>
            </div>
        </div>

        <!-- Testimonials -->
        <div class="mt-10">
            <h4 class="text-center text-xl md:text-2xl font-bold mb-6">3,000+ Customers Use It Daily, and So Will You
            </h4>
            <div class="flex flex-col md:flex-row items-center md:items-top justify-between md:space-x-6 px-4 md:px-16">
                <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer4/testimonials/rev22.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer4/testimonials/tps.svg" alt="star"
                                    class="lg:w-24 w-16 lg:mr-2" />
                                <span class="font-semibold lg:text-sm text-sm text-gray-900">- Frank H. - Phoenix,
                                    AR</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1 text-xs text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer4/testimonials/verified.webp" alt="" class="w-6" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-2 leading-relaxed text-left">
                            <b>"Long-lasting and high-quality"</b><br>I love my Tactical X. I use it every day it seems,
                            and I have had
                            to change the gel pads a few times. But here is a tip, it’s best to buy as many as you can
                            because the more
                            you get, the more you save. You’ll have to change them eventually, so why not just get the
                            best price?
                        </p>
                    </div>
                </div>

                <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                    <!-- Profile Image -->
                    <NuxtImg src="/images/offer4/testimonials/rev11.webp" alt="Profile"
                        class="w-10 h-10 rounded-full object-cover" />

                    <div class="flex-1">
                        <!-- Star Rating and Name -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <!-- Star icons -->
                                <NuxtImg src="/images/offer4/testimonials/tps.svg" alt="star"
                                    class="lg:w-24 w-16 lg:mr-2" />
                                <span class="font-semibold lg:text-sm text-sm text-gray-900">- Peter K. - Norfolk,
                                    VA</span>
                            </div>

                            <!-- Verified Badge -->
                            <div class="flex items-center gap-1 text-xs text-gray-400">
                                <span>Verified review</span>
                                <NuxtImg src="/images/offer4/testimonials/verified.webp" alt="" class="w-6" />
                            </div>
                        </div>

                        <!-- Review Text -->
                        <p class="mt-2 leading-relaxed text-left">
                            <b>"Long-lasting and high-quality"</b><br>
                            Great replacement gel pads and they fit Tactical X perfectly. Quick to replace and they
                            usually last me
                            around 2 weeks before needing to be changed. My Tactical X is always working the best thanks
                            to these.
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex flex-col md:flex-row items-top justify-between md:space-x-6 px-4 md:px-16 text-sm">
            <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                <!-- Profile Image -->
                <NuxtImg src="/images/offer4/testimonials/rev33.webp" alt="Profile"
                    class="w-10 h-10 rounded-full object-cover" />

                <div class="flex-1">
                    <!-- Star Rating and Name -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <!-- Star icons -->
                            <NuxtImg src="/images/offer4/testimonials/tps.svg" alt="star"
                                class="lg:w-24 w-16 lg:mr-2" />
                            <span class="font-semibold lg:text-sm text-sm text-gray-900">- Pamela M. - Columbia</span>
                        </div>

                        <!-- Verified Badge -->
                        <div class="flex items-center gap-1 text-xs text-gray-400">
                            <span>Verified review</span>
                            <NuxtImg src="/images/offer4/testimonials/verified.webp" alt="" class="w-6" />
                        </div>
                    </div>

                    <!-- Review Text -->
                    <p class="mt-2 leading-relaxed text-left">
                        <b>"Long-lasting and high-quality"</b><br>I was worried because I’m not that good with DIY stuff
                        but changing
                        the gel pads was so easy. Took me less than a minute.
                    </p>
                </div>
            </div>

            <div class="flex items-start lg:gap-3 gap-1 mb-6 border rounded-md lg:p-4 p-1">
                <!-- Profile Image -->
                <NuxtImg src="/images/offer4/testimonials/rev44.webp" alt="Profile"
                    class="w-10 h-10 rounded-full object-cover" />

                <div class="flex-1">
                    <!-- Star Rating and Name -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <!-- Star icons -->
                            <NuxtImg src="/images/offer4/testimonials/tps.svg" alt="star"
                                class="lg:w-24 w-16 lg:mr-2" />
                            <span class="font-semibold lg:text-sm text-sm text-gray-900">- Lamar T. - Seattle, WA

                            </span>
                        </div>

                        <!-- Verified Badge -->
                        <div class="flex items-center gap-1 text-xs text-gray-400">
                            <span>Verified review</span>
                            <NuxtImg src="/images/offer4/testimonials/verified.webp" alt="" class="w-6" />
                        </div>
                    </div>

                    <!-- Review Text -->
                    <p class="mt-2 leading-relaxed text-left">
                        <b>"Long-lasting and high-quality"</b><br>
                        So stoked these replacement gel pads are on for such a fantastic price. They make such a
                        difference in the
                        conductivity of my Tactical X Abs. And these gel pads have never been priced so low. Take
                        advantage while you
                        can! I sure did.
                    </p>
                </div>
            </div>

        </div>

        <!-- Final CTA -->
        <div class="text-center py-8 px-4">
            <button v-if="!transactionStatus" @click="handlePurchase"
                class="mt-6 bg-green-500 text-white text-xl md:text-2xl font-bold py-3 w-fit px-4 md:px-6 rounded hover:bg-green-600 lg:w-2/5">
                Complete Checkout
            </button>
            <PurchaseSpinner v-if="transactionStatus" />

            <p class="text-center text-sm md:text-base mt-2 text-gray-800">We will ship it out to you FREE in the same
                order</p>
            <NuxtImg src="/images/offer4/guarantees.webp" alt="" class="w-72 mx-auto my-3" />

            <p @click="mayBeLater" class="text-center text-xs md:text-sm mt-2 text-gray-800 underline cursor-pointer">
                No thank you, I don’t want to take advantage of this one-time offer
            </p>
        </div>
    </section>

    <Alert message="" :pageTo="'/thankyou'" :stepCompleted="5" />
</template>