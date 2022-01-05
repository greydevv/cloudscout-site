import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from 'pages/Dashboard';
import Favorites from 'pages/Favorites';
import Settings from 'pages/Settings';
import Home from 'pages/Home';
import Landing from 'pages/Landing';
import NotFound from 'pages/NotFound';
import About from 'pages/About';
import Pricing from 'pages/Pricing';
import Contact from 'pages/Contact';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';

ReactDOM.render(
    <Router>
        <Auth0Provider
            clientId={ process.env.REACT_APP_AUTH0_CLIENT_ID }
            domain={ process.env.REACT_APP_AUTH0_DOMAIN }
            audience={ process.env.REACT_APP_AUTH0_AUDIENCE }
            scope='read:players'
            redirectUri={ window.location.origin }
        >
            <Routes>
                <Route path='/' element={ <Home /> }>
                    <Route index element={ <Landing /> } />
                    <Route path='contact' element={ <Contact /> } />
                    <Route path='about' element={ <About /> } />
                    <Route path='pricing' element={ <Pricing /> } />
                    <Route path='*' element={ <NotFound /> } />
                </Route>
                <Route path='/app' element={ <App /> }>
                    <Route index element={ <Dashboard /> } />
                    <Route path='favorites' element={ <Favorites /> } />
                    <Route path='settings' element={ <Settings />} />
                </Route>
            </Routes>
        </Auth0Provider>
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
