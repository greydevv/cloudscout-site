import { useState } from 'react';
import { CheckmarkSmall, BackArrow } from 'components/Icons';
import { useNavigate } from 'react-router-dom';
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

export function BackButton() {
    const navigate = useNavigate();

    return (
        <button className='btn-back' onClick={() => navigate(-1)}>
            <BackArrow className='btn-back__icon' />
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

export function ToggleButton({ text, icon, onChange }) {
    const [ isToggled, setIsToggled ] = useState(false);

    const onChangeWrapper = () => {
        onChange(!isToggled);
        setIsToggled(!isToggled);
    }

    return (
        <button className={ 'btn-toggle' + (isToggled ? '-active' : '')} onClick={ onChangeWrapper } >
            { icon }
            { text }
        </button>
    );
}
