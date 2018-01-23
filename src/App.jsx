import React, { Component } from 'react';
import { connect } from 'react-redux';
import Platform from 'react-platform-js';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { DesktopLayout, MobileLayout } from './components/layouts';

import actions from './redux/actions';
import { fire } from './firebase';

import appStyles from './styles/appStyle';

class App extends Component {
  state = {};
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setCurrentUser(user);
      } else {
        this.props.setCurrentUser(null);
      }
    });

    let timer = setInterval(() => this.tick(), 35000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    
    this.props.getSysStats();
  }

  render() {
    return (
      <div style={appStyles.wraper}>
        <Platform rules={{ DeviceType: undefined }}>
          <DesktopLayout />
          <h1
            style={{
              color: 'white',
              zIndex: '10000',
            }}
          >
            {this.state.timer}
          </h1>
        </Platform>
        <Platform rules={{ DeviceType: 'mobile' }}>
          <MobileLayout />
        </Platform>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    getSysStats: () => dispatch(actions.getSysStats()),
  };
};

export default connect(stateToProps, dispatchToProps)(App);
