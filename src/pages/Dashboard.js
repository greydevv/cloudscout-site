import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import Filters, { FilterSection, Dropdown } from 'components/Filters'
import { SpinnerView } from 'components/Spinner';
import { useUserContext } from 'UserContext';
import { useApi }  from 'api/api.js';
import { filterOptions } from 'Const';
import './Pages.scss';

export default function Dashboard() {
    const BASE_ENDPOINT = 'v1/players?limit=50';
    const userId = useUserContext();
    const [players, setPlayers] = useState([]);
    const [opts, setOpts] = useState({});
    const [url, setUrl] = useState(BASE_ENDPOINT);
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
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
            <PlayerTable players={ isLoading ? [] : json.map(BasePlayer.fromJson) } isLoading={ isLoading } />
        </div>
    );
}
