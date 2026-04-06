import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(); // get runtime config
  try {
    const body = await readBody(event);

    const response = await fetch("https://api.3dsintegrator.com/v2.2/authorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-3ds-api-key": config.threedsAPI_KEY,
      },
      body: JSON.stringify(body),
    });

    const responseBody = await response.json();
    const authorizationHeader = response.headers.get("authorization") || response.headers.get("Authorization");

    return {
      success: true,
      data: responseBody,
      token: authorizationHeader || null,
    };

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "Something went wrong -- call ashutosh" };
    }
    return { error: "Something went wrong -- call ashutosh" };
  }
});
