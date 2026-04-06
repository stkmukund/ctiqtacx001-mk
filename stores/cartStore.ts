// stores/cartStore.ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CartData } from "~/utils/interface";

export const useCartStore = defineStore("cart", () => {
  const productCart = ref<any[]>([]); // Array to hold cart products
  const subTotal = ref(0); // Subtotal of cart
  // const discount = ref(0); // Discount applied to cart
  const salesTax = ref(0); // Sales tax applied to cart
  const shipping = ref(4.99); // Shipiing applied to cart
  const cartLoading = ref(false);
  const cartEmpty = ref(false);
  const discountLoading = ref(false);
  const shippingLoading = ref(false);
  const salesTaxLoading = ref(false);
  const couponSuccess = ref<any[]>([]);
  const couponError = ref<{ code?: string, msg?: string }>({});
  const tacticalXabsCart = ref<CartData[]>([]);
  const selectDisabled = ref(true); // To control the disabled state of the radio buttons
  const discount = computed(() => {
    if (couponSuccess.value.length > 0) {
      const value = couponSuccess.value.reduce((sum, item) => sum += item.price, 0);
      return value;
    }
    // Return 0 if no discounts are available
    return 0;
  });

const cartTotal = computed(() => {
  // Prevent negative subtotal after discount
  const netSubTotal = Math.max(subTotal.value - discount.value, 0);
  const total = netSubTotal + salesTax.value + shipping.value;
  storage.setSessionItem('subTotal', netSubTotal);
  storage.setSessionItem('shipping', shipping.value);
  storage.setSessionItem('tax', salesTax.value);
  storage.setSessionItem('cartTotal', total.toFixed(2));
  return total;
});

  const cartTotalLoading = computed(() => {
    if (discountLoading.value || shippingLoading.value || salesTaxLoading.value) return true;
  });

  const addProduct = (product: any, isTacticalXabs: boolean = false) => {
    // Check if the product already exists in the cart
    const existingProduct = productCart.value.find(
      (item) =>
        item.product_id === product.product_id &&
        item.variant_id === product.variant_id
    );
    // If the product already exists, do not add it again
    if (existingProduct) {
      return;
    }
    // If it does not exist, add the product to the cart
    if (isTacticalXabs) productCart.value[0] = product;
    else productCart.value.push(product);
    // Empty Product
    // handleEmptyCart();
    storage.setSessionItem('productCart', productCart.value)
    updateSubTotal();
    // calculateDiscountSavings();
    selectDisabled.value = false; // Enable the radio buttons after adding a product
  };

  const removeProduct = (productId: number) => {
    productCart.value = productCart.value.filter(
      (product) => product.product_id !== productId
    );
    storage.setSessionItem('productCart', productCart.value);
    updateSubTotal();
  };

  const updateSubTotal = () => {
    subTotal.value = productCart.value.reduce(
      (total, product) => total + product.price,
      0
    );
  };

  const applyDiscount = (amount: number) => {
    // discount.value = amount;
    updateLoading(false, 'discount');
  };

  const setSalesTax = (tax: number) => {
    salesTax.value = tax;
  };

  const loadCart = (status: string) => {
    if (status == "true") cartLoading.value = true;
    if (status == "false") cartLoading.value = false;
  };

  const emptyCart = (status: string) => {
    if (status == "true") cartEmpty.value = true;
    if (status == "false") cartEmpty.value = false;
  };

  const updateLoading = (status: boolean, type: string) => {
    if (type === "discount") discountLoading.value = status;
    if (type === "cart") cartLoading.value = status;
    if (type === "empty") cartEmpty.value = status;
    if (type === "shipping") shippingLoading.value = status;
    if (type === "salexTax") salesTaxLoading.value = status;
  }

  const updateShipping = (amount: number) => {
    shipping.value = amount;
    // updateLoading(false, 'cart');
  }

  const updateCart = (amount: number, type: string) => {
    if (type === "discount") applyDiscount(amount);
    if (type === "subTotal") updateSubTotal();
    if (type === "shipping") updateShipping(amount);
  }

  const updateCouponSuccess = (code: string, msg: string, price: number) => {
    // if (couponSuccess.value.length === 2 && !duplicateCoupon(code)) {
    //   const index = couponSuccess.value.findIndex(coupon => coupon.code === 'VIP10');
    //   if (index == 0) couponSuccess.value.pop();
    //   else if (index === 1) couponSuccess.value.shift();
    //   else couponSuccess.value.shift();
    //   couponSuccess.value.push({ code, msg, price });
    // } else if (!duplicateCoupon(code)) {
    //   couponSuccess.value.push({ code, msg, price });
    // }
    // For single coupon case
    if (!duplicateCoupon(code)) {
      couponSuccess.value = [{ code, msg, price }];
    }
  }

  const updateCouponError = (code: string, msg: string) => {
    couponError.value = { code, msg };
    setTimeout(() => {
      couponError.value = {};
    }, 5000)
  }

  const duplicateCoupon = (code: string) => {
    if (couponSuccess.value.length > 0) {
      return couponSuccess.value.some((item) => item.code === code);
    }
  }

  const removeCoupon = (code: string) => {
    if (couponSuccess.value.length > 0) {
      couponSuccess.value = couponSuccess.value.filter((item) => item.code !== code);
    }
    // Remove Error message
    if (couponError.value) {
      couponError.value = {};
    }
  }

  const updateTacticalLabsCart = (products: CartData[]) => {
    const config = useRuntimeConfig().public;
    tacticalXabsCart.value = products;
    const thankyouCase = storage.getSessionItem("thankyouCase");
    if (thankyouCase) tactiaclAddProduct(config.thankyou);
    else {
      const tacticalProduct = storage.getLocalItem('tacticalProduct');
      if (tacticalProduct) {
        tactiaclAddProduct(Number(tacticalProduct));
      } else {
        tactiaclAddProduct(Number(config.tacticalXabsIds[2]))
      }
    }
  };

  const tactiaclAddProduct = (id: number) => {
    addProduct(tacticalXabsCart.value.filter(product => product.product_id === id)[0], true);
    storage.setLocalItem('tacticalProduct', id);
  }

  return {
    productCart,
    subTotal,
    discount,
    salesTax,
    shipping,
    cartTotal,
    addProduct,
    removeProduct,
    applyDiscount,
    setSalesTax,
    cartLoading,
    cartEmpty,
    loadCart,
    emptyCart,
    discountLoading,
    updateLoading,
    updateCart,
    cartTotalLoading,
    shippingLoading,
    couponSuccess,
    couponError,
    updateCouponSuccess,
    updateCouponError,
    removeCoupon,
    salesTaxLoading,
    tacticalXabsCart,
    updateTacticalLabsCart,
    tactiaclAddProduct,
    selectDisabled
  };
});
