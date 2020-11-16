import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';

import { UserProvider } from './context/user-context';

import PrivateRoute from './components/global/PrivateRoute';
import PublicRoute from './components/global/PublicRoute';

import Header from './components/global/Header';
import Footer from './components/global/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Setup from './pages/Setup';
import Masternodes from './pages/Masternodes';
import Stats from './pages/Stats';
import Governance from './pages/Governance';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recover from './pages/Recover';
import Error from './pages/Error';
import Profile from './pages/Profile';
import NewProposal from './pages/NewProposal';


class AppComponent extends Component {
    
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Switch>
                    <PublicRoute restricted={false} path="/" component={Home} exact />
                    <PublicRoute restricted={false} path="/about" component={About} />
                    <PublicRoute restricted={false} path="/setup" component={Setup} />
                    <PublicRoute restricted={false} path="/masternodes" component={Masternodes} />
                    <PublicRoute restricted={false} path="/stats" component={Stats} />
                    <PublicRoute restricted={false} path="/governance" component={Governance} />
                    <PublicRoute restricted={true} path="/login" component={Login} />
                    <PublicRoute restricted={true} path="/signup" component={Signup} />
                    <PublicRoute restricted={true} path="/recover" component={Recover} />
                    <PrivateRoute path="/create-proposal" component={NewProposal} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PublicRoute restricted={false} component={Error} />
                </Switch>
                <div className="clearfix"></div>
                <Footer />
            </div>
        )
    }
}

const App = () => (
    <UserProvider><AppComponent /></UserProvider>
)

export default App;