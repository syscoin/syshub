import React, { Component } from 'react';
import { connect } from 'react-redux';
import Platform from 'react-platform-js';
import Favicon from 'react-favicon';
import { DesktopLayout, MobileLayout } from './components/layouts';
import injectSheet from 'react-jss';

import actions from './redux/actions';

// Import services
import { fire } from './API/firebase';
import { getFire2FAstatus, getFire2FAMethod } from './API/TwoFA.service';

import appStyles from './styles/appStyle';

// Jss Provider
import JssProvider from 'react-jss/lib/JssProvider';
import { generateClassName } from './Helpers/classNameJssProvider';

class App extends Component {
  state = {};

  componentWillMount() {
    const location = window.location;
    this.tick();
    this.detectPorposalUrl(location);
  }

  async componentDidMount() {
    const currentUser = await fire.auth().currentUser;
    
    if (currentUser) {
      this.props.setCurrentUser(currentUser);
      return;
    }
    
    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        const twoFA = await getFire2FAMethod(user.uid, 'twoFA');
        
        if (twoFA) {
          await fire.database().ref('MasterNodes/' + user.uid).once('value', snapshot => {
            let list = [];
            snapshot.forEach(snap => {
              list.push(snap.val());
            });
            user['MasterNodes'] = list;
          });

          this.props.setCurrentUser(user);
          const status2FA = await getFire2FAstatus(user.uid);
          this.props.set2FA(status2FA);

          return;
        }
        user['MasterNodes'] = [];
        this.props.setCurrentUser(user);
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

  tick() {
    this.props.getSysInfo();
  }

  detectPorposalUrl(location) {
    const urlPath = location.pathname;
    const urlId = '/p/';
    if (urlPath.includes(urlId)) {
      const propHash = urlPath.substring(urlId.length);
      this.props.setPage('dashBoard');
      this.props.setProposalContainer('proposalDetail');
      this.props.setProposalShow(propHash);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <JssProvider generateClassName={generateClassName}>
        <div className={classes.root}>
          <Favicon url={require('./assets/img/png_favicon.png')} />
          <Platform rules={{ DeviceType: undefined }}>
            <DesktopLayout />
          </Platform>
          <Platform rules={{ DeviceType: 'mobile' }}>
            <MobileLayout />
          </Platform>
        </div>
      </JssProvider>
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
    getSysInfo: () => {
      return (
        dispatch(actions.getSysPrice()),
        dispatch(actions.getSysMnCount()),
        dispatch(actions.getSysMnRegistered()),
        dispatch(actions.getSysUserRegistered())
      );
    },
    setPage: page => dispatch(actions.setPage(page)),
    platformGet: platformInfo => dispatch(actions.platformGet(platformInfo)),
    set2FA: auth => dispatch(actions.set2FA(auth)),
    setProposalContainer: container =>
      dispatch(actions.setProposalContainer(container)),
    setProposalShow: propHash => dispatch(actions.setProposalShow(propHash))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(appStyles)(App));
