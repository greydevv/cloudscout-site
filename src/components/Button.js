import './Button.scss';

export function Button({ children, ...rest }) {
    return (
        <button className='basic-btn' { ...rest }>
            { children }
        </button>
    );
}

export function GradientButton({ children, ...rest }) {
    return (
        <button className='gradient-btn' { ...rest }>
            { children }
        </button>
    );
}
