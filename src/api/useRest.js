import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const restApi = axios.create({baseURL: 'https://cloudscout-rest.herokuapp.com/'});

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

export const useRest = (config, enabled=true, defaultJson={}, enabledOnFirstRender=true) => {
    const { getAccessTokenSilently } = useAuth0();
    const [response, setResponse] = useState({json: defaultJson, code: 200, isLoading: enabled});
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (firstRender && !enabledOnFirstRender) {
            setFirstRender(false);
            return;
        }
        if (!enabled) {
            return;
        }
        const makeHttpReq = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: 'read:players'
            });
            const apiResponse = await restApi.request({
                ...config, 
                headers: {
                    ...config.headers, 
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setResponse({ 
                json: await apiResponse.data,
                code: apiResponse.status,
                isLoading: false
            });
        }
        makeHttpReq();
    }, [config.url, config.params, enabled]);

    return response;
}

export const useHttpReq = () => {
    const { getAccessTokenSilently } = useAuth0();
    const makeHttpReq = async (config) => {
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: 'read:players'
        });
        return await restApi.request({
            ...config,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'Application/JSON',
            }
        });
    }

    return makeHttpReq;
}

