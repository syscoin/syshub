import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../context/user-context';

import Loading from './Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, loadingUser } = useUser();
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            !loadingUser ? (
                user ?
                    <Component {...props} />
                : <Redirect to="/login" />
            )
            : <Loading />
        )} />
    );
};

export default PrivateRoute;
