import NavBar from 'components/NavBar';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'pages/Loading';
import './Home.scss';

function Home() {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='home'>
            <NavBar>
                <NavLink className='basic-link' to='/contact'>Contact</NavLink>
                <NavLink className='basic-link' to='/about'>About</NavLink>
                <NavLink className='basic-link' to='/pricing'>Pricing</NavLink>
            </NavBar>
            <Outlet />
            <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-links'>
                        <div className='footer-link-set'>
                            <h1>General</h1>
                            <p>Login</p>
                            <p>Register</p>
                        </div>
                        <div className='footer-link-set'>
                            <h1>Company</h1>
                            <p>About</p>
                            <p>Email</p>
                        </div>
                    </div>
                    <div className='copyright'>
                        <p>© 2021, GNA Software</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
