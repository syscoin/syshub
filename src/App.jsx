import React, { Component } from 'react';
import HttpsRedirect from 'react-https-redirect';
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
    this.props.getMediumPosts();
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.props.getSysStats();
  }

  render() {
    return (
      /* <HttpsRedirect> */
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
      /* </HttpsRedirect> */
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
    getMediumPosts: () => dispatch(actions.getMediumPosts()),
  };
};

export default connect(stateToProps, dispatchToProps)(App);
