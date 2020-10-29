import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../context/user-context';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { user } = useUser();
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            user && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
