<script setup lang="ts">
import { useCheckoutStore } from "~/stores";

definePageMeta({
    layout: 'custom'
})
const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);
const router = useRouter();
const config = useRuntimeConfig().public;
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
    productDetails.value.ItemName = title;
    allVariants = variants
}

const selectedQuantity = ref(1);

const isFirstSelected = ref(true);
const gellpads = ref('12 Extra Gel Pads');

const packs: { [key: string]: { offerprice: number; gelPads: number,variantDetailId:number } } = { pack1: { offerprice: 14.99, gelPads: 10,variantDetailId: 81}, pack2: { offerprice: 35.88, gelPads: 20,variantDetailId:82} }

const productDetails: any = ref({
    productId: "",
    productQty: 1,
    productPrice: "",
    variantDetailId: "",
    pageTo: "/offer3",
    ItemName: "",
    event: "Downsell2cv"
})

const selectedPack = ref('pack1');
const handlePackSelector = (pack: string) => {
    gellpads.value = pack === 'pack2' ? '96 Extra Gel Pads' : '12 Extra Gel Pads';
    selectedPack.value = pack;
    isFirstSelected.value = pack === 'pack1';
};


// Route to next page
const mayBeLater = async () => {
    checkoutStore.setStepCompleted(4);
    router.push({ path: '/offer3' });
}

const imageList = ref<string[]>([
    "/images/offer2/gelpads1.webp",
    "/images/offer2/gel-pads2.webp",
    "/images/offer2/gel-pads3.webp",
    "/images/offer2/gel-pads4.webp"
])

const handlePurchase = () => {
     const filteredVariant = allVariants.find((variant) => Number(variant.variantDetailId) === packs[selectedPack.value].variantDetailId);
    if (filteredVariant) {
        productDetails.value.variantDetailId = filteredVariant.variantDetailId;
        productDetails.value.productQty = selectedQuantity;
        productDetails.value.productPrice = filteredVariant.price;

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
        <div class="container-fluid bg-gray-100 md:px-16">
            <div class="max-w-6xl p-3 md:p-2 mx-auto text-center">
                <h3 class="text-2xl md:text-lg font-bold mb-1">LAST CHANCE for an EVEN BIGGER DISCOUNT! (61% OFF!)</h3>
                <p class="text-center md:text-sm">As a new customer, we really want to look after you and offer you and
                    even
                    better deal on the replacement gel pads. <br><br>

                    After using the Abs Stimulator every day, the Gel Pads that stick the device to your body get dirty
                    and lose
                    their stickiness. It’s best to replace them from time-to-time. <span class="font-bold">Add this to
                        your order
                        and get a 61% discount.</span> We will ship it FREE with your other items.

                </p>
            </div>
        </div>
        <div class="container mx-auto md:px-4">
            <!-- Comparison Section -->
            <div class="flex flex-col md:flex-row items-top justify-center p-4">

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
                    <div class="max-w-2xl mx-auto p-4 md:p-6">
                        <!-- Heading -->
                        <h2 class="text-base md:text-lg font-bold text-center mb-2">
                            LAST CHANCE TO GET GEL PADS AT THS UNBEATABLE PRICE!
                        </h2>

                        <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                            <!-- Star Rating -->
                            <div class="">
                                <NuxtImg src="/images/offer2/5stars.webp" alt="" class="w-32 md:w-20" />
                            </div>

                            <!-- Pricing -->
                            <div class="flex flex-col md:flex-row items-center gap-4">
                                <p class="text-red-500 line-through">Regular price: $41.98</p>
                                <span class="font-semibold">Today's Price: <span class="text-black">$14.99</span></span>
                            </div>
                        </div>

                        <!-- Instructions -->
                        <div class="text-center mb-4">
                            <p><strong>1. Select Number of Packets</strong></p>
                            <p><strong>2. Select 12 or 96 Gel Pads (per packet)</strong></p>
                        </div>

                        <!-- Quantity Dropdown -->
                        <div class="flex justify-center mb-6">
                            <select v-model="selectedQuantity" class="border rounded px-4 py-2">
                                <option v-for="length in 10" :value="length" :key="length">{{ length }}
                                </option>
                            </select>
                        </div>

                        <!-- Select Amount Text -->
                        <div class="relative text-center mb-4">
                            <div
                                class="absolute left-0 top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2">
                            </div>
                            <span class="bg-white px-2 text-sm font-semibold relative z-10">Select a <span
                                    class="text-black">Amount</span></span>
                        </div>

                        <!-- Gel Pad Buttons -->
                        <div class="flex justify-center mb-6 gap-4">
                            <button @click="() => handlePackSelector('pack1')"
                                :class="[' text-sm md:text-base px-4 py-2 rounded shadow', isFirstSelected ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 ']">
                                12 Extra Gel Pads</button>
                            <button @click="() => handlePackSelector('pack2')"
                                :class="['border text-sm md:text-base border-gray-300 px-4 py-2 rounded shadow', !isFirstSelected ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 ']">
                                96 Extra Gel Pads</button>
                        </div>

                        <!-- Product Summary -->
                        <div class="border-t pt-4 space-y-2">
                            <div class="flex justify-between">
                                <div>
                                    <p><span class="font-bold">Extra Gel Pads (Last Chance Special)</span> • {{ gellpads
                                        }}</p>
                                </div>
                                <p class="font-semibold text-nowrap">${{ isFirstSelected ? (packs.pack1.offerprice *
                                    selectedQuantity).toFixed(2) :
                                    (packs.pack2.offerprice * selectedQuantity).toFixed(2) }}</p>
                            </div>

                            <hr>

                            <div class="flex justify-between font-bold">
                                <span>Total</span>
                                <span class="text-nowrap">${{ isFirstSelected ? (packs.pack1.offerprice *
                                    selectedQuantity).toFixed(2) :
                                    (packs.pack2.offerprice * selectedQuantity).toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>


                    <div class="mx-auto flex items-center justify-center mt-3">
                        <button v-if="!transactionStatus" @click="handlePurchase"
                            class="bg-[#30bd51] p-4 text-white text-lg md:text-xl shadow-lg rounded-lg mb-1 w-96">
                            COMPLETE CHECKOUT
                        </button>
                        <PurchaseSpinner v-if="transactionStatus" />

                    </div>
                    <p class="text-xs md:text-sm text-center mb-3">We will ship it out to you FREE in the same order</p>
                    <NuxtImg src="/images/offer2/guarantees.webp" alt="" class="h-auto md:h-12 mx-auto  mb-3" />
                    <a @click="mayBeLater"
                        class="cursor-pointer block underline text-blue-600 text-sm md:text-lg text-center mb-3">
                        No thank you, I don’t want to take advantage of this one-time offer
                    </a>
                </div>
            </div>
        </div>
    </section>
    <Alert message="" :pageTo="'/offer3'" :stepCompleted="3" />
</template>