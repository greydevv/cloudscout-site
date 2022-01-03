import { NavLink, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ReactComponent as FullLogo } from 'assets/full_logo.svg';
import './NavBar.scss';

function AuthLinks() {
    const { isAuthenticated,
            loginWithRedirect,
            logout } = useAuth0();

    if (isAuthenticated) {
        return (
            <Link className='navbar__link my-auto' to='#' onClick={ () => logout({ returnTo: window.location.origin }) }>
                Logout
            </Link>
        );
    }

    return (
        <>
            <Link className='navbar__link my-auto' to='#' onClick={ () => loginWithRedirect() }>
                Log In
            </Link>
            <Link className='navbar__link__btn my-auto' to='#' onClick={ () => loginWithRedirect({screen_hint: 'signup'}) }>
                Sign Up
            </Link>
        </>
    );
}

function NavBar({ links }) {
    return (
        <div className='navbar p-md'>
            <div className='navbar__brand__container my-auto'>
                <NavLink to='/'>
                    <FullLogo className='navbar__brand__img' />
                </NavLink>
            </div>
            { links &&
                <div className='navbar__links my-auto'>
                    {links.map((link, i) => {
                        return (
                            <NavLink 
                                key={ i } 
                                className={({ isActive }) => isActive ? 'navbar__link-active' : 'navbar__link'} 
                                to={ link.url }
                            >
                                { link.text }
                            </NavLink>
                        );
                    })}
                </div>
            }
            <div className='navbar__links'>
                <AuthLinks />
            </div>
        </div>
    );
}
 
export default NavBar;

