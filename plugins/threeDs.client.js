export default defineNuxtPlugin(() => {
  if (process.client) {
    const script = document.createElement('script');
    script.src = 'https://cdn.3dsintegrator.com/threeds.min.latest.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
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
      }
    };
    document.head.appendChild(script);
  }
});
