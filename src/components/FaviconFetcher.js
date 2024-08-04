import React, { useState } from 'react';
import axios from 'axios';

const FaviconFetcher = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [data, setData] = useState([]);

    const getFavicon = async (websiteUrl) => {
        try {
            const response = await axios.get(websiteUrl);
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.data, 'text/html');
            let iconLink = doc.querySelector('link[rel="icon"]');
            if (!iconLink) {
                iconLink = doc.querySelector('link[rel="shortcut icon"]');
            }
            if (iconLink) {
                let faviconUrl = iconLink.getAttribute('href');
                if (!faviconUrl.startsWith('http')) {
                    const urlObject = new URL(faviconUrl, websiteUrl);
                    faviconUrl = urlObject.href;
                }
                return faviconUrl;
            } else {
                return `${websiteUrl}/favicon.ico`;
            }
        } catch (error) {
            console.error(`Error fetching favicon: ${error.message}`);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchedIconUrl = await getFavicon(url);
        if (fetchedIconUrl) {
            const newData = { name, url, iconUrl: fetchedIconUrl };
            setData((prevData) => [...prevData, newData]);
            setIconUrl(fetchedIconUrl);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        URL:
                        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Fetch Favicon</button>
            </form>
            {iconUrl && (
                <div>
                    <p>Favicon URL: {iconUrl}</p>
                    <img src={iconUrl} alt="Favicon" />
                </div>
            )}
            <div>
                <h3>Saved Data</h3>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </div>
        </div>
    );
};

export default FaviconFetcher;
