// server/api/threeds/authenticate-browser.post.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(); // get runtime config
    const josnbody = await readBody(event);

    if (!josnbody.apiKey || !josnbody.bearer) { return { status: 'SUCCESS', data: "token is not valid. " }; }
    const url = 'https://api.3dsintegrator.com/v2.2/authenticate/browser';

    const headers = {
        accept: '*/*',
        'content-type': 'application/json',
        authorization: josnbody.bearer,
        'x-3ds-api-key': config.threedsAPI_KEY,
        'x-3ds-sdk-version': '2.2.20241202',
        origin: josnbody.origin,
        referer: josnbody.referer
    };

    const body = {
        pan: josnbody.pan,
        month: josnbody.month,
        year: josnbody.year,
        currency: josnbody.currency,
        email: josnbody.email,
        shipping: {
            line1: josnbody.shipline1 || '',
            line2: josnbody.shipline2 || '',
            postCode: josnbody.shippostCode || '',
            city: josnbody.shipcity || '',
            state: josnbody.shipstate || '',
            country: josnbody.shipcountry || ''
        },
        billing: {
            line1: josnbody.billline1 || '',
            line2: josnbody.billline2 || '',
            postCode: josnbody.billpostCode || '',
            city: josnbody.billcity || '',
            state: josnbody.billstate || '',
            country: josnbody.billcountry || ''
        },
        cardHolderName: josnbody.cardHolderName || 'Not_Provided',
        messageCategory: josnbody.messageCategory || '01',
        browser: {
            browserAcceptHeader: 'application/json',
            browserJavaEnabled: false,
            browserJavascriptEnabled: true,
            browserLanguage: 'en-US',
            browserColorDepth: josnbody.browser.browserColorDepth || '',
            browserScreenWidth: josnbody.browser.browserScreenWidth || '1536',
            browserScreenHeight: josnbody.browser.browserScreenHeight || '864',
            browserTZ: josnbody.browser.browserTZ || '-330',
            browserUserAgent: josnbody.browser.browserUserAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
        },
        challengeIndicator: josnbody.challengeIndicator || '02',
        challengeWindowSize: josnbody.challengeWindowSize || '01',
        amount: josnbody.amount || '',
        transactionForcedTimeout: josnbody.transactionForcedTimeout || '60',
        addrMatch: josnbody.addrMatch || 'Y'
    };

    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers,
            body
        });

        return {
            status: 'SUCCESS',
            data: response
        };
    } catch (err: any) {
        console.error('3DS Error:', err?.data || err);
        return {
            status: 'ERROR',
            data: err?.data || err
        };

    }
});
