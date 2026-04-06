import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://446c6b816d4ec0de84cd0e7bd4e33cac@o4508457956278272.ingest.us.sentry.io/4508696838930432",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
