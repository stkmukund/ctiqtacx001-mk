import CryptoJS from "crypto-js";
import { trachtransectionstatus, useThreeDSauthenticateBrowser } from '~/composables/useThreeDS';
import { useCartStore, useShippingStore } from "~/stores";
import { useCheckoutStore } from "~/stores/checkoutStore";
import { useFormStore } from "~/stores/formStore";
import type { AddressComponent, CartData, CartDataProducts, GetCampaign, ImportClickResponse } from "~/utils/interface";
// Declared interface for ts error resolve
import type { DataLayerObject } from '@gtm-support/core';

declare global {
  interface Window {
    dataLayer?: DataLayerObject[];
  }
}

export const campaignQuery = async (params: any) => {
  const config = useRuntimeConfig().public;
  const campaingID = useRuntimeConfig().public.CC_CAMPAIGN_ID;
  const thankyouCase: string | boolean = storage.getSessionItem('thankyouCase') || false;

  const [ids, campaignProductId] = campaignProductIds(config.tacticalXabsIds);
  let response: GetCampaign;
  if (thankyouCase) {
    response = await apiHandler('getCampaign', { campaignProductId: campaignProductId.join(",") + "," + config.thankyou.toString() });
  } else {
    response = await apiHandler('getCampaign', { campaignProductId: campaignProductId.join(",") });
  }

  if (response.result === "SUCCESS") {
    const { products, countries, shipProfiles } = response.message.data[campaingID];
    const cartDetails = cartData(ids, products, thankyouCase);
    const vipProductData = updateVipData(products);
    const stiProductData = updateStiData(products);
    return { cartDetails, countries, shipProfiles, vipProductData, stiProductData };
  } else {
    return response;
  }
};

export const cartData = (ids: { productId: string; quantity: string; variantId: string; }[], products: CartDataProducts[], thankyouCase: boolean | string = false) => {
  const data: CartData[] = [];
  if (thankyouCase) ids.push({ productId: '71', quantity: '1', variantId: '' });
  ids.map((id) => {
    products.map((product) => {
      if (product.campaignProductId == id.productId) {
        let variants: {
          variantDetailId: string;
          price: string;
          title: string;
          imageUrl: string;
        }[] = [];
        if (id.variantId) {
          variants = product.variants.filter(
            (v) => v.variantDetailId == id.variantId
          );
        }
        data.push({
          product_id: +product.campaignProductId,
          title: product.productName,
          variant_id: variants[0] ? variants[0].variantDetailId : "",
          price: variants[0]
            ? Number(variants[0].price) * Number(id.quantity)
            : Number(product.price) * Number(id.quantity),
          image: variants[0] ? variants[0].imageUrl : product.imageUrl,
          variant_title: variants[0] ? variants[0].title : "",
          product_qty: id.quantity,
          compare_at_price: product.compareAtPrice ? Number(product.compareAtPrice) : 0,

        });
      }
    });
  });
  return data;
};

// modified as per requirements
const campaignProductIds = (productIds: number[]) => {
  const config = useRuntimeConfig().public;

  // Initialize the ids array
  const ids: { productId: string; quantity: string; variantId: string }[] = [];

  // Iterate through the productIds array
  productIds.forEach((productId, index) => {
    const quantity = '1';  // Quantity is index + 1
    const variantId = "";  // Variant is empty
    ids.push({ productId: productId.toString(), quantity, variantId });
  });

  // Create the campaignProductId array
  const campaignProductId = ids.map((item) => item.productId);
  campaignProductId.push(config.vipProduct.toString());  // Add VIP product to the list
  campaignProductId.push(config.stiProduct.toString());  // Add Shipping + Tracking + Insurance product to the list

  return [ids, campaignProductId];
};

export const decryptedResult = (encryptedResult: string) => {
  const secretKey = useRuntimeConfig().public.SecretKey; // Ensure this matches the key used for encryption

  // Decrypt the result
  const bytes = CryptoJS.AES.decrypt(encryptedResult, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const updateVipData = (products: CartDataProducts[]) => {
  const vipId = useRuntimeConfig().public.vipProduct;
  const vipProduct = products.filter(
    (product) => Number(product.campaignProductId) == vipId
  )[0];

  return {
    product_id: vipProduct.campaignProductId,
    title: vipProduct.productName,
    variant_id: "",
    price: Number(vipProduct.price),
    image: vipProduct.imageUrl,
    variant_title: "",
    product_qty: 1,
  };
};

const updateStiData = (products: CartDataProducts[]) => {
  const vipId = useRuntimeConfig().public.stiProduct;
  const vipProduct = products.filter(
    (product) => Number(product.campaignProductId) == vipId
  )[0];
  return {
    product_id: vipProduct.campaignProductId,
    title: vipProduct.productName,
    variant_id: "",
    price: Number(vipProduct.price),
    image: vipProduct.imageUrl,
    variant_title: "",
    product_qty: 1,
  };
};

export const formParams = async (type = "lead") => {
  const config = useRuntimeConfig().public;
  // Checkout Store
  const checkoutStore = useCheckoutStore();
  const { requestUri, ipAddress, pageType, sessionId, affId, emailOptIn, utmParams } =
    checkoutStore;
  // formStore
  const formStore = useFormStore();
  const { formValues } = formStore;
  // cartStore
  const cartStore = useCartStore();
  const { productCart } = cartStore;
  // orderId
  const orderId = storage.getSessionItem("orderId") ? storage.getSessionItem("orderId") : "";
  // couponCode
  const value = cartStore.couponSuccess;
  const couponCode = value.length === 2 ? value[0].code + ',' + value[1].code : value.length === 1 ? value[0].code : "";
  // params
  // const storedParams: any = await storage.getSessionItem('urlParameterString') || '{}';
  const salesPageURL = window.location.href;
  // Lead Details
  const params: any = {
    pageType,
    requestUri,
    ipAddress,
    sessionId,
    affId,
    orderId,
    emailOptIn,
    couponCode,
    // salesUrl: await getRequestUri(),
    salesUrl: salesPageURL,
    shipProfileId: formValues.shippingMethod,
    shipAddress1: formValues.address1,
    shipAddress2: formValues.address2,
    shipCity: formValues.city,
    shipCountry: formValues.country,
    shipPostalCode: formValues.postalCode,
    shipState: formValues.state,
    shipFirstName: formValues.firstName,
    shipLastName: formValues.lastName,
    address1: formValues.billingAddress1,
    address2: formValues.billingAddress2,
    billShipSame: formValues.sameAddress,
    city: formValues.billingCity,
    country: formValues.billingCountry,
    firstName: formValues.billingFirstName,
    lastName: formValues.billingLastName,
    emailAddress: formValues.email,
    phoneNumber: formValues.phone.replace(/[^\d]/g, ''),
    postalCode: formValues.billingPostalCode,
    state: formValues.billingState,
    paySource: formValues.paymentMethod,
    custom1: "TacticalXabs Store",
    custom2: "CheckoutV1",
    custom3: "ctiqtacx001",
    custom5: "API-Checkout",
    redirectsTo: salesPageURL,
    errorRedirectsTo: salesPageURL,
    cavv: formValues.cavv,
    xid: formValues.xid,
    eci: formValues.eci,
    version: formValues.version,
    acsTransId: formValues.acsTransId,
    threeDsStatus: formValues.status,
  }

  productCart.map((el, index) => {
    const pid = "product" + (index + 1) + "_id";
    const pqty = "product" + (index + 1) + "_qty";
    const prz = "product" + (index + 1) + "_price";
    params[pid] = el.product_id;
    params[pqty] = el.product_qty;
    params[prz] = el.price;
  });
  if (type === "order") {
    if (formValues.paymentMethod !== "PAYPAL") {
      params.cardNumber = formValues.cardNumber;
      params.cardMonth = formValues.expiryMonth;
      params.cardYear = formValues.expiryYear;
      params.cardSecurityCode = formValues.cvv;
      let merchent = productCart.find((el, index) => {
        return el.product_id === config.vipProduct;
      })
      if (merchent) {
        params.forceProfileId = config.forceProfileId;
      }
      else {
        params.forceMerchantId = 5;
      }
      // UTM
      // Object.entries(utmParams).forEach(([key, value]) => {
      //   // params[`custom_order_${key}`] = value;
      //   // if (value) { // Ensure value is not empty or undefined
      //   // }
      // });
    } else {
      params.paySource = 'PAYPAL';
      // params.forceMerchantId = 13;
      params.paypalBillerId = config.paypalBillerId;
    }
  };

  params.browserData = await getBrowserData();

  return params;
}
export const partialOrderFormParams = async (type = "lead") => {
  // cartStore
  const cartStore = useCartStore();
  // Checkout Store
  const checkoutStore = useCheckoutStore();
  const { ipAddress, pageType, sessionId, affId } =
    checkoutStore;
  // formStore
  const formStore = useFormStore();
  const { formValues } = formStore;
  if (!formValues.lastName || !formValues.firstName) return false
  // couponCode
  const value = cartStore.couponSuccess;
  const couponCode = value.length === 2 ? value[0].code + ',' + value[1].code : value.length === 1 ? value[0].code : "";
  const partialOrderParams: any = {
    pageType,
    ipAddress,
    sessionId,
    affId,
    couponCode,
    salesUrl: await getRequestUri(),
    shipAddress1: formValues.address1,
    shipAddress2: formValues.address2,
    shipCity: formValues.city,
    shipState: formValues.state,
    shipFirstName: formValues.firstName,
    shipLastName: formValues.lastName,
    country: formValues.billingCountry,
    firstName: formValues.billingFirstName,
    lastName: formValues.billingLastName,
    emailAddress: formValues.email,
    phoneNumber: formValues.phone.replace(/[^\d]/g, ''),
    postalCode: formValues.billingPostalCode,
  }
  return partialOrderParams;
}

export const getRequestUri = async () => window.location.href;

export const fetchIpInfo = async () => {
  try {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };
    // await fetch("https://ipinfo.io/json", requestOptions)
    const response = await fetch("https://ipinfo.io/json", requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    // throw new Error;
    console.error("Error fetching IP address:", error);
    return error;
  }
};

export const importClick = async () => {
  // Checkout Store
  const checkoutStore = useCheckoutStore();
  const { requestUri, ipAddress, pageType, sessionId, addSessionId, affId } =
    checkoutStore;
  const params = { requestUri, ipAddress, pageType, sessionId, affId };
  const response: ImportClickResponse = await apiHandler('importClick', params);
  addSessionId(response.message.sessionId); // add the sessionId to the session
};

export const calculateDiscount = async () => {

  // cartStore
  const cartStore = useCartStore();
  const { productCart, applyDiscount, updateLoading, updateCouponSuccess, updateCouponError } = cartStore;
  // formStore
  const formStore = useFormStore();
  if (!formStore.formValues.discountCode) return;
  updateLoading(true, 'discount');
  // Discount Coupon
  const params: any = { couponCode: formStore.formValues.discountCode }
  //products
  productCart.map((el, index) => {
    const pid = "product" + (index + 1) + "_id";
    const pqty = "product" + (index + 1) + "_qty";
    const vid = "variant" + (index + 1) + "_id";
    params[pid] = el.product_id;
    params[pqty] = el.product_qty;
    params[vid] = el.variant_id;
  });
  try {
    const response: any = await apiHandler('getDiscount', params)
    if (response.result === "SUCCESS") {
      if (response.message.priceDiscount > 0) {
        updateCouponSuccess(formStore.formValues.discountCode, "Coupon Code has been applied", response.message.priceDiscount);
      } else {
        updateCouponError(formStore.formValues.discountCode, "Please Enter a Valid Coupon Code");
      }
      // applyDiscount(response.message.priceDiscount);
    } else if (response.result === "ERROR") {
      updateCouponError(formStore.formValues.discountCode, response.message)
    }
  } catch (error) {
    updateLoading(false, 'discount');
  } finally {
    formStore.formValues.discountCode = "";
    updateLoading(false, 'discount');
  }
};

export async function getBrowserData() {
  const data = {
    acceptHeader: 'application/json',
    userAgent: navigator.userAgent,
    language: 'userLanguage' in navigator ? (navigator.language || (navigator as any).userLanguage) : navigator.language,
    timezone: String(new Date().getTimezoneOffset() * -1 * 60), // Timezone in minutes as a string
    colorDepth: window.screen.colorDepth,
    screen: {
      height: String(window.screen.height), // Convert to string
      width: String(window.screen.width), // Convert to string
    },
    javaScriptEnabled: true, // Always true when running in the browser
    javaEnabled: false, // Typically false; use `navigator.javaEnabled()` if needed
  };

  return JSON.stringify(data);
}

export const extractAddressComponents = async (addressComponents: AddressComponent[], type = 'ship') => {
  const formStore = useFormStore();
  const handleError = formStore.handleError;
  const shippingStore = useShippingStore();
  let streetNumber = '';
  let route = '';
  let locality = '';
  let stateCode = '';
  let countryCode = '';
  let postalCode = '';
  addressComponents.forEach(component => {
    const types = component.types;

    // Combine premise, route, and sublocality levels into streetNumber
    if (types.includes('premise') || types.includes('street_number') ||
      types.includes('sublocality_level_3') || types.includes('sublocality_level_2') ||
      types.includes('sublocality_level_1') || types.includes('route')) {
      streetNumber += ' ' + component.long_name;
    } else if (types.includes('locality')) {
      locality = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      stateCode = component.short_name; // State
    } else if (types.includes('country')) {
      countryCode = component.short_name;
    } else if (types.includes('postal_code')) {
      postalCode = component.long_name; // Main postal code
    }
  });
  // Log the extracted values
  if (type === 'ship') {
    formStore.formValues.address1 = streetNumber;
    handleError('address1');
    formStore.formValues.city = locality;
    handleError('city');
    formStore.formValues.country = countryCode;
    handleError('country');
    await shippingStore.handleStateList();
    formStore.formValues.state = stateCode;
    handleError('state');
    formStore.formValues.postalCode = postalCode;
    handleError('postalCode');
  }
  if (formStore.formValues.sameAddress || type !== 'ship') {
    formStore.formValues.billingAddress1 = streetNumber + " " + route;
    handleError('billingAddress1');
    formStore.formValues.billingCity = locality;
    handleError('billingCity');
    formStore.formValues.billingCountry = countryCode;
    handleError('billingCountry');
    await shippingStore.handleBillStateList();
    formStore.formValues.billingState = stateCode;
    handleError('billingState');
    formStore.formValues.billingPostalCode = postalCode;
    handleError('billingPostalCode');
  }
  await getOrderSalesTax();

};

export const SHA256 = (data: any) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}
/*  ------------------------------------Regarding FBC ID------------------------------------------------- */
//  Helper function to generate a consistent hash code for a string
export function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// Function to get the subdomain index
export function getSubdomainIndex() {
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[0];
  return Math.abs(hashCode(subdomain));
}

// Function to get the creation time (first page view timestamp)
export function getCreationTime() {
  const creationTimeKey = "creation_time";
  let creationTime: any = localStorage.getItem(creationTimeKey);
  if (!creationTime) {
    creationTime = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    localStorage.setItem(creationTimeKey, creationTime);
  }
  return creationTime;
}

// Function to get the fbclid from URL parameters
export function getFbclid() {
  const urlParameterString = new URLSearchParams(window.location.search);
  return urlParameterString.get("fbclid");
}

// Function to create the fbc ID
export function createFBCID() {
  const subdomainIndex = getSubdomainIndex();
  const creationTime = getCreationTime();
  const fbclid = getFbclid();

  if (fbclid) {
    return `fb.${subdomainIndex}.${creationTime}.${fbclid}`;
  }

  return "Click ID is not present in the URL parameters";
}
export const getOrderDetails = async () => {
  const ipAddress = storage.getSessionItem('ipAddress');
  const cartTotal = storage.getSessionItem('cartTotal');
  const productCart = storage.getSessionItem('productCart');
  const orderId = storage.getSessionItem('orderId');
  const firstName = storage.getSessionItem('firstName');
  const lastName = storage.getSessionItem('lastName');
  const emailAddress = storage.getSessionItem('emailAddress');
  const phoneNumber = storage.getSessionItem('phoneNumber');
  const city = storage.getSessionItem('city');
  const state = storage.getSessionItem('state');
  const postalCode = storage.getSessionItem('postalCode');
  const country = storage.getSessionItem('country');
  const subTotal = storage.getSessionItem('subTotal');
  const shipping = storage.getSessionItem('shipping');
  const tax = storage.getSessionItem('tax');
  return { subTotal, shipping, tax, ipAddress, productCart, cartTotal, orderId, firstName, lastName, emailAddress, phoneNumber, city, state, postalCode, country }
}
// fbc and fbp
export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part !== undefined) {
      return part.split(";").shift();
    }
  }
}

export async function dataLayer(eventType: string) {
  const { productCart, cartTotal, orderId, firstName, lastName, emailAddress, phoneNumber, subTotal, shipping, tax } = await getOrderDetails();
  if (!productCart) return

  const datalayerobj = {
    event: eventType,
    currency: "USD",
    subTotal,
    shipping,
    tax,
    total: cartTotal,
    items: productCart,
    ...eventType !== "Checkout" && eventType !== "AddToCart" && {
      customerfname: firstName,
      customerlname: lastName,
      customeremail: emailAddress,
      customerphone: phoneNumber,
      orderid: orderId
    }
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(datalayerobj);

}
export async function upsellsDataLayer(datatayerobj: any) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(datatayerobj);
}

export function handleFocus() {
  dataLayer('AddToCart');
}
export const addStoredParamsToUrl = () => {
  const router = useRouter();
  const route = useRoute();
  const storedParams = JSON.parse(sessionStorage.getItem('urlParameterString') || '{}');
  const currentParams = { ...route.query, ...storedParams }; // Combine
  router.replace({ query: currentParams }); // Update URL without reloading
};
export function getUpsellproId(id: string | string[]) {
  const config = useRuntimeConfig();
  const key = Array.isArray(id) ? id[0] : id;
  const productId = config.public[key];
  return productId;
}

// ConfirmPayPal Loading
export const confirmPayPalLoading = (status: boolean) => {
  storage.setSessionItem('confirmPaypalLoading', status);
}

// Destruct Items for DataLayer and CAPI:
export const mapToProductCart = (items: ProductReceipt[]): ProductReceiptSessionItems[] => (
  items.map((obj) => ({
    product_id: obj.productId,
    title: obj.name,
    price: obj.price,
    product_qty: obj.qty,
    variant_id: obj.variantDetailId,
    variant_title: obj.title
  }))
);

export const callPaayAuthorize = async () => {
  try {
    // const response = await $fetch("/api/paay-authorize", {
    //   method: "POST",
    // });
    const response = await apiHandler('paay', {});
    return response;
  } catch (err) {
    console.error("Error calling PAAY authorize:", err);
  }
}

export async function runPaayBrowserAuthentication(token: string) {
  const formStore = useFormStore();
  const errorMsg = { value: '' };
  const requestBody = {
    pan: formStore.formValues.cardNumber,
    month: formStore.formValues.expiryMonth,
    year: formStore.formValues.expiryYear?.toString().slice(-2),
    currency: '840',
    email: formStore.formValues.email,
    cardHolderName: formStore.formValues.billingFirstName || '',
    messageCategory: '01',
    browser: {
      browserAcceptHeader: 'application/json', // static
      browserJavaEnabled: navigator.javaEnabled?.() || false,
      browserJavascriptEnabled: true, // always true if this runs
      browserLanguage: navigator.language || 'en-US',
      browserColorDepth: screen.colorDepth?.toString() || '24',
      browserScreenWidth: screen.width?.toString() || '1536',
      browserScreenHeight: screen.height?.toString() || '864',
      browserTZ: new Date().getTimezoneOffset()?.toString() || '-330',
      browserUserAgent: navigator.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    },
    challengeIndicator: '02',
    challengeWindowSize: '01',
    amount: Number(storage.getSessionItem('cartTotal')),
    transactionForcedTimeout: '60',
    addrMatch: 'Y'
  };

  const requestHeaders = {
    apiKey: '7ed307ae001d29028ea7-hashed-api-key',
    bearer: token,
    origin: window.location.origin + '/',
    referer: window.location.origin + '/'
  };

  // Log both body and headers before making the request
  try {
    const { authenticateBrowser } = useThreeDSauthenticateBrowser();
    const res = await authenticateBrowser(requestBody, requestHeaders);
    return res;

    // TODO: Add logic to handle frictionless or challenge
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.statusMessage || 'Request failed';
    console.error('❌ Authentication Error:', errorMsg.value);
  }
}

export async function run3dsTransectionUpdates(token: string, transactionId: string) {
  const requestHeaders = {
    bearer: token,
    origin: window.location.origin + '/',
    referer: window.location.origin + '/'
  };
  const { transectionupdate } = trachtransectionstatus();
  const res = await transectionupdate(transactionId, [requestHeaders]);
  return res;
}