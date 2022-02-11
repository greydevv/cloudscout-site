import { Button } from 'components/Button';
import './Error.scss';

export function ErrorView({ code, onTryAgain }) {
    return (
        <div className='error__container'>
            <div className='error__info'>
                <h1 className='error__info-name'>Oops!</h1>
                <p className='mb-sm error__info-body'>Something went wrong.</p>
                <Button onClick={ onTryAgain }>Try Again</Button>
            </div>
        </div>
    );
}
