// src/components/ShortenForm.tsx
import React, { useState } from 'react';

interface ShortenFormProps {
    onSubmit: (originalUrl: string) => void;
}

const ShortenForm: React.FC<ShortenFormProps> = ({ onSubmit }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit(url);
            setUrl('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='shortenInput'
                type="url"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <button className='button' type="submit">Shorten</button>
        </form>
    );
};

export default ShortenForm;
