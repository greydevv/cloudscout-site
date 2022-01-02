import { NavLink } from 'react-router-dom';
import { Button } from 'components/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { ReactComponent as FullLogo } from 'assets/full_logo.svg';
import './NavBar.scss';

function AuthLinks() {
    const { isAuthenticated,
            loginWithRedirect,
            logout } = useAuth0();

    if (isAuthenticated) {
        return (
            <NavLink className='basic-link' to='/' onClick={ () => logout({ returnTo: window.location.origin }) }>
                Logout
            </NavLink>
        );
    }

    return (
        <>
            <NavLink className='basic-link' to='/' onClick={ () => loginWithRedirect() }>
                Log In
            </NavLink>
            <NavLink className='signup-btn' to='/' onClick={ () => loginWithRedirect({screen_hint: 'signup'}) }>
                Sign Up
            </NavLink>
        </>
    );
}

function NavBar(props) {
    const children = props.children;

    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <div className='logo'>
                    <NavLink to='/'>
                        <FullLogo />
                    </NavLink>
                </div>
                { props.children &&
                    <div className='navbar-links'>
                        { children }
                    </div>
                }
                <div className='navbar-auth-links'>
                    <AuthLinks />
                </div>
            </div>
        </div>
    );
}
 
export default NavBar;

