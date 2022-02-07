import { Navbar, NavbarBrand, NavbarItems, NavbarLink } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ReactComponent as FullLogo } from 'assets/full_logo.svg';
import Loading from 'pages/Loading';
import { FooterLinkSet, FooterLink, Footer } from 'components/Footer';
import './Home.scss';

export default function Home() {
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
            <Navbar minWidth={ 700 }>
                <NavbarBrand to='/'>
                    <FullLogo />
                </NavbarBrand>
                <NavbarItems>
                    {/*<NavbarLink isNavLink to='/contact' text='Contact' />*/}
                    {/*<NavbarLink isNavLink to='/about' text='About' />*/}
                    {/* process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' &&
                        <NavbarLink isNavLink to='/pricing' text='Pricing' />
                    */}
                </NavbarItems>
                <NavbarItems>
                    {  isAuthenticated
                        ? (<>
                            <NavbarLink isNavLink to='/app' text='Dashboard' />
                            <NavbarLink
                                to='/'
                                text='Logout'
                                onClick={ () => logout({ returnTo: window.location.origin }) }
                            />
                        </>)
                        : (<>
                            <NavbarLink
                                to='/'
                                text='Log In'
                                onClick={ () => loginWithRedirect() }
                            />
                            <NavbarLink
                                isButton
                                to='/'
                                text='Sign Up'
                                onClick={ () => loginWithRedirect({screen_hint: 'signup'}) }
                            />
                        </>)
                    }
                </NavbarItems>
            </Navbar>
            <div className='home__content'>
                <Outlet />
            </div>
            <Footer copyrightText=''>
                { process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' &&
                    <>
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
                            <FooterLink isNavLink to='/pricing'>Pricing</FooterLink>
                            <FooterLink isNavLink to='/contact'>Contact</FooterLink>
                        </FooterLinkSet>
                    </>
                }
            </Footer>
        </div>
    );
}
