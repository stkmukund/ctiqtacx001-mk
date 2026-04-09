// FormTypes.ts

export interface FormData {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string; // Optional field
  city: string;
  country: string;
  state: string;
  postalCode: string;
  sameAddress: boolean | string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress1: string;
  billingAddress2?: string; // Optional field
  billingCity: string;
  billingCountry: string;
  billingState: string;
  billingPostalCode: string;
  shippingMethod: string;
  discountCode: string;
  paymentMethod: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cavv: string;
  xid: string;
  eci: string;
  version: string;
  acsTransId: string;
  status: string;
}

export interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "post"; // Specify allowed HTTP methods
  redirect: "follow" | "error" | "manual"; // Specify allowed redirect options
}

export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export interface AddressComponents {
  types: [
    'premise',
    'street_number',
    'sublocality_level_3',
    'sublocality_level_2',
    'sublocality_level_1',
    'route',
    'locality',
    'administrative_area_level_1',
    'administrative_area_level_2',
    'administrative_area_level_3',
    'country',
    'postal_code',
  ],
  long_name: string;
  short_name: string;
}

export interface CartData {
  product_id: number;
  price: number;
  title: string;
  variant_title: string;
  variant_id: string;
  product_qty: string;
  image: string;
  compare_at_price: number;
}

export interface upsellProductDetails {
  productId: string;
  productQty: number;
  productPrice: string
  variantDetailId: string;
  pageTo: string;
  ItemName: string;
  event:string
}

export interface CartDataProducts {
  campaignProductId: string;
  variants: {
    variantDetailId: string;
    price: string;
    title: string;
    imageUrl: string;
  }[];
  productName: string;
  price: string;
  imageUrl: string;
  compareAtPrice?: string;
}

// Product Reciept interface
export interface ProductReceipt {
  variantDetailId: string;
  title: string;
  qty: string;
  price: string;
  name: string;
  productId: string;
}

export interface ProductReceiptSessionItems {
  product_id: string;
  title: string;
  price: string;
  product_qty: string;
  variant_id: string;
  variant_title: string;
}

export interface ProductReceiptSession {
  subTotal: string;
  shipping: string;
  tax: string;
  total: string;
  items: ProductReceiptSessionItems[];
}

// For Google Address Autocomplete
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

// For Get Campaign API Response
export interface GetCampaign {
  result: string;
  message: {
    data: {
      [key: string]: {
        campaignId: number;
        products: CartDataProducts[];
        countries: { [key: string]: string }[];
        coupons: { [key: string]: string }[];
        shipProfiles: { [key: string]: string }[];
      }
    }
  }
}

// For Import Click
export interface ImportClickResponse {
  result: string,
  message: {
    sessionId: string,
    affVals: {}
  }
}