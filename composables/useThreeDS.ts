// composables/useThreeDS.ts
type ThreeDSInput = {
    pan: string
    month: string
    year: string
    currency: string
    email: string
    shipline1: string,
    shipline2: string,
    shippostCode: string,
    shipcity: string,
    shipstate: string,
    shipcountry: string,
    billline1: string,
    billline2: string,
    billpostCode: string,
    billcity: string,
    billstate: string,
    billcountry: string,
    cardHolderName: string
    messageCategory?: '01' | '02'
    challengeIndicator?: '01' | '02' | '03' | '04'
    challengeWindowSize?: '01' | '02' | '03' | '04' | '05'
    amount: number
    transactionForcedTimeout?: number | string
    addrMatch?: 'Y' | 'N'
}

type Overrides = {
    apiKey?: string
    bearer?: string
    origin?: string
    referer?: string
}

export function useThreeDSauthenticateBrowser() {
    async function authenticateBrowser(input: ThreeDSInput, overrides: Overrides = {}) {

        const payload = { ...input, ...overrides }
        try {
            // const response = await $fetch('/api/threeds/authenticate-browser', {
            //     method: 'POST',
            //     body: payload
            // });

            const response = await apiHandler('authenticateBrowser', payload);

            return response;
        } catch (error) {
            console.error('Failed to authenticate 3DS:', error);
            throw error; // re-throw to let caller handle it
        }
    }
    return { authenticateBrowser }
}

export function trachtransectionstatus() {
    async function transectionupdate(transactionId: string, overrides: Overrides[]) {

        const payload = { transactionId, ...overrides }
        try {
            // const response = await $fetch('/api/threeds/transection-update', {
            //     method: 'POST',
            //     body: payload
            // });

            const response = await apiHandler('transectionUpdate', payload);

            return response;
        } catch (error) {
            console.error('Failed to authenticate 3DS:', error);
            throw error; // re-throw to let caller handle it
        }
    }
    return { transectionupdate }
}
