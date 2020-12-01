import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../context/user-context';

/**
 * Component that handles the Public or restricted routes
 * @param {*} component this component that the Route will render
 * @param {boolean} restricted restricted to show if it's a restricted or public route
 */
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
