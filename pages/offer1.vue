<script setup lang="ts">
import { useRouter } from "vue-router";
import PurchaseSpinner from "~/components/PurchaseSpinner.vue";
import { useCheckoutStore } from "~/stores";
import {importUpsell} from "~/composables/checkoutApi";

definePageMeta({
    layout: 'custom'
})
const checkoutStore = useCheckoutStore();
const transactionStatus = computed(() => checkoutStore.transactionStatus);
checkoutStore.addPageType("upsellPage1");
const router = useRouter();
const config = useRuntimeConfig().public;
const checkfacpi = router.options.history.state;


onMounted(async () => {
    await checkSteps();
    if (checkfacpi.from && checkfacpi.from == 'importorder') {
        fbCAPI("Purchase");
        dataLayer("Purchase");
        window.history.replaceState({}, '', window.location.pathname + window.location.search)
    }
    importClick();
});
const productDetails: any = ref({
    productId: config.offer1,
    productQty: 1,
    productPrice: "",
    variantDetailId: "",
    pageTo: "/offer2",
    ItemName: "",
    event: "Upsell1cv"
})
const upsell = async () => {
    const { productId, price, title } = await upsellProducts(config.offer1);
    productDetails.value.ItemName = title;
    productDetails.value.productPrice = price;

}
upsell();
// Route to next page
const mayBeLater = async () => {
    checkoutStore.setStepCompleted(2);
    router.push({ path: '/offer2' });
}
</script>
<template>
    <section id="up1" class="bg-white text-gray-800">
        <!-- Logo -->
        <div class="">
            <div class="container mx-auto">
                <main id="content-body" class="container mx-auto lg:max-w-[1000px] 2xl:max-w-[1200px]">
                    <!-- Main Content Box -->
                    <div
                        class="bg-gray-100 flex flex-col md:flex-row items-center gap-16 py-3 sm:py-4 px-2 sm:px-3 shadow md:rounded-t-lg">
                        <!-- Warranty Badge Image -->
                        <div class="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
                            <NuxtImg src="/images/offer1/LifeTimeWarranty.webp" :placeholder="[350]"
                                alt="Lifetime Warranty Badge" class="w-60 md:w-80 h-auto" />
                        </div>

                        <!-- Warranty Info Text -->
                        <div class="md:text-left max-w-xl w-full md:w-1/2 px-4 text-center">
                            <h2 class="text-xl md:text-2xl font-bold mb-2">
                                Tactical X ProtectPlus<br />Lifetime Warranty
                            </h2>
                            <p class="text-gray-700 mb-4 text-base md:text-lg">
                                Protect all your Tactical X purchases with the iron-clad
                                <strong>ProtectPlus Lifetime Warranty for just $9.90. Special discount
                                    price, today only!</strong>
                            </p>
                            <p class="text-gray-700 mb-4 text-base md:text-lg">
                                If anything goes wrong with any of your Tactical X products, just
                                return it to us for an instant replacement, 100% hassle-free, no
                                questions asked.
                            </p>
                            <p class="font-bold text-gray-800 text-base md:text-lg">
                                Get total peace of mind with the best protection plan available!
                            </p>
                        </div>
                    </div>

                    <!-- Green Call To Action -->
                    <div class="bg-[#30bd51] text-white text-center py-3 px-4">
                        <p class="text-xl md:text-2xl font-bold">TODAY ONLY!</p>
                        <p class="text-xl md:text-2xl font-semibold">
                            Insure Your Tactical X with<br />
                            Ironclad Protection!
                        </p>
                    </div>

                    <!-- Comparison Section -->
                    <div class="bg-gray-100 flex flex-col md:flex-row items-center justify-center pb-20 md:px-4 mb-36">

                        <div
                            class="w-full md:w-[90%] bg-white flex pt-4 flex-col md:flex-row items-center justify-center">
                            <div class="w-full md:w-1/2 p-4">
                                <div class="border border-gray-300 rounded-md p-5">
                                    <h3 class="text-xl md:text-2xl font-bold text-center">
                                        WITHOUT WARRANTY
                                    </h3>
                                    <hr class="my-2" />
                                    <p class="py-3 text-lg">✅ 30-day money-back guarantee</p>
                                    <h3 class="text-xl md:text-2xl font-bold text-center">HOWEVER:</h3>
                                    <ul class="opacity-75 text-lg space-y-2 mt-2">
                                        <li>❌ NO lifetime protection against any defects</li>
                                        <li>❌ NO lifetime protection against internal component damage</li>
                                        <li>❌ NO lifetime protection against any loss or theft</li>
                                        <li>❌ NO replacements</li>
                                        <li>❌ NO special bonus offers on additional products</li>
                                    </ul>
                                    <button type="button" @click="mayBeLater"
                                        class="mt-4 border border-red-800 bg-red-200 text-[#444444] rounded-md font-bold text-sm shadow-md p-3 w-full">
                                        NO THANKS, I DON'T NEED GUARANTEED PROTECTION
                                    </button>
                                </div>
                            </div>

                            <div class="w-full md:w-1/2 p-4">
                                <div class="border-4 border-[#30bd51] rounded-md bg-[#d5f8f0] p-4">
                                    <h3 class="text-xl md:text-2xl font-bold text-center">🔰 WITH WARRANTY</h3>
                                    <hr class="my-2" />
                                    <p class="py-3 text-lg">✅ 30-day money-back guarantee</p>
                                    <h3 class="text-xl md:text-2xl font-bold text-center">PLUS:</h3>
                                    <ul class="opacity-75 text-lg space-y-2 mt-2">
                                        <li>✅ Lifetime protection against any defects</li>
                                        <li>✅ Lifetime protection against internal component damage</li>
                                        <li>✅ Lifetime protection against any loss or theft</li>
                                        <li>✅ Replacements</li>
                                        <li>✅ Special bonus offers on additional products</li>
                                    </ul>
                                    <button v-if="!transactionStatus" type="button"
                                        @click="() => importUpsell(productDetails)"
                                        class="mt-4 border border-[#30bd51] bg-[#30bd51] text-white rounded-md font-bold text-xl shadow-md p-3 w-full">
                                        COMPLETE CHECKOUT - ONLY $9.90
                                    </button>
                                    <PurchaseSpinner v-if="transactionStatus" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <!-- Final CTA -->
        <div class="relative">
            <div class="bg-[#404040] fixed bottom-0 left-0 w-full flex flex-col items-center py-4 px-4 z-50 mt-6">
                <button v-if="!transactionStatus" @click="() => importUpsell(productDetails)"
                    class="bg-[#30bd51] px-5 py-3 text-white text-xl shadow-lg rounded-lg mb-4 w-56 min-w-fit">
                    Complete Checkout
                </button>
                <PurchaseSpinner v-if="transactionStatus" />
                <NuxtImg src="/images/offer1/guarantees.webp" alt="" class="h-12" />
            </div>
        </div>
    </section>

    <Alert message="" :pageTo="'/offer2'" :stepCompleted="2" />
</template>