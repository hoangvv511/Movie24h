import React from 'react';
import NotFound from '../components/notFound';
import Films from '../components/films';
import Login from '../components/loginForm';
import Signup from '../components/signupForm';
import Detail from '../components/filmDetail';
import Watch from '../components/watch';

const routes = [
    {
        path: '/',
        exact: true,
        main: ({ match, location }) => <Films match={match} location={location} />
    },
    {
        path: '/?page=:pageID',
        exact: true,
        main: ({ match, location }) => <Films match={match} location={location} />
    },
    {
        path: '/country/:countryID',
        exact: true,
        main: ({ match, location }) => <Films match={match} location={location} />
    },
    {
        path: '/genre/:genreID',
        exact: true,
        main: ({ match, location }) => <Films match={match} location={location} />
    },
    {
        path: '/signup',
        exact: false,
        main: () => <Signup />
    },
    {
        path: '/movie/:movieID',
        exact: true,
        main: ({ match, location }) => <Detail match={match} location={location} />
    },
    {
        path: '/watch/:movieID',
        exact: true,
        main: ({ match, location }) => <Watch match={match} location={location} />
    },
    {
        path: '/login',
        exact: false,
        main: ({ location }) => <Login location={location} />
    },
    {
        path: '',
        exact: true,
        main: () => <NotFound />
    }
];

export default routes;