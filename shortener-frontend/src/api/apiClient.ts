import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3088/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getShortUrl = async (originalUrl: string): Promise<AxiosResponse> => {
    return await apiClient.post('/v1/shortener', { url: originalUrl });
};

export const getOriginalUrl = async (shortCode: string): Promise<AxiosResponse> => {
    return await apiClient.get(`/v1/shortener/${shortCode}`);
};

export const updateUsageStats = async (shortCode: string): Promise<[Error | null, AxiosResponse | null]> => {
    return await apiClient.put(`/v1/shortener/stats/${shortCode}`);
}

export default apiClient;