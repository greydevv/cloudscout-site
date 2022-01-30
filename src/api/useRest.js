import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const restApi = axios.create({baseURL: 'https://cloudscout-rest.herokuapp.com/'});

export const usePut = (url) => {
    const { getAccessTokenSilently } = useAuth0();
    const [refreshIndex, setRefreshIndex] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const [json, setJson] = useState({});
    const [code, setCode] = useState(200);
    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState({});

    const refresh = (body) => {
        setBody(body);
        setRefreshIndex(refreshIndex + 1);
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            return;
        }

        setIsLoading(true);
        const makePutReq = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: 'read:players'
            });

            const apiResponse = await restApi.request({
                url: url,
                method: 'PUT',
                data: body,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'Application/JSON'
                }
            });
            setJson(await apiResponse.data);
            setCode(apiResponse.status);
            setIsLoading(false);
        }
        makePutReq();
    }, [refreshIndex]);

    return { json: json, code: code, isLoading: isLoading, refresh: refresh }
}

export const useRest = (config, isEnabled=true, defaultJson={}, enabledOnFirstRender=true) => {
    const { getAccessTokenSilently } = useAuth0();
    const [enabled, setEnabled] = useState(isEnabled);
    const [refreshIndex, setRefreshIndex] = useState(0);
    const [json, setJson] = useState(defaultJson);
    const [code, setCode] = useState(200);
    const [isLoading, setIsLoading] = useState(enabled); // not loading when not enabled
    const [firstRender, setFirstRender] = useState(true);

    const refresh = () => {
        setEnabled(true);
        setRefreshIndex(refreshIndex + 1);
    }

    useEffect(() => {
        if (firstRender && !enabledOnFirstRender) {
            setFirstRender(false);
            return;
        }
        if (!enabled) {
            return;
        }
        setIsLoading(true);
        const makeHttpReq = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: 'read:players'
            });
            const apiResponse = await restApi.request({
                ...config, 
                headers: {
                    ...config.headers, 
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'Application/JSON'
                }
            });
            setJson(await apiResponse.data);
            setCode(apiResponse.status);
            setIsLoading(false);
        }
        makeHttpReq();
    }, [config.url, config.params, enabled, refreshIndex]);

    return {
        json: json,
        code: code,
        isLoading: isLoading,
        refreshCall: refresh,
    };
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

