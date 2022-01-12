import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import Spinner from 'components/Spinner';
import BasePlayer from '../models/Player';
import Filter from '../components/Filters';
import { playerData } from 'Const.js';
import { useApi }  from 'api/api.js';
import { useAuth0 } from '@auth0/auth0-react';
import './Pages.scss';

function Dashboard() {
    const BASE_ENDPOINT = 'v1/players?limit=50'
    const [players, setPlayers] = useState([]);
    const [opts, setOpts] = useState({});
    const [url, setUrl] = useState(BASE_ENDPOINT);
    const { json, isLoading } = useApi(url);

    const constructUrl = useCallback(() => {
    }, [opts]);

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
                <SearchBar
                   handleSearch={ onSearch } 
                />
                <Filter
                    handleFilterChange={ onFilterChange }
                />
                {/*<p>Results returned: {this.state.json.length}</p>*/}
            </div>
            {/* <PlayerTable isLoading={ isLoading } players={ json.map(BasePlayer.fromJson).sort((a,b) => {return (a.timestamp < b.timestamp) ? 1 : -1}) } /> */}
            <PlayerTable isLoading={ isLoading } players={ json.map(BasePlayer.fromJson) } />
        </div>
    );
}

export default Dashboard;
