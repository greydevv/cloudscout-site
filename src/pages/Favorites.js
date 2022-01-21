import React from 'react';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import { useApi }  from 'api/api.js';
import { useUserContext } from 'UserContext';
import './Pages.scss';

export default function Favorites() {
    const userId = useUserContext();
    const { json: coachJson, isLoading: isCoachJsonLoading } = useApi(`v1/users/${userId}`);
    const pids = isCoachJsonLoading ? [] : coachJson['account']['favorites'];
    const { json: playerJson, isLoading: isPlayerJsonLoading } = useApi(`v1/players?pids=${pids.join(',')}`, pids.length > 0);

    return (
        <div className='favorites'>
            <div className='page__header'>
                <h1 className='page__head'>Favorites</h1>
            </div>
            <PlayerTable players={ isPlayerJsonLoading ? [] : playerJson.map(BasePlayer.fromJson)} isLoading={ isPlayerJsonLoading } />
            {/* <PlayerTable players={ isPlayerJsonLoading ? [] : playerJson.map(BasePlayer.fromJson) } isLoading={ isPlayerJsonLoading } /> */}
            {/* <PlayerTable players={ isLoading ? [] : json} */}

        </div>
    );
}
