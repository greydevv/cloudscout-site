import { SpinnerView } from 'components/Spinner';
import './Loading.scss';

function Loading() {
    return (
        <div className='loading'>
            <SpinnerView />
        </div>
    );
}

export default Loading;
