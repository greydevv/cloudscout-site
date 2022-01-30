import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const StoreJSONinCache = async () => {
    const { getAccessTokenSilently } = useAuth0();
    const [response, setResponse] = useState({json: {}, code: 200, isLoading: true});

    const url = 'https://cloudscout-rest.herokuapp.com/v1/players';

    let jsonrResponse = await fetch(url);
    let data = await jsonrResponse.json();

    // Put the object into storage
    localStorage.setItem('testObject', JSON.stringify(data));
    console.log(JSON.stringify(data));
}