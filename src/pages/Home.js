import NavBar from 'components/NavBar';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'pages/Loading';
import { FooterLinkSet, FooterLink, Footer } from 'components/Footer';
import './Home.scss';

function Home() {
    const { isAuthenticated, 
            isLoading,
            loginWithRedirect,
            logout } = useAuth0();

    let tempNavLinks = [
            {
                url: '/contact',
                text: 'Contact',
            },
            {
                url: '/about',
                text: 'About',
            },
    ];

    if (process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT') {
        tempNavLinks.push(
            {
                url: '/pricing',
                text: 'Pricing',
            }
        )
    }

    const navLinks = tempNavLinks;


    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='home'>
            <NavBar links={ navLinks } />
            <div className='home__content'>
                <Outlet />
            </div>
            <Footer copyrightText='© 2021 cloudscout, Inc.'>
                <FooterLinkSet name='Account'>
                    { isAuthenticated
                        ? (<>
                            <FooterLink to='#' onClick={ () => logout({ returnTo: window.location.origin }) }>
                                Logout
                            </FooterLink>
                            <FooterLink isNavLink to='/app'>Dashboard</FooterLink>
                        </>)
                        : (<>
                            <FooterLink to='#' onClick={ () => loginWithRedirect() }>
                                Log In
                             </FooterLink>
                            <FooterLink to='#' onClick={ () => loginWithRedirect({screen_hint: 'signup'}) }>
                                Sign Up
                            </FooterLink>
                        </>)

                    }
                </FooterLinkSet>
                <FooterLinkSet name='Company'>
                    <FooterLink isNavLink to='/'>Home</FooterLink>
                    <FooterLink isNavLink to='/about'>About</FooterLink>
                    { process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' &&
                        <FooterLink isNavLink to='/pricing'>Pricing</FooterLink>
                    }
                    <FooterLink isNavLink to='/contact'>Contact</FooterLink>
                </FooterLinkSet>
            </Footer>
        </div>
    );
}

export default Home;
