import NavBar from 'components/NavBar';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'pages/Loading';
import Footer from 'components/Footer';
import './Home.scss';

function Home() {
    const { isLoading } = useAuth0();
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
            <Footer linkSets={ footerLinkSets } copyrightText={ '© cloudscout, Inc.' }/>
        </div>
    );
}

export default Home;
