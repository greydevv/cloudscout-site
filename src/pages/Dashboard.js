import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import Filters, { FilterSection, Dropdown } from 'components/Filters'
import { SpinnerView } from 'components/Spinner';
import { useUserContext } from 'UserContext';
import { useApi }  from 'api/api.js';
import { useRest, usePut } from 'api/useRest';
import { NUM_RESULTS, filterOptions } from 'Const';
import { copyObj } from 'util/utils';
import { Checkbox } from 'components/Button';
import './Dashboard.scss';

export default function Dashboard() {
    const userId = useUserContext();
    const [ favoritePids, setFavoritePids ] = useState([]);
    const [ params, setParams ] = useState({});
    const [ pageNo, setPageNo ] = useState(1);
    // const [ lastSeenId, setLastSeenId ] = useState();
    const { json: userJson, isLoading: isUserLoading } = useRest({url: `/v1/users/${userId}`});
    const { refresh: refreshPut } = usePut(`/v1/users/${userId}`);
    const { json: playersJson, isLoading: isPlayersLoading } = useRest({url: 'v1/players', params: params}, true, {data:[], total:0}, false);
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
        // TODO: clean up request by filtering out keys that are empty arrays
        // in filter params
        setParams({
            ...params,
            ...newParams,
        });
        setFavoritePids(userJson.account.favorites);
        // setLastSeenId(playerJson.at(-1)._id);
    }, [isUserLoading]);

    const onSearch = (query) => {
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
        let clearedParams = {limit: NUM_RESULTS};
        if (params.q) {
            clearedParams.q = params.q;
        }
        setParams(clearedParams)
    }

    const toggleAdvancedFilters = (checked) => {
        setPageNo(1);
        if (!checked) {
            setParams({
                ...params,
                advanced: null,
            });
        } else {
            let defaultAdvancedFilters = userJson.account.advanced_filters;
            let advancedFilterParams = defaultAdvancedFilters.map((filter) => {
                return Object.values(filter).join(';');
            });
            if (advancedFilterParams.length > 0) {
                setParams({
                    ...params,
                    advanced: advancedFilterParams.join(',')
                });
            }
        }
    }

    const onFavorite = (pid) => {
        putOk.current = true;
        setFavoritePids([...favoritePids, pid]);
    }

    const onUnfavorite = (pid) => {
        putOk.current = true;
        setFavoritePids(favoritePids.filter(fav => fav != pid));
    }

    const onChange = (newPage) => {
        setParams({...params, page: newPage});
        setPageNo(newPage);
    }

    if (isUserLoading) {
        return (<SpinnerView />);
    }

    return (
        <div className='dashboard'>
            <div className='page__header'>
                <h1 className='page__head mb-md'>Dashboard</h1>
                <SearchBar handleSearch={ onSearch } />
                <div className='my-md filters__section'>
                    <Filters
                        onFilterChange={ onFilterChange }
                        onFilterClear={ onFilterClear }
                        defaultFilters={ userJson.account.default_filters }
                    />
                    {userJson.account.advanced_filters.length > 0 &&
                        <div className='filters__apply-advanced__container'>
                            <p className='my-auto p-body-sm'>Advanced: </p>
                            <Checkbox onChange={ toggleAdvancedFilters } />
                        </div>
                    }
                </div>
            </div>
            <PlayerTable 
                players={ playersJson.data } 
                isLoading={ isPlayersLoading } 
                favorites={ favoritePids } 
                onFavorite={ onFavorite } 
                onUnfavorite={ onUnfavorite } 
                total={ playersJson.total }
                perPage={ NUM_RESULTS }
                currentPage={ pageNo }
                onChange={ onChange }
            />
        </div>
    );
}
