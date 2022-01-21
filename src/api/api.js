import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const BASE_URL = 'https://cloudscout-rest.herokuapp.com';

export const usePut = (endpoint, body, enabled=true) => {
    const { getAccessTokenSilently } = useAuth0();
    const [response, setResponse] = useState({json: {}, code: 200, isLoading: true});
    const [url, setUrl] = useState(`${BASE_URL}${endpoint}`);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (!enabled || url === BASE_URL || Object.keys(body).length === 0) {
            // prevent useless requests
            return;
        }
        if (firstRender) {
            // don't make request on first render
            setFirstRender(false);
            return;
        }
        setResponse(response => ({json: response.json, code: response.code, isLoading: true}))
        const makeRequest = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: 'read:players'
            });

            let reqObj = {
                'method': 'PUT',
                'headers': {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'Application/JSON'
                }
            }

            if (body !== undefined) {
                reqObj['body'] = JSON.stringify(body);
            }

            const apiResponse = await fetch(url, reqObj);

            setResponse({
                json: apiResponse.status !== 204 ? await apiResponse.json() : {}, 
                code: apiResponse.status, 
                isLoading: false
            });
        }
        makeRequest();
    }, [url, body]);

    return response;
}

export const useApi = (endpoint, enabled=true, enabledOnFirstRender=true) => {
    const BASE_URL = 'https://cloudscout-rest.herokuapp.com/';
    const [url, setUrl] = useState(`${BASE_URL}${endpoint}`);
    const [data, setData] = useState({json: {}, code:200, isLoading: true});
    const { getAccessTokenSilently } = useAuth0();
    const [firstRender, setFirstRender] = useState(true);


    useEffect(() => {
        if (!enabled) {
            return;
        }
        if (url === BASE_URL) {
            return;
        }
        if (!enabledOnFirstRender && firstRender) {
            // don't make request on first render
            setFirstRender(false);
            return;
        }
        setData(data => ({json: data.json, code: data.code, isLoading: true}));
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
            setData({json: await apiResponse.json(), code: apiResponse.status, isLoading: false});
        };
        getData();
    }, [url]);

    useEffect(() => {
        setUrl(`${BASE_URL}${endpoint}`)
    }, [endpoint]);

    return data;
}
