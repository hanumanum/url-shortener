import React, { useState } from 'react';
import ShortenForm from '../components/ShortenForm';
import ShortenedList from '../components/ShortenedList';
import { getShortUrl } from '../api/apiClient';
import { AxiosError } from 'axios';
import '../index.css';

const HomePage: React.FC = () => {
    const [urls, setUrls] = useState<{ slug: string; }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleShorten = async (originalUrl: string) => {
        setError(null);
        try{
            const shortUrlResponse = await getShortUrl(originalUrl);
            setUrls((prev) => [{ slug: shortUrlResponse.data.data.slug }, ...prev]);
        }
        catch (error) {
            const errorMessage = (error instanceof AxiosError)
                    ? (error as any).response.data.errors.join(',')
                    : 'An unknown error occurred';

            setError(errorMessage);
        }
    };

    return (
        <div className='shrotenerContainer'>
            <h1>URL Shortener</h1>
            <p>Enter a URL to shorten it</p>
            {error && <p>{error}</p>}
            <ShortenForm onSubmit={handleShorten} />
            <ShortenedList urls={urls} />
        </div>
    );
};

export default HomePage;
