import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import Filters from '../components/Filters';
import { useApi }  from 'api/api.js';
import './Pages.scss';

export default function Dashboard() {
    const BASE_ENDPOINT = 'v1/players?limit=50'
    const [players, setPlayers] = useState([]);
    const [opts, setOpts] = useState({});
    const [url, setUrl] = useState(BASE_ENDPOINT);
    const { json, isLoading } = useApi(url);

    useEffect(() => {
        let newEndpoint = BASE_ENDPOINT;
        Object.entries(opts).forEach(([param,val]) => {
            newEndpoint += `&${param}=${val}`;
        });
        setUrl(newEndpoint);
    }, [opts]);

    const onSearch = useCallback((query) => {
        let newOpts = {
            'q': query,
            ...opts
        }
        setOpts(newOpts);
    }, []);

    const onFilterChange = useCallback((filters) => {
        let newOpts = {
            ...opts,
            ...filters
        }
        setOpts(newOpts);
    }, [])

    return (
        <div className='dashboard'>
            <div className='page__header'>
                <h1 className='page__head'>Dashboard</h1>
                <SearchBar handleSearch={ onSearch } />
                <Filters handleFilterChange={ onFilterChange } />
            </div>
            <PlayerTable players={ isLoading ? [] : json.map(BasePlayer.fromJson) } isLoading={ isLoading } />
        </div>
    );
}
