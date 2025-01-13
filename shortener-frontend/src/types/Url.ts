export interface Url {
    slug: string;
    originalUrl: string;
    shortUrl: string;
}

export type GetShortenUrlResponse = {
    message: string;
    data: {
        slug: string;
    };
    errors: string[];
}

export type GetOriginalUrlResponse = {
    message: string;
    data: {
        url: string;
    };
    errors: string[];
}