import { useState, useEffect, useRef } from 'react';
import PlayerTable from '../components/PlayerTable';
import { useRest, usePut } from 'api/useRest';
import { useUserContext } from 'UserContext';
import { copyObj } from 'util/utils';
import { SpinnerView } from 'components/Spinner';
import './Favorites.scss';

export default function Favorites() {
    const userId = useUserContext();
    const [ favoritePids, setFavoritePids ] = useState([]);
    const [ params, setParams ] = useState({limit: 50});
    const { json: userJson, isLoading: isUserLoading } = useRest({url: `v1/users/${userId}`});
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
    }, [favoritePids]);

    useEffect(() => {
        if (isUserLoading) {
            return;
        }
        console.log(userJson.account.favorites);
        if (userJson.account.favorites.length > 0) {
            setParams({
                ...params,
                pids: userJson.account.favorites.join(',')
            });
        }
        setFavoritePids(userJson.account.favorites);
    }, [isUserLoading]);

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
        <div className='favorites'>
            <div className='page__header'>
                <h1 className='page__head mb-md'>Favorites</h1>
            </div>
            <PlayerTable 
                onFavorite={ onFavorite }
                onUnfavorite={ onUnfavorite } 
                favorites={ favoritePids } 
                players={ playersJson } 
                isLoading={ favoritePids.length !== 0 && isPlayersLoading } 
            />
        </div>
    );
}
