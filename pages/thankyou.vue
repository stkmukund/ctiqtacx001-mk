<template>
    <section id="thankyouPage" class=" bg-white">
        <!-- Header -->
        <div class="text-center py-4">
            <NuxtImg src="/images/thankyou/logo.webp" alt="TacticalXabs Logo" class="mx-auto h-10 mb-2" />
            <h1 class="text-4xl font-bold text-gray-600">Congrats - Order Complete!</h1>
            <p class="text-lg text-gray-700 font-bold">Thank you for your order!</p>
        </div>

        <!-- Upsell Offer -->
        <div v-if="!thankyouCase" class="bg-[#c8c9d3] p-6 text-center max-w-4xl mx-auto pb-0">
            <h2 class="text-3xl font-bold text-gray-900 mb-1">Wait! Limited Time Special Offer:</h2>
            <h3 class="text-2xl font-semibold text-black mb-4">Get Extra Gel Pads - (35% Savings)</h3>

            <div class="flex flex-col md:flex-row items-center justify-center gap-12">

                <!-- Left: Image -->
                <div class="w-full md:w-1/3 flex justify-center">
                    <NuxtImg src="/images/thankyou/extra-gel-pads.webp" alt="Extra Gel Pads"
                        class="w-52 h-auto rounded border border-gray-300" />
                </div>

                <!-- Right: Text Content -->
                <div class="w-full md:w-2/3 px-5">
                    <p class="text-xl text-gray-800 mb-2 text-center md:text-center">
                        Last Chance to get
                        <a @click="handlePurchase" class="text-blue-700 underline cursor-pointer">Extra Gel Pads</a> at
                        a huge discount.
                        <strong>Add to your order now.</strong>
                    </p>
                    <p class="text-xl text-center md:text-center">
                        <span class="text-red-600 line-through mr-2">$29.99</span>
                        <span class="text-black font-bold">${{ totalprice.toFixed(2) }} (35% Savings)</span>
                    </p>
                </div>

            </div>

            <button @click="handlePurchase"
                class="mt-6 px-6 py-3 bg-[#44d716] hover:bg-[#44d716] text-blue-800 font-normal text-2xl border border-gray-800 rounded shadow-[0_8px_15px_rgba(0,0,0,0.8)]">
                Add To My Order
            </button>

        </div>

        <!-- Order Receipt Table -->
        <div class="max-w-4xl mx-auto text-sm">
            <div class="bg-black text-white px-4 py-2 font-semibold text-lg">Your Order Receipt:</div>
            <div class="flex justify-between px-4 py-4 border-b border-gray-200">
                <span>Products</span>
                <span>Price</span>
            </div>
            <div v-if="orderId" v-for="(product, index) in products" :key="index"
                class="flex justify-between px-4 py-4">
                <span>{{ product.title }}{{ product.variant_title }}</span>
                <span>${{ parseFloat(product.price).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between px-4 py-4">
                <span>Shipping</span>
                <span>{{ isShippingFree ? "Free" : "$" + shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between px-4 py-4">
                <span>Total</span>
                <span>${{ totalsumprice.toFixed(2) }}</span>
            </div>
        </div>

        <!-- Guarantee Section -->
        <div class="max-w-4xl mx-auto text-sm mb-10">
            <!-- Header -->
            <div class="bg-black text-white px-4 py-2 font-semibold text-lg">
                Our Guarantee:
            </div>

            <!-- Content Box -->
            <div class="px-4 py-4 flex flex-col md:flex-row gap-6">

                <!-- Image -->
                <div class="flex-shrink-0 w-full md:w-1/3">
                    <NuxtImg src="/images/thankyou/seal1.webp" alt="Guarantee" class="w-32 md:w-28 mx-auto" />
                </div>

                <!-- Text Content -->
                <div class="flex flex-col justify-between w-full md:w-2/3 text-xl text-gray-500">
                    <p class="mb-2 font-bold">Thank you for your order!</p>
                    <p class="mb-2">
                        Our team will get the order sent out to you as quickly as possible.
                        You will receive an email when your order is shipped in the next day or 2.
                    </p>
                    <p class="mb-2">
                        If you have any questions or need to change anything with your order, please send us a message.
                    </p>
                    <p class="mb-2">
                        We are always here to help,<br />
                        Tactical-X Abs Team.
                    </p>
                    <p class="mb-2 font-semibold text-xl">
                        P.S.<span class="text-gray-800"> We truly hope your new Tactical-X Stimulator will help you
                            achieve your
                            fitness goals :)</span>
                    </p>

                    <!-- Highlighted Offer -->
                    <p class="mb-2 text-gray-800 font-semibold text-xl">
                        Check out this New 'Legal Steroid' that Boosts Muscle Growth 287% – Top Trainers and Athletes
                        Reveal The Safest Steroid Alternative To The Public...
                        <a target="_blank"
                            href="https://attexts-schaiver.com/67f9ab9b-f219-4ee6-bc65-b2e4142aa6b4?lp=RevBoost"
                            class="text-blue-600 underline font-semibold mb-2">
                            Click Here Now
                        </a>
                    </p>
                </div>
            </div>
            <!-- Promo Image -->
            <a target="_blank"
                href="https://attexts-schaiver.com/67f9ab9b-f219-4ee6-bc65-b2e4142aa6b4?lp=RevBoost">
                <NuxtImg src="/images/thankyou/New Legal Steroid-min.png" alt="" class="mx-auto" />
            </a>
        </div>

        <!-- Footer -->
        <!-- Support Section -->
        <div class="max-w-4xl mx-auto text-center mt-10 pb-4">
            <p class="font-semibold text-gray-900 mb-2">Got a question? Ask us!</p>

            <a href="#"
                class="inline-block w-full mx-auto bg-[#68c2e9] text-white font-medium px-4 py-3 text- rounded transition">
                👉🏻 Get Support Here
            </a>

            <p class="text-lg text-gray-800 mt-4">
                Copyright 2026 Tactical-X Abs. All rights reserved.
            </p>
        </div>
    </section>
    <Alert message="" :pageTo="'/thankyou'" :stepCompleted="6" />
</template>
<script lang="ts" setup>
import { confirmOrder } from '~/composables/checkoutApi';
import type { ProductReceiptSession } from '~/utils/interface';

const thankyouCase = storage.getSessionItem('thankyouCase');
const orderId = storage.getSessionItem('orderId');

const products: any = ref([])
const totalprice = ref(19.49);
const totalsumprice = ref(0.00);
const shipping = ref(0.00);
const isShippingFree = ref(false);
const config = useRuntimeConfig().public;
const router = useRouter();
const checkfacpi=router.options.history.state;

const handlePurchase = () => {
    storage.setSessionItem("thankyouCase", true);
    // window.location.href = `/?products=${config.thankyou}:1`;
    let currentUrl = window.location.href;
    currentUrl = currentUrl.replace('thankyou', '?products=' + config.thankyou + ':1');
    window.location.href = currentUrl;
}

onMounted(async () => {
    await checkSteps();
   if (checkfacpi.from && checkfacpi.from == 'importupsell') {
        UpsellsfbCAPI(checkfacpi.datalayerobj);
        upsellsDataLayer(checkfacpi.datalayerobj);
        fbCAPI('OrderTotals');
        dataLayer('OrderTotals');
        window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }

    importClick();
    // Order Recipt
    const orderReceipt: ProductReceiptSession = storage.getSessionItem('productReceipt')!;

    const cartData = orderReceipt.items || storage.getSessionItem('productCart');
    if (cartData && orderId) {
        try {
            products.value = cartData;
            if (orderReceipt.items.find(pro => +pro.product_id === config.vipProduct)) isShippingFree.value = true;
            else isShippingFree.value = false;
            shipping.value = parseFloat(orderReceipt.shipping);
            totalsumprice.value = parseFloat(orderReceipt.total) || products.value.reduce((sum: any, p: any) => sum + parseFloat(p.price || 0), 0)
        } catch (e) {
            console.error('Failed to parse productCart:', e)
        }
    }

    const cnforderres = await confirmOrder();
    if (cnforderres.result == "SUCCESS") {
        setTimeout(() => {
            storage.clearSession();
            storage.clearLocal();
        }, 5000)
    }

})

</script>