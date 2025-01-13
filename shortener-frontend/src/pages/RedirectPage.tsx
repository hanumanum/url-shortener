import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOriginalUrl, updateUsageStats } from '../api/apiClient';
import { AxiosError } from 'axios';
import '../index.css';

const RedirectPage: React.FC = () => {
    const { shortCode } = useParams<{ shortCode: string }>();
    const [errorDisplay, setErrorDisplay] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const shortened = await getOriginalUrl(shortCode as string);
                setMessage(shortened.data.message);
                
                try {
                    await updateUsageStats(shortCode as string);
                } catch (error) {
                    console.log(error);
                }

                setTimeout(() => {
                    window.location.href = shortened.data.data.url;
                }, 100)
            }
            catch (error) {
                const errorMessage = (error instanceof AxiosError)
                    ? (error as any).response.data.errors.join(',')
                    : 'An unknown error occurred';

                setErrorDisplay(errorMessage)
            }
        };

        fetchOriginalUrl();
    }, [shortCode]);

    return (
        <div className='redirectMassages'>
            {message && <p>{message}</p>}
            {errorDisplay && <p className='massagesErrorDisplay'>{errorDisplay}</p>}
            {!errorDisplay && <p>Redirecting...</p>}

        </div>
    );
};

export default RedirectPage;