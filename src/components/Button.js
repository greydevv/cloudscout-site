import { useState } from 'react';
import { CheckmarkSmall } from 'components/Icons';
import './Button.scss';

export function Button({ children, isDisabled, ...rest }) {
    return (
        <button 
            className={ 'btn-basic' + (isDisabled ? '-disabled' : '')} 
            { ...rest }
        >
            { children }
        </button>
    );
}

export function GradientButton({ children, ...rest }) {
    return (
        <button className='btn-gradient' { ...rest }>
            { children }
        </button>
    );
}

export function Checkbox({ onChange }) {
    const [ isChecked, setIsChecked ] = useState(false);

    const onChangeWrapper = () => {
        onChange(!isChecked);
        setIsChecked(!isChecked);
    }

    return (
        <button 
            className={ 'my-auto btn-checkbox' + (isChecked ? '-active' : '-inactive')} 
            onClick={ onChangeWrapper }
        >
        { isChecked && <CheckmarkSmall className='btn-checkbox__icon' /> }
        </button>
    );
}
