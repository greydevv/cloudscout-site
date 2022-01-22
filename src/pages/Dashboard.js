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
import { copyObj } from 'util/utils';
import './Pages.scss';

export default function Dashboard() {
    const userId = useUserContext();
    const BASE_ENDPOINT = 'v1/players?limit=50';
    const [ url, setUrl ] = useState(BASE_ENDPOINT);
    const [ opts, setOpts ] = useState({});
    const [ userState, setUserState ] = useState({favorites: []})
    const [ jsonBody, setJsonBody ] = useState({});
    const [ filters, setFilters ] = useState({division: [], class: [], position: []});
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);
    const { json: playersJson, isLoading: isPlayersLoading } = useApi(url, true, false);

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
            setUserState({
                favorites: userJson.account.favorites
            });
            setJsonBody(copyObj(userJson));
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

    const onFavorite = (pid) => {
        userJson.account.favorites = [...userJson.account.favorites, pid];
        setUserState({favorites: [...userJson.account.favorites]})
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
        setUserState({favorites: newFavorites})
        setJsonBody(copyObj(userJson));
    }

    if (isUserLoading) {
        return (<SpinnerView />);
    }

    return (
        <div className='dashboard'>
            <div className='page__header'>
                <h1 className='page__head mb-md'>Dashboard</h1>
                <SearchBar handleSearch={ onSearch } />
                <div className='my-md'>
                    <Filters onFilterChange={ onFilterChange } defaultFilters={ filters } />
                </div>
            </div>
            <PlayerTable onFavorite={ onFavorite } onUnfavorite={ onUnfavorite } favorites={ userState.favorites } players={ isPlayersLoading ? [] : playersJson.map(BasePlayer.fromJson) } isLoading={ isPlayersLoading } />
        </div>
    );
}
