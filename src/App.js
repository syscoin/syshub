import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';

import PrivateRoute from './parts/PrivateRoute';
import PublicRoute from './parts/PublicRoute';

import Header from './parts/Header';
import Footer from './parts/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Setup from './pages/Setup';
import Check from './pages/Check';
import Stats from './pages/Stats';
import Governance from './pages/Governance';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';


class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Switch>
                    <PublicRoute restricted={false} path="/" component={Home} exact />
                    <PublicRoute restricted={false} path="/about" component={About} />
                    <PublicRoute restricted={false} path="/setup" component={Setup} />
                    <PublicRoute restricted={false} path="/check" component={Check} />
                    <PublicRoute restricted={false} path="/stats" component={Stats} />
                    <PublicRoute restricted={false} path="/governance" component={Governance} />
                    <PublicRoute restricted={true} path="/login" component={Login} />
                    <PublicRoute restricted={true} path="/register" component={Register} />
                    <PrivateRoute path="/dashboard" component={About} />
                    <PublicRoute restricted={false} component={Error} />
                </Switch>
                <div className="clearfix"></div>
                <Footer />
            </div>
        )
    }
}

export default App;
