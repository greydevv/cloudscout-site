import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';

function Navbar({ children }) {
    return (
        <div className='navbar p-md'>
            { children }
        </div>
    )
}

function NavbarBrand({ to, children }) {
    return (
        <div className='navbar__branding__container my-auto'>
            <NavLink to={ to } className='navbar__branding'>
                { children }
            </NavLink>
        </div>
    );
}

function NavbarItems({ children }) {
    return (
        <div className='navbar__links my-auto'>
            { children }
        </div>
    );
}

function NavbarLink({ to, text, isNavLink, isButton, ...rest}) {
    if (isNavLink) {
        return (
            <NavLink 
                to={ to }
                className={isButton ? 'navbar__link-btn my-auto' : ({ isActive }) => isActive ? 'navbar__link-active my-auto' : 'navbar__link my-auto'} 
                { ...rest }
            >
                { text }
            </NavLink>
        );
    }
    return (
        <Link
            to={ to }
            className={isButton ? 'navbar__link__btn my-auto' : 'navbar__link my-auto'}
            { ...rest }
        >
            { text }
        </Link>
    );
}

export { Navbar,
         NavbarBrand,
         NavbarItems,
         NavbarLink };
