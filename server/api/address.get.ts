import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { lat, lon } = query;

    if (!lat || !lon) {
        return { error: "Missing latitude or longitude" };
    }

    const GOOGLE_API_KEY = useRuntimeConfig().GOOGLE_API_KEY;

    try {
        // Get full address from Google Maps API
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (data.status !== "OK" || data.results.length === 0) {
            return { error: "No address found" };
        }

        const addressComponents = data.results[0].address_components;
        const modifiedAddress = data.results[0].formatted_address.split(",");
        const newAddress = modifiedAddress.slice(0, modifiedAddress.length - 3).join(",");
        return {
            address1: newAddress || "",
            city: getComponent(addressComponents, "locality"),
            state: getComponent(addressComponents, "administrative_area_level_1"),
            country: getComponent(addressComponents, "country")
        };
    } catch (error) {
        return { error: "Failed to fetch address" };
    }
});

// Helper function to extract address components
const getComponent = (components: any[], type: string) => {
    const component = components.find((c) => c.types.includes(type));
    if (type === "country" || type === "administrative_area_level_1") return component ? component.short_name : "";
    else return component ? component.long_name : "";
};
