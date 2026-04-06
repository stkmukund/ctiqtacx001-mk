import { $fetch } from 'ofetch'
import { apiEndpoints } from './apiEndpoints'

// Track active requests with controller + timer
interface PendingRequest {
    controller: AbortController
    promise: Promise<any>
    timer: NodeJS.Timeout
}

const pendingRequests = new Map<string, PendingRequest>()

export const apiHandler = async <T = unknown, R = unknown>(
    endpointKey: string,
    params: T,
    options: RequestInit = {}
): Promise<R> => {
    const endpoint: ApiEndpoint | undefined = apiEndpoints[endpointKey]

    if (!endpoint) {
        throw new Error(`API endpoint '${endpointKey}' not found.`)
    }

    const { url, method } = endpoint
    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        body: method !== 'GET' ? JSON.stringify(params) : undefined,
        ...options,
    }

    const requestKey = `${url}_${JSON.stringify(params)}`

    // If already running → cancel new request immediately
    if (pendingRequests.has(requestKey)) {
        console.warn(`Duplicate request ignored: ${requestKey}`)
        return pendingRequests.get(requestKey)!.promise
    }

    // Create cancel controller
    const controller = new AbortController()
    fetchOptions.signal = controller.signal

    // Create promise
    const req = (async () => {
        try {
            let encryptedResult: any
            if (url === 'https://ipinfo.io/json') {
                encryptedResult = await $fetch<R>(url, { signal: controller.signal })
            } else {
                encryptedResult = await $fetch<R>(`${url}/?encrypt=false`, {
                    ...fetchOptions,
                    signal: controller.signal,
                })
            }

            let response: any
            if (typeof encryptedResult === 'string') {
                response = decryptedResult(encryptedResult)
            } else {
                response = encryptedResult
            }
            return response as R
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.warn(`Request aborted: ${requestKey}`)
            } else {
                console.error('API Error:', error)
            }
            throw error
        } finally {
            clearTimeout(pendingRequests.get(requestKey)?.timer)
            pendingRequests.delete(requestKey)
        }
    })()

    // Add to map with timeout cleanup (5 minutes = 300000ms)
    const timer = setTimeout(() => {
        console.warn(`Request timeout exceeded (5m): ${requestKey}`)
        controller.abort()
        pendingRequests.delete(requestKey)
    }, 5 * 60 * 1000)

    pendingRequests.set(requestKey, { controller, promise: req, timer })
    return req
}
