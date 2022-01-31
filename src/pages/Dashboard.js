import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import Filters, { FilterSection, Dropdown } from 'components/Filters'
import { SpinnerView } from 'components/Spinner';
import { useUserContext } from 'UserContext';
import { useApi }  from 'api/api.js';
import { useRest, usePut } from 'api/useRest';
import { filterOptions } from 'Const';
import { copyObj } from 'util/utils';
import './Dashboard.scss';

export default function Dashboard() {
    const userId = useUserContext();
    const [ favoritePids, setFavoritePids ] = useState([]);
    const [ params, setParams ] = useState({limit: 50});
    const { json: userJson, isLoading: isUserLoading } = useRest({url: `/v1/users/${userId}`});
    const { refresh: refreshPut } = usePut(`/v1/users/${userId}`);
    const { json: playersJson, isLoading: isPlayersLoading } = useRest({url: 'v1/players', params: params}, true, [], false);
    const putOk = useRef(false);

    useEffect(() => {
        if (!putOk.current) {
            return;
        }
        refreshPut({
            ...userJson,
            account: {
                ...userJson.account,
                favorites: favoritePids
            }
        });
    }, [favoritePids])

    useEffect(() => {
        if (isUserLoading) {
            return;
        }

        let defaultFilters = userJson.account.default_filters;
        let newParams = Object.fromEntries(Object.entries(defaultFilters).map(([key, val]) => {
            return [key, val.join(',')];
        }));
        setParams({
            ...params,
            ...newParams,
        });
        setFavoritePids(userJson.account.favorites);
    }, [isUserLoading]);

    const onSearch = (query) => {
        console.log(query);
        if (query.length === 0) {
            setParams({...params, q:''});
        } else {
            setParams({
                ...params,
                'q': query,
            });
        }
    }

    const onFilterChange = (name, values) => {
        setParams({
            ...params,
            [name]: values.join(',')
        });
    }

    const onFilterClear = () => {
        let clearedParams = {limit: 50};
        if (params.q) {
            clearedParams.q = params.q;
        }
        setParams(clearedParams)
    }

    const onFavorite = (pid) => {
        putOk.current = true;
        setFavoritePids([...favoritePids, pid]);
    }

    const onUnfavorite = (pid) => {
        putOk.current = true;
        setFavoritePids(favoritePids.filter(fav => fav != pid));
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
                favorites={ favoritePids } 
                players={ playersJson } 
                isLoading={ isPlayersLoading } 
            />
        </div>
    );
}
