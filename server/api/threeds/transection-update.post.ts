// server/api/threeds/transection-update.post.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(); // get runtime config
    const josnbody = await readBody(event);

    if (!josnbody.transactionId) { return { status: 'SUCCESS', data: "transaction id is not valid. " }; }
    const url = `https://api.3dsintegrator.com/v2.2/transaction/${josnbody.transactionId}/updates`;
    const headers = {
        accept: '*/*',
        'content-type': 'application/json',
        authorization: josnbody['0'].bearer,
        'x-3ds-api-key': config.threedsAPI_KEY,
        'x-3ds-sdk-version': '2.2.20241202',
        origin: josnbody['0'].origin,
        referer: josnbody['0'].referer
    };

    try {
        const response = await $fetch(url, {
            method: 'GET',
            headers
        });
        return response;
    } catch (err: any) {
        console.error('3DS Error:', err?.data || err);
        return {
            status: 'ERROR',
            data: err?.data || err
        };

    }
});
