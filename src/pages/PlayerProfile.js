import { useParams } from 'react-router-dom';
import { useApi }  from 'api/api.js';
import BasePlayer from '../models/Player';
import { SpinnerView } from 'components/Spinner';

function PlayerProfile() {
    const {pid} = useParams()
    const { json, isLoading } = useApi(`v1/players/${pid}`);

    // : )
    if (isLoading) {
        return(
            <SpinnerView />
        );
    }
    let player = BasePlayer.fromJson(json);
    return (
            <div>{player.sport}</div>
    );
}

export default PlayerProfile;
