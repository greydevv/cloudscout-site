import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = (endpoint) => {
    const BASE_URL = 'https://cloudscout-rest.herokuapp.com/';
    const [url, setUrl] = useState(`${BASE_URL}${endpoint}`);
    const [data, setData] = useState({json: [], isLoading: true});
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (url === BASE_URL) {
            return;
        }
        setData(data => ({json: data.json, isLoading: true}));
        const getData = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: 'read:players'
            });
            const apiResponse = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            setData({json: await apiResponse.json(), isLoading: false});
        };
        getData();
    }, [url]);

    useEffect(() => {
        setUrl(`${BASE_URL}${endpoint}`)
    }, [endpoint]);

    return data;
}

export { useApi };
