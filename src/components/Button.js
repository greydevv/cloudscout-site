import './Button.scss';

function Button(props, { ...rest }) {
    const children = props.children;

    return (
        <button className='basic-btn' { ...rest }>
            { children }
        </button>
    );
}

function GradientButton(props, { ...rest }) {
    const children = props.children;

    return (
        <button className='gradient-btn' { ...rest }>
            { children }
        </button>
    );
}

export { Button,
         GradientButton };
