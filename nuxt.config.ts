// https://nuxt.com/docs/api/configuration/nuxt-config
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@zadigetvoltaire/nuxt-gtm"],
  css: ["@/assets/css/main.css"],

  app: {
    baseURL: process.env.PUBLIC_BASE_URL,
    head: {
      title: 'Tactical X Secure Checkout',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.png' }
      ],
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCeFDoxYtRtM1mUOWaRmtNuVfjV9orcgt8&libraries=places",
          async: true,
          defer: true,
        },
        {
          src: 'https://cdn.3dsintegrator.com/threeds.min.latest.js',
          async: true,
          defer: true,
        },
        {
          children: `
                    (function initThreeDS() {
                      if (typeof ThreeDS !== 'undefined') {
                        try {
                          window.tds = new ThreeDS("kform", "7ed307a8438289c4f00e001d29028ea7", null, {
                            autoSubmit: false,
                            endpoint: "https://api.3dsintegrator.com/v2.2",
                            verbose: true
                          });
                        } catch (error) {
                          console.warn('ThreeDS initialization failed:', error);
                        }
                      } else {
                        setTimeout(initThreeDS, 300);
                      }
                    })();
                  `
        },
      ]
    }
  },

  gtm: {
    id: "GTM-P4MS7R4D", // Keep your GTM ID
    queryParams: "", // Only include if needed
    defer: true, // Keep this to ensure non-blocking script loading
    compatibility: false, // This can remain false unless you need compatibility with older GTM features
    nonce: "2726c7f26c", // Use only if required for Content Security Policy
    enabled: true, // Enable only in production
    debug: false, // Set to false in production to avoid performance overhead
    loadScript: true, // Keep this true to load the GTM script
    enableRouterSync: true, // Keep this if you want to track route changes
    ignoredViews: "", // Use this if there are specific views you want to exclude
    trackOnNextTick: true, // Consider setting to true to ensure tracking is more reliable
    devtools: false, // Set to false in production to avoid extra overhead
  },

  runtimeConfig: {
    CC_LOGIN_ID: 'revboostapirs.clickthruiq',
    CC_PASSWORRD: 'dkIpdwryHh3921kDp20azmoV',
    GOOGLE_API_KEY: 'AIzaSyCeFDoxYtRtM1mUOWaRmtNuVfjV9orcgt8',
    threedsAPI_KEY: '7ed307a8438289c4f00e001d29028ea7',
    // Keys within public are also exposed client-side
    public: {
      pixel_id: "",
      access_token: "",
      CC_CAMPAIGN_ID: "2", // clone of 1 campaign id
      SecretKey: "darkAngle",
      svarBrandName: 'Tactical X Abs',
      svarDomainName: 'tacticalxabs.com ',
      email: 'help@tacticalxabs.com',
      phoneNumber: "+1 775-204-1037",
      paypalBillerId: 4,
      vipProduct: 103,
      forceProfileId: 2,
      stiProduct: 81,
      // vipUpsell: 1785,
      shipProfileId: 1,
      freeShipProfileId: 2,
      tacticalXabsIds: [93, 156, 159, 161],
      offer1: 60,
      offer1_1: 173,
      offer2: 122,
      offer2_1: 109,
      offer3: [72, 123],
      offer3_1: [132, 134],

      offer4: 123, // currently not in use.
      thankyou: 71,
      gtm: {
        id: "GTM-P4MS7R4D",
        queryParams: "",
        defer: true,
        compatibility: false,
        nonce: "2726c7f26c",
        enabled: true,
        debug: true,
        loadScript: true,
        enableRouterSync: true,
        ignoredViews: "",
        trackOnNextTick: true,
        devtools: false,
      },
    },
  },

  // sentry: {
  //   sourceMapsUploadOptions: {
  //     org: "revboost-7n",
  //     project: "javascript-nuxt-fwhchk002",
  //   },
  // },

  // sourcemap: {
  //   client: "hidden",
  // },
});