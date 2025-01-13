import { NextFunction, Request, RequestHandler, Response } from 'express';

const buckets = new Map<string, { tokens: number; lastRefill: number }>();

export const tokenBucketLimiterMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || 'unknown';
    //TODO: Move following constants to env variables
    const bucketCapacity = 10;
    const refillRate = 1;
    const refillInterval = 1000;

    const now = Date.now();

    if (!buckets.has(ip)) {
        buckets.set(ip, { tokens: bucketCapacity, lastRefill: now });
    }

    const bucket = buckets.get(ip)!;
    const timeElapsed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor(timeElapsed / refillInterval) * refillRate;

    bucket.tokens = Math.min(bucketCapacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens <= 0) {
        res
            .status(429)
            .json({
                message: 'Too many requests, please try again later.',
                errors: ['Too many requests, please try again later.']
            });
        return;
    }

    bucket.tokens--;
    next();
};