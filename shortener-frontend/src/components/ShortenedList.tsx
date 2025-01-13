// src/components/ShortenedList.tsx
import React, { Fragment } from 'react';

interface ShortenedListProps {
    urls: { slug: string }[];
}

const thisHost = process.env.REACT_APP_HOST || 'http://localhost:8080';
const makeShortUrl = (url: { slug: string }) => `${thisHost}/${url.slug}`;

const ShortenedList: React.FC<ShortenedListProps> = ({ urls }) => {
    const [messege, setMessege] = React.useState('');

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setMessege('Copied to clipboard!');
        setTimeout(() => {
            setMessege('');
        }, 1000);
    };

    const onListButtonClick = (url: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        copyToClipboard(url);
        (event.target as HTMLButtonElement).classList.add('buttonGreen');
    }

    return (
        <Fragment>
            <div className='messeges'>{messege}</div>
            <ul className='shortenedList'>
                {urls.map(makeShortUrl).map((url) => (
                    <li key={url}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                        <button className='button' onClick={onListButtonClick(url)}>Copy</button>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export default ShortenedList;
