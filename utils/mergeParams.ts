export function mergeParams(currentQuery: Record<string, any>): Record<string, any> {
    const storedParams = storage.getSessionItem('urlParameterString') || '{}';
    return { ...storedParams, ...currentQuery };
}
