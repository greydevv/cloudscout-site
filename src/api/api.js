import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = (endpoint) => {
    const url = `https://cloudscout-rest.herokuapp.com/${endpoint}`;
    // const url = `http://127.0.0.1/${endpoint}` 
    const [data, setData] = useState({json: null, isLoading: true});
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        setData(data => ({json: data.json, isLoading: true}));
        const getData = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: 'read:players'
            });

            console.log(accessToken);
            const apiResponse = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            setData({json: await apiResponse.json(), isLoading: false});
        };
        getData();
    }, [url]);

    return data;
}

export { useApi };
