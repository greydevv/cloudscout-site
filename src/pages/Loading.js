import { SpinnerView } from 'components/Spinner';
import './Loading.scss';

export default function Loading() {
    return (
        <div className='loading'>
            <SpinnerView />
        </div>
    );
}
