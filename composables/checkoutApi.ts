import { useCartStore, useCheckoutStore, useFormStore } from "~/stores";
export const importLead = async () => {
    const params = await formParams();
    const response: any = await apiHandler('importLead', params);
    if (response.result === "SUCCESS") {
        storage.setSessionItem("orderId", response.message.orderId);
        return true;
    }
}

export const confirmOrder = async () => {
    const orderId = await storage.getSessionItem('orderId')
    const params = {
        orderId
    }
    const response: any = await apiHandler('confirmOrder', params);
    return response;
}

export const submitPartialOrder = async () => {
    const partialOrderParams = await partialOrderFormParams();
    if (!partialOrderParams) return;
    await getOrderSalesTax();
    const response: any = await apiHandler('importLead', partialOrderParams);
    if (response.result === "SUCCESS") {
        storage.setSessionItem("orderId", response.message.orderId);
        return true;
    }

}

export const importOrder = async () => {
    const checkoutStore = useCheckoutStore();
    try {
        // checkoutStore
        const params = await formParams("order");
        const response: any = await apiHandler('importOrder', params);
        const router = useRouter();

        if (response.result === 'SUCCESS') {
            // setOrderDetails(response.message);
            if (response.message.paypalSdkParams) {
                return response;
            } else if (response.message.paypalUrl) {
                window.location.href = response.message.paypalUrl;
                return;
            } else {
                const thankyouCase = storage.getSessionItem("thankyouCase");
                if (thankyouCase) {
                    checkoutStore.setStepCompleted(6);
                    router.push({ path: '/thankyou' });
                }
                else {
                    checkoutStore.setStepCompleted(1);
                    router.push({ path: '/offer1', state: { from: 'importorder' } });
                }
            }
        }
        if (response.result === "MERC_REDIRECT") {
            if (response.message && response.message.url) {
                window.location.href = response.message.url;
            }
        }
        if (response.result === 'SUCCESS') {
            const mapppedData = mapToProductCart(response.message.items);
            // add puchased items in session to use on thankyou page
            storage.setSessionItem('productReceipt', { subTotal: response.message.subTotal, shipping: response.message.shipTotal, tax: response.message.taxTotal, total: response.message.totalAmount, items: mapppedData });
            // Important for DataLayer and CAPI
            storage.setSessionItem('productCart', mapppedData);
            storage.setSessionItem('subTotal', response.message.subTotal);
            storage.setSessionItem('shipping', response.message.shipTotal);
            storage.setSessionItem('tax', response.message.taxTotal);
            storage.setSessionItem('cartTotal', response.message.amountPaid);
            storage.setSessionItem('orderId', response.message.orderId);
            storage.setSessionItem('merchantId', params.forceMerchantId);
        };
        if (response.result === 'ERROR') {
            const errorMsg = response.message + ". Please try again.";
            // storage.clearSession();
            // storage.clearLocal();
            checkoutStore.updateAlert(true, errorMsg)
        };

        // else alert(true, response.message);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error occurred during order import:", error.message);
        } else {
            console.error("Error occurred during order import:", error);
        }
        // Optionally show a generic alert or handle the error in some way
        checkoutStore.updateAlert(true, "An error occurred while processing your order.");
    }
}

// Confirm PayPal --------> THIS IS WORKING
export const confirmPaypal = async () => {
    const router = useRouter();
    const route = useRoute();
    // const paypalAccept = route.query.paypalAccept; // Not in use for now
    const token = route.query.token;
    const ba_token = route.query.ba_token;
    const payerID = route.query.PayerID;
    if (!payerID && !ba_token) return;
    const checkoutStore = useCheckoutStore();
    const config = useRuntimeConfig().public;
    const sessionId = await storage.getSessionItem('sessionId');
    const vipOptIn = await storage.getLocalItem('vipOptIn');
    const paypalBillerId = config.paypalBillerId;
    const params: any = { sessionId, paypalBillerId };
    params.shipProfileId = 1;
    if (vipOptIn) {
        params.shipProfileId = 2;
    }
    params.token = token;
    params.payerId = payerID;
    params.baToken = ba_token;
    params.custom1 = "TacticalXabs Store";
    params.custom2 = "CheckoutV1";
    params.custom3 = "ctiqtacx001";
    params.custom5 = "API-Checkout";
    // } else {return};
    // Products
    const productCart: any = await storage.getSessionItem('productCart');
    if (productCart) {
        productCart.map((el: any, index: any) => {
            const pid = "product" + (index + 1) + "_id";
            const pqty = "product" + (index + 1) + "_qty";
            const vid = "variant" + (index + 1) + "_id";
            const prz = "product" + (index + 1) + "_price";
            params[pid] = el.product_id;
            if (el.product_id == config.vipProduct) params.shipProfileId = 2;
            params[pqty] = el.product_qty;
            params[vid] = el.variant_id;
            params[prz] = el.price;
        });
    }
    const response: any = await apiHandler('confirmPaypal', params);
    if (response.result === "SUCCESS") {
        // Important for DataLayer and CAPI
        const mapppedData = mapToProductCart(response.message.items);
        storage.setSessionItem('productCart', mapppedData);
        storage.setSessionItem('subTotal', response.message.subTotal);
        storage.setSessionItem('shipping', response.message.shipTotal);
        storage.setSessionItem('tax', response.message.taxTotal);
        storage.setSessionItem('cartTotal', response.message.totalAmount);
        storage.setSessionItem('orderId', response.message.orderId);
        // add puchased items in session to use on thankyou page
        storage.setSessionItem('productReceipt', { subTotal: response.message.subTotal, shipping: response.message.shipTotal, tax: response.message.taxTotal, total: response.message.totalAmount, items: mapppedData });
        checkoutStore.setStepCompleted(1);
        checkoutStore.updateConfirmPaypalLoading(false);
        await router.push({ path: '/offer1', state: { from: 'importorder' } });
        return true;
    }
    if (response.result === "ERROR") {
        const checkoutStore = useCheckoutStore();
        checkoutStore.updateAlert(true, response.message);
        checkoutStore.updateConfirmPaypalLoading(false);
        return false;
    }
}
// Upsell product Query
export const upsellProducts = async (id: number) => {
    const campaingID = useRuntimeConfig().public.CC_CAMPAIGN_ID;
    const params = { campaignProductId: id }
    const response: any = await apiHandler('getCampaign', params)
    let data: any;
    if (response.result === 'SUCCESS') {
        const { products } = response.message.data[campaingID];
        data = { productId: products[0].campaignProductId, price: products[0].price, variants: products[0].variants, title: products[0].productName, productPrice: products[0].price };
    }
    return data
}

// Upsell Import
export const importUpsell = async ({ productId, productQty, productPrice, variantDetailId, pageTo, ItemName, event }: { productId: string, productQty: number, productPrice: string, variantDetailId: string, pageTo: string, ItemName: string, event: string }) => {
    // checkoutStore

    const checkoutStore = useCheckoutStore();
    const alert = checkoutStore.updateAlert;
    checkoutStore.setTransactionStatus(true);
    // Get orderId from session
    const orderId = await storage.getSessionItem('orderId');
    const merchantId = await storage.getSessionItem('merchantId');

    const params: any = {
        orderId,
        productId,
        productQty,
        productPrice,
        variantDetailId,
        xid: sessionStorage.getItem('xid') || '',
        cavv: sessionStorage.getItem('cavv') || '',
        acsTransId: sessionStorage.getItem('acsTransId') || '',
        eci: sessionStorage.getItem('eci') || '',
        version: sessionStorage.getItem('version') || '',
        threeDsStatus: sessionStorage.getItem('status') || '',
    }
    if (merchantId) params.forceMerchantId = merchantId;
    const response: any = await apiHandler('importUpsell', params)
    const router = useRouter();
    if (response.result === 'SUCCESS') {
        const datalayerobj = {
            event: event,
            currency: "USD",
            ItemName: ItemName,
            ItemPrice: productPrice,
            value: productPrice,
            ItemQty: productQty,
            orderid: response.message.orderId,
        };
        checkoutStore.setTransactionStatus(false);
        if (pageTo == "/offer1_1") checkoutStore.setStepCompleted(2)
        if (pageTo == "/offer2") checkoutStore.setStepCompleted(3)
        if (pageTo == "/offer2_1") checkoutStore.setStepCompleted(4)
        if (pageTo == "/offer3") checkoutStore.setStepCompleted(5)
        // if (pageTo == "/offer4") checkoutStore.setStepCompleted(6)
        if (pageTo == "/offer3_1") checkoutStore.setStepCompleted(6)
        if (pageTo == "/thankyou") checkoutStore.setStepCompleted(7)
        // if (pageTo == "/offer2") checkoutStore.setStepCompleted(2)
        // if (pageTo == "/offer2_1") checkoutStore.setStepCompleted(3)
        // if (pageTo == "/offer3") checkoutStore.setStepCompleted(4)
        // if (pageTo == "/offer4") checkoutStore.setStepCompleted(5)
        // if (pageTo == "/thankyou") checkoutStore.setStepCompleted(6)
        // Important for DataLayer and CAPI
        const mapppedData = mapToProductCart(response.message.items);
        storage.setSessionItem('productCart', mapppedData);
        storage.setSessionItem('subTotal', response.message.subTotal);
        storage.setSessionItem('shipping', response.message.shipTotal);
        storage.setSessionItem('tax', response.message.taxTotal);
        storage.setSessionItem('cartTotal', response.message.amountPaid);
        storage.setSessionItem('orderId', response.message.orderId);
        storage.setSessionItem('productReceipt', { subTotal: response.message.subTotal, shipping: response.message.shipTotal, tax: response.message.taxTotal, total: response.message.totalAmount, items: mapppedData });
        router.push({ path: pageTo, state: { from: 'importupsell', datalayerobj: datalayerobj } });
    }
    else {
        alert(true, response.message);
        checkoutStore.setTransactionStatus(false);
    }
}

// Upsell Import for VIP
export const importVipUpsell = async ({ product1_id, product1_qty, product1_price, product2_id, product2_qty, pageTo }: { product1_id: number, product1_qty: number, product1_price: string, product2_id: number, product2_qty: number; pageTo: string }) => {
    // checkoutStore

    const checkoutStore = useCheckoutStore();
    const alert = checkoutStore.updateAlert;
    checkoutStore.setTransactionStatus(true);

    const orderId = await storage.getSessionItem('orderId')
    const params = {
        orderId,
        product1_id,
        product1_qty,
        product1_price,
        product2_id,
        product2_qty
    }
    const response: any = await apiHandler('importUpsell', params)
    const router = useRouter();
    if (response.result === 'SUCCESS') {
        checkoutStore.setTransactionStatus(false);
        if (pageTo == "/offer2") checkoutStore.setStepCompleted(3)
        if (pageTo == "/offer2_1") checkoutStore.setStepCompleted(4)
        if (pageTo == "/offer3") checkoutStore.setStepCompleted(5)
        if (pageTo == "/offer3_1") checkoutStore.setStepCompleted(6)
        if (pageTo == "/thankyou") checkoutStore.setStepCompleted(7)
        // Important for DataLayer and CAPI
        const mapppedData = mapToProductCart(response.message.items);
        storage.setSessionItem('productCart', mapppedData);
        storage.setSessionItem('subTotal', response.message.subTotal);
        storage.setSessionItem('shipping', response.message.shipTotal);
        storage.setSessionItem('tax', response.message.taxTotal);
        storage.setSessionItem('cartTotal', response.message.amountPaid);
        storage.setSessionItem('orderId', response.message.orderId);
        storage.setSessionItem('productReceipt', { subTotal: response.message.subTotal, shipping: response.message.shipTotal, tax: response.message.taxTotal, total: response.message.totalAmount, items: mapppedData });

        router.push({ path: pageTo });
    }
    else {
        alert(true, response.message);
        checkoutStore.setTransactionStatus(false);

    }
}

// Get Sales Tax
export const getOrderSalesTax = async () => {
    // Form Store
    const formStore = useFormStore();
    const { discountCode, address1, address2, city, country, postalCode, state } = formStore.formValues;
    if (!address1 || !city || !country || !postalCode || !state) return;
    // Cart Store
    const cartStore = useCartStore();

    cartStore.updateLoading(true, 'salexTax');

    const params: { [key: string]: string } = {
        couponCode: discountCode,
        shipAddress1: address1,
        shipAddress2: address2!,
        shipCity: city,
        shipCountry: country,
        shipPostalCode: postalCode,
        shipState: state
    }
    // Map product Details
    cartStore.productCart.map((el, index) => {
        const pid = "product" + (index + 1) + "_id";
        const pqty = "product" + (index + 1) + "_qty";
        const vid = "variant" + (index + 1) + "_id";
        params[pid] = el.product_id;
        params[pqty] = el.product_qty;
        params[vid] = el.variant_id;
    });
    // Call API
    const response: any = await apiHandler("orderSalesTax", params);
    if (response.result === "SUCCESS") cartStore.setSalesTax(+response.message);
    cartStore.updateLoading(false, 'salexTax');
}

export const fbCAPI = async (eventType: string) => {
    const checkoutStore = await useCheckoutStore()
    const fbPixelId = checkoutStore.fbPixelId;
    const fbaccess_token = checkoutStore.fbaccess_token;
    if (!fbPixelId || !fbaccess_token) return;
    const cartStore = await useCartStore();
    const hashedEmail = SHA256('testemail@email.com');
    const hashedPhoneNumber = SHA256(12345679890);
    const getOrderDetail = await getOrderDetails();
    const user_data = {
        client_ip_address: getOrderDetail.ipAddress,
        clientUserAgent: navigator.userAgent,
        em: hashedEmail,
        ph: hashedPhoneNumber,
        // Additional hashed fields if `Purchase` event
        ...eventType !== "Checkout" && {
            fn: await SHA256(getOrderDetail.firstName),
            ln: await SHA256(getOrderDetail.lastName),
            ct: await SHA256(getOrderDetail.city),
            st: await SHA256(getOrderDetail.state),
            zp: await SHA256(getOrderDetail.postalCode),
            country: await SHA256(getOrderDetail.country),
            fbc: getCookie("_fbc") || createFBCID(),
            fbp: getCookie("_fbp")
        }
    };
    const custom_data = {
        currency: "USD",
        value: getOrderDetail.cartTotal,
        item: getOrderDetail.productCart,
        ...(eventType !== "Checkout" && {
            orderid: getOrderDetail.orderId
        })
    };

    const params = [
        {
            event_name: eventType,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventType != "Purchase" ? 1 : getOrderDetail.orderId,
            event_source_url: getRequestUri(),
            action_source: "website",
            user_data: user_data,
            custom_data: custom_data,
        },
    ];
    await apiHandler('fbCAPI', params);
}
export const UpsellsfbCAPI = async (datalayerobj: any) => {
    const checkoutStore = await useCheckoutStore()
    const fbPixelId = checkoutStore.fbPixelId;
    const fbaccess_token = checkoutStore.fbaccess_token;
    if (!fbPixelId || !fbaccess_token) return;
    const getOrderDetail = await getOrderDetails();
    const user_data = {
        client_ip_address: getOrderDetail.ipAddress,
        client_user_agent: navigator.userAgent,
        // Additional hashed fields if `Purchase` event
    };
    const custom_data = {
        currency: "USD",
        value: datalayerobj.value,
        ItemPrice: datalayerobj.ItemPrice,
        ItemQty: datalayerobj.ItemQty,
        ItemName: datalayerobj.ItemName,
        orderid: datalayerobj.orderid

    };

    const params = [
        {
            event_name: datalayerobj.event,
            event_time: Math.floor(new Date() / 1000),
            event_id: datalayerobj.orderid,
            event_source_url: await getRequestUri(),
            action_source: "website",
            user_data: user_data,
            custom_data: custom_data,
        },
    ];
    const response: any = await apiHandler('fbCAPI', params);
}
