import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import Filters, { FilterSection, Dropdown } from 'components/Filters'
import { SpinnerView } from 'components/Spinner';
import { useUserContext } from 'UserContext';
import { useApi, usePut }  from 'api/api.js';
import { useRest } from 'api/useRest';
import { filterOptions } from 'Const';
import { copyObj } from 'util/utils';
import './Dashboard.scss';

export default function Dashboard() {
    const userId = useUserContext();
    const [ userState, setUserState ] = useState({favorites: []})
    const [ jsonBody, setJsonBody ] = useState({});
    const [ filters, setFilters ] = useState({divisions: [], classes: [], positions: []});
    const [ params, setParams ] = useState({limit: 50, ...filters});
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);
    const { json: playersJson, isLoading: isPlayersLoading } = useRest({url: 'v1/players', params: params}, true, {}, false);

    useEffect(() => {
        if (!isUserLoading) {
            let defaultFilters = userJson.account.default_filters;
            let newParams = Object.fromEntries(Object.entries(defaultFilters).map(([key, val]) => {
                return [key, val.join(',')];
            }))
            setParams({
                ...params,
                ...newParams,
            });
            setUserState({
                favorites: userJson.account.favorites
            });

            setJsonBody(copyObj(userJson));
            setFilters(userJson.account.default_filters);
        }
    }, [isUserLoading]);

    const onSearch = useCallback((query) => {
        setParams({
            ...params,
            q: query
        });
    }, []);

    const onFilterChange = (name, values) => {
        setParams({
            ...params,
            [name]: values.join(',')
        });

        setFilters({
            ...filters,
            [name]: values,
        });
    }

    const onFilterClear = () => {
        setFilters({
            divisions: [],
            classes: [],
            positions: []
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
                    {/*<Filters onFilterChange={ onFilterChange } onFilterClear={ onFilterClear } defaultFilters={ filters } showClear />*/}
                    <Filters
                        onFilterChange={ onFilterChange }
                        onFilterClear={ onFilterClear }
                        defaultFilters={ userJson.account.default_filters }
                    />
                </div>
            </div>
            <PlayerTable 
                onFavorite={ onFavorite } 
                onUnfavorite={ onUnfavorite } 
                favorites={ userState.favorites } 
                players={ isPlayersLoading ? [] : playersJson.map(BasePlayer.fromJson) } 
                isLoading={ isPlayersLoading } 
            />
        </div>
    );
}
