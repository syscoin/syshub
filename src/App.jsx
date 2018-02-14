import React, { Component } from 'react';
import { connect } from 'react-redux';
import Platform from 'react-platform-js';
import { DesktopLayout, MobileLayout } from './components/layouts';
import {withStyles } from 'material-ui';

import actions from './redux/actions';
import { fire } from './API/firebase';

import appStyles from './styles/appStyle';

class App extends Component {
  state = {};
  componentDidMount() {
    const currentUser = fire.auth().currentUser;

    if (currentUser) {
      this.props.setCurrentUser(currentUser);
      return;
    }

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        fire
          .database()
          .ref('mnPrivateKey/' + user.uid)
          .on('value', snapshot => {
            user.mnPrivateKey = snapshot.val();
            this.props.setCurrentUser(user);
          });
      } else {
        this.props.setCurrentUser(null);
      }
    });

    let timer = setInterval(() => this.tick(), 35000);
    this.setState({ timer });
    this.props.platformGet({
      os: Platform.OS || '',
      osVersion: Platform.OSVersion || '',
      browser: Platform.Browser || '',
      browserVersion: Platform.BrowserVersion || '',
      engine: Platform.Engine || '',
      cpu: Platform.CPU || '',
      deviceType: Platform.DeviceType || 'desktop',
      deviceModel: Platform.DeviceModel || '',
      deviceVendor: Platform.DeviceVendor || '',
      ua: Platform.UA || ''
    });
  }

  componentWillUnmount() {
    // this.clearInterval(this.state.timer);
  }

  tick() {
    this.props.getSysStats();
  }

  render() {
    const { classes } = this.props;
    
    // console.log('Current User ===>', this.props.app.currentUser);
    return (
      /* <HttpsRedirect> */
      <div className={classes.root}>
        <Platform rules={{ DeviceType: undefined }}>
          <DesktopLayout />
          <h1 style={{ color: 'white', zIndex: '10000', display: 'none'}}>
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
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    getSysStats: () => dispatch(actions.getSysStats()),

    platformGet: platformInfo => dispatch(actions.platformGet(platformInfo))
  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(appStyles)(App));
