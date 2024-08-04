//python code for icon-url ----------not in use
import React, { useState } from 'react';
import axios from 'axios';

export default function geticon() {
    const [url, setUrl] = useState('');
    const [favicon, setFavicon] = useState('');

    const getFavicon = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-favicon', {
                params: { url }
            });
            setFavicon(response.data.favicon_url);
        } catch (error) {
            console.error('Error fetching favicon:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
            />
            <button onClick={getFavicon}>Get Favicon</button>
            <div><img src={favicon} alt="Favicon" /><h1>url: {favicon}</h1></div>
        </div>
    );
}

