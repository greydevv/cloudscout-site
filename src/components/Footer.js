import './Footer.scss';

function FooterLinkSet({ name, children }) {
    // children.map((child) => {
    //     console.log(child.props);
    // })
    console.log(children);
    return (
        <div className='footer__links__set'>
            <h5 className='footer__links__category h5-spaced'>{ name }</h5>
            { children }
        </div>
    );
}

function Footer({ copyrightText, children}) {
    return (
        <div className='footer px-lg pt-lg'>
            <div className='footer__content'>
                { children && 
                    <div className='footer__links'>
                        { children }
                    </div>
                }
                <div className='footer__copyright'>
                    <p className='footer__copyright__text p-body-sm'>{ copyrightText }</p>
                </div>
            </div>
        </div>
    );
}


export { FooterLinkSet, Footer };
