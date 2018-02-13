/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import { Layout, Divider } from 'antd';
import injectSheet from 'react-jss';

//API functions
import { doLogout } from '../../API/firebase';

//ReduxActions
import actions from '../../redux/actions';

//import components
import { HeaderStats } from '../functionals';
import { Grid } from 'material-ui';
import MHeaderNav from './MHeaderNav';

//Import Styles
import { mAppHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  doLogout() {
    const { currentUser } = this.props.app;
    if (currentUser) {
      doLogout();
      this.props.doLogout();
    }
  }

  renderName(name) {
    var name = name.substring(0, name.indexOf(' '));
    return name;
  }

  render() {
    const { classes, deviceType } = this.props;
    const { currentUser } = this.props.app;
    console.log('AaaaaaaAAAAAAAAAAAAAAAAAA', this.props);
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Header className={style}>
          <AppBar position="fixed" className="app-bar">
            <Toolbar className="header">
              <div className="container">
                <Grid className="top-header__wrapper">
                  <Grid item xs={6} className="header-bitcoin-status">
                    <HeaderStats deviceType={deviceType} />
                  </Grid>
                  <Grid item xs={6} className="name-header">
                    {currentUser ?
                      <span className='text-span'>
                        <span className="TxtRegular">{`Welcome  `}</span>
                        <span className="TxtBold">
                          {currentUser ? this.renderName(currentUser.displayName) : 'Guest'}
                        </span> </span> : null}


                    {currentUser ? (
                      <Button className="btn-logout" onClick={() => this.doLogout()}>
                        <span className="text">Logout</span>
                      </Button>
                    ) : (
                        <Button
                          className="btn-login"
                          onClick={() => this.props.setPage('login')}
                        >
                          <span className="text">Login</span>
                        </Button>
                      )}
                  </Grid>
                </Grid>
                <MHeaderNav className="bottom-header__wrapper" />
              </div>
            </Toolbar>
          </AppBar>
        </Header>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    deviceType: state.app.platform.deviceType,
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(actions.doLogout()),
    setPage: page => dispatch(actions.setPage(page))
  };
};
export default connect(stateToProps, dispatchToProps)(
  injectSheet(mAppHeaderStyle)(AppHeader)
);
