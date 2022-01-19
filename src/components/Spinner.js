import { LoadingInner } from 'components/Icons';
import './Spinner.scss';

export function Spinner() {
    return (
        <div className='spinner'>
            <LoadingInner className='spinner__icon' />
        </div>
    );
}

export function SpinnerView({ ...spinnerProps }) {
    return (
        <div className='spinner__container__outer'>
            <div className='spinner__container__inner'>
                <Spinner { ...spinnerProps } />
            </div>
        </div>
    );
}
