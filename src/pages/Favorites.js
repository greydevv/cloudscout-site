import React, { useState, useEffect } from 'react';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import { useApi, usePut }  from 'api/api.js';
import { useUserContext } from 'UserContext';
import { copyObj } from 'util/utils';
import { SpinnerView } from 'components/Spinner';
import './Pages.scss';

export default function Favorites() {
    const userId = useUserContext();
    const [ userState, setUserState ] = useState({favorites: []})
    const [ initialPids, setInitialPids ] = useState([])
    const [ jsonBody, setJsonBody ] = useState({});
    const { json: userJson, isLoading: isUserLoading } = useApi(`v1/users/${userId}`);
    const { json: playersJson, isLoading: isPlayersLoading } = useApi(`v1/players?pids=${initialPids.join(',') || 'none'}`, true, false);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody)

    useEffect(() => {
        if (!isUserLoading) {
            setUserState({
                favorites: userJson.account.favorites
            });
            setInitialPids(userJson.account.favorites);
            setJsonBody(copyObj(userJson));
        }
    }, [isUserLoading]);

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
        <div className='favorites'>
            <div className='page__header'>
                <h1 className='page__head mb-md'>Favorites</h1>
            </div>
            <PlayerTable 
                onFavorite={ onFavorite }
                onUnfavorite={ onUnfavorite } 
                favorites={ userState.favorites } 
                players={ initialPids.length === 0 ? [] : (isPlayersLoading ? [] : playersJson.map(BasePlayer.fromJson)) } 
                isLoading={ initialPids.length !== 0 && isPlayersLoading } 
            />
        </div>
    );
}
