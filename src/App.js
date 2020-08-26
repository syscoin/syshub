import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './parts/Header';
import Footer from './parts/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Setup from './pages/Setup';
import Check from './pages/Check';
import Stats from './pages/Stats';
import Governance from './pages/Governance';
import Error from './pages/Error';

class App extends Component {
    render() {
        return (
          <div className="app">
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/setup" component={Setup} />
            <Route path="/check" component={Check} />
            <Route path="/stats" component={Stats} />
            <Route path="/governance" component={Governance} />
            <Route component={Error} />
        </Switch>
        <div className="clearfix"></div>
        <Footer />
        </div>
        )
    }
}

export default App;
