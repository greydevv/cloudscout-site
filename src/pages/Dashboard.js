import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import Filters, { FilterSection, Dropdown } from 'components/Filters'
import { SpinnerView } from 'components/Spinner';
import { useUserContext } from 'UserContext';
import { useApi, usePut }  from 'api/api.js';
import { filterOptions } from 'Const';
import './Pages.scss';

export default function Dashboard() {
    const BASE_ENDPOINT = 'v1/players?limit=50';
    const userId = useUserContext();
    const [players, setPlayers] = useState([]);
    const [opts, setOpts] = useState({});
    const [url, setUrl] = useState(BASE_ENDPOINT);
    const [ userData, setUserData ] = useState({favorites: []})
    const [ jsonBody, setJsonBody ] = useState({});
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);
    const { json, isLoading } = useApi(url, true, false);
    const [filters, setFilters] = useState({division: [], class: [], position: []});

    useEffect(() => {
        let newEndpoint = BASE_ENDPOINT;
        Object.entries(opts).forEach(([param,val]) => {
            newEndpoint += `&${param}=${val}`;
        });
        setUrl(newEndpoint);
    }, [opts]);

    useEffect(() => {
        if (!isUserLoading) {
            let newOpts = {
                ...opts,
                ...userJson.account.default_filters
            }
            setOpts(newOpts);
            setUserData({
                favorites: userJson.account.favorites
            });
            setJsonBody(JSON.parse(JSON.stringify(userJson)));
            setFilters({
                division: userJson.account.default_filters.division,
                class: userJson.account.default_filters.class,
                position: userJson.account.default_filters.position,
            });
        }
    }, [isUserLoading]);

    const onSearch = useCallback((query) => {
        let newOpts = {
            'q': query,
            ...opts
        }
        setOpts(newOpts);
    }, []);

    const onFilterChange = (name, values) => {
        console.log(values);
        let newOpts = {
            ...opts,
            [name]: values.join(',')
        }
        setOpts(newOpts);
        setFilters({
            ...filters,
            [name]: values,
        });
    }

    const copyObj = (obj) => {
        return JSON.parse(JSON.stringify(obj))
    };

    const onFavorite = (pid) => {
        userJson.account.favorites = [...userJson.account.favorites, pid];
        setUserData({favorites: [...userJson.account.favorites]})
        setJsonBody(copyObj(userJson));
    }

    const onUnfavorite = (pid) => {
        let newFavorites = jsonBody.account.favorites;
        for (var i = newFavorites.length - 1; i >= 0; i--) {
            if (newFavorites[i] === pid) {
                newFavorites.splice(i, 1);
                break;
            }
        }
        userJson.account.favorites = newFavorites;
        setUserData({favorites: newFavorites})
        setJsonBody(copyObj(userJson));
    }

    if (isUserLoading) {
        return (<SpinnerView />);
    }

    return (
        <div className='dashboard'>
            <div className='page__header'>
                <h1 className='page__head'>Dashboard</h1>
                <SearchBar handleSearch={ onSearch } />
                <div className='my-md'>
                    <Filters onFilterChange={ onFilterChange } defaultFilters={ filters } />
                </div>
            </div>
            <PlayerTable onFavorite={ onFavorite } onUnfavorite={ onUnfavorite } favorites={ userData.favorites } players={ isLoading ? [] : json.map(BasePlayer.fromJson) } isLoading={ isLoading } />
        </div>
    );
}
