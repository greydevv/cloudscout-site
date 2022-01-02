import { LoadingInner } from 'components/Icons';
import './Spinner.scss';

function Spinner() {
    return (
        <div className='spinner'>
            <LoadingInner className='spinner-icon' />
        </div> 
    );
}

export default Spinner;
