import Spinner from 'components/Spinner';
import './Loading.scss';

function Loading() {
    return (
        <div className='loading'>
            <div className='loading__icon'>
                <Spinner />
            </div>
        </div>
    );
}

export default Loading;
