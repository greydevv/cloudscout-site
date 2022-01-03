import NavBar from 'components/NavBar';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'pages/Loading';
import { FooterLinkSet, Footer } from 'components/Footer';
import './Home.scss';

function Home() {
    const { isAuthenticated, 
            isLoading,
            loginWithRedirect,
            logout } = useAuth0();

    const navLinks = [
        {
            url: '/contact',
            text: 'Contact',
        },
        {
            url: '/about',
            text: 'About',
        },
        {
            url: '/pricing',
            text: 'Pricing',
        }
    ];

    const footerLinkSets = [
        {
            category: 'General',
            links: [
                'Login',
                'Register',
            ],
        },
        {
            category: 'Company',
            links: [
                'About',
                'Email',
            ],
        },
    ];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='home'>
            <NavBar links={ navLinks } />
            <Outlet />
            <Footer copyrightText='© 2021 cloudscout, Inc.'>
                { isAuthenticated 
                    ? (
                        <FooterLinkSet name='General'>
                            <Link className='footer__links__link p-body-sm' to='#' onClick={ () => logout({ returnTo: window.location.origin }) }>
                                Logout
                            </Link>
                        </FooterLinkSet>
                      )
                    : (
                        <FooterLinkSet name='General'>
                            <Link className='footer__links__link p-body-sm' to='#' onClick={ () => loginWithRedirect() }>
                                Log In
                             </Link>
                            <Link className='footer__links__link p-body-sm' to='#' onClick={ () => loginWithRedirect({screen_hint: 'signup'}) }>
                                Sign Up
                            </Link>
                        </FooterLinkSet>
                      )
                }
                <FooterLinkSet name='Company'>
                    <NavLink className='footer__links__link p-body-sm' to='/'>Home</NavLink>
                    <NavLink className='footer__links__link p-body-sm' to='/about'>About</NavLink>
                    <NavLink className='footer__links__link p-body-sm' to='/pricing'>Pricing</NavLink>
                    <NavLink className='footer__links__link p-body-sm' to='/contact'>Contact</NavLink>
                </FooterLinkSet>
            </Footer>
        </div>
    );
}

export default Home;
