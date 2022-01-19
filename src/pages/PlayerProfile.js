import { useParams } from 'react-router-dom';
import { useApi }  from 'api/api.js';
import BasePlayer from '../models/Player';

function PlayerProfile() {
    const {pid} = useParams()
    const { json, isLoading } = useApi(`v1/players/${pid}`);

    // let player = BasePlayer.fromJson(json);
    return (
            <div>{JSON.stringify(json)}</div>
    );
}

export default PlayerProfile;
