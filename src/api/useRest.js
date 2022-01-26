import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const restApi = axios.create({baseUrl: 'https://cloudscout-rest.herokuapp.com/'});

export const usePut = (url, body, enabled=true) => {
    const config = {
        method: 'PUT',
        url: url,
        data: body,
        headers: {'Content-Type': 'Application/JSON'}
    };
    return useRest(config, enabled);
}

export const useGet = (url, enabled=true) => {
    const config = {
        method: 'GET',
        url: url,
    }
    return useRest(config, enabled);
}

export const useRest = (config, enabled=true) => {
    const { getAccessTokenSilently } = useAuth0();
    const [response, setResponse] = useState({json: {}, code: 200, isLoading: enabled});

    useEffect(() => {
        if (!enabled) {
            return;
        }
        const makeHttpReq = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.AUTH0_REACT_APP_AUDIENCE,
                scope: 'read:players'
            });
            const authHeaders = {'Authorzation': `Bearer ${accessToken}`};
            const apiResponse = await restApi.request({
                ...config, 
                headers: {
                    ...config.headers, 
                    authHeaders
                }
            });
            setResponse({ 
                json: apiResponse.data,
                code: apiResponse.status,
                isLoading: false
            });
        }
        makeHttpReq();
    }, [config.url, enabled]);
}
