import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as FullLogo } from 'assets/full_logo.svg';
import './Footer.scss';

function FooterLinkSet({ name, children }) {
    return (
        <div className='footer__links__set'>
            <h5 className='footer__links__category h5-spaced'>{ name }</h5>
            { children }
        </div>
    );
}

function FooterLink({ isNavLink, children, ...rest }, props) {
    let className = 'footer__links__link p-body-sm';
    if (props.className) {
        className = className + ' ' + props.className;
    }
    if (isNavLink) {
        return <NavLink className={ className } { ...rest }>{ children }</NavLink>;
    }
    return <Link className={ className } { ...rest }>{ children }</Link>;
}

function Footer({ copyrightText, children}) {
    return (
        <div className='footer px-lg pt-lg'>
            <div className='footer__content'>
                <div className='footer__brand__container'>
                    <FullLogo className='footer__brand__img' />
                </div>
                { children && 
                    <div className='footer__links'>
                        { children }
                    </div>
                }
            </div>
            <div className='footer__copyright mt-lg py-sm'>
                <p className='footer__copyright__text p-body-sm'>{ copyrightText }</p>
            </div>
        </div>
    );
}


export { FooterLinkSet, FooterLink, Footer };
