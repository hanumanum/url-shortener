export const memoize = <T extends (...args: any[]) => any>(fn: T, ttl: number): T => {
    const cache: Record<string, { value: any, expiry: number }> = {};

    return ((...args: any[]) => {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache[key] && cache[key].expiry > now) {
            return cache[key].value;
        }

        const result = fn(...args);
        cache[key] = { value: result, expiry: now + ttl };
        return result;
    }) as T;
}

export const memoizeAsync = <T extends (...args: any[]) => Promise<any>>(fn: T, ttl: number): T => {
    const cache: Record<string, { value: any, expiry: number }> = {};

    return (async (...args: any[]) => {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache[key] && cache[key].expiry > now) {
            return Promise.resolve(cache[key].value);
        }

        const result = await fn(...args);
        cache[key] = { value: result, expiry: now + ttl };
        return result;
    }) as T;
}