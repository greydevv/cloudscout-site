import { Outlet } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from 'components/Sidebar';
import Loading from 'pages/Loading';
import UserContextProvider from 'UserContext';
import './App.scss';

function App() {
    return (
        <div className='app'>
            <Sidebar />
            <UserContextProvider>
                <Outlet />
            </UserContextProvider>
        </div>
    );
}

export default withAuthenticationRequired(App, {
    onRedirecting: () => (<Loading />),
    returnTo: window.location.origin,
});
