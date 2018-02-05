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
  render() {
    const { classes, deviceType } = this.props;
    const { currentUser } = this.props.app;
    console.log('AaaaaaaAAAAAAAAAAAAAAAAAA', this.props);
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Header className={style}>
          <AppBar position="fixed">
            <Toolbar className="header">
              <div className="container">
                <Grid container>
                  <Grid item xs={5} className="header-bitcoin-status">
                    <HeaderStats deviceType={deviceType} />
                  </Grid>
                  <Grid item xs={7} className="name-header">
                    {currentUser ?
                      <span>
                        <span className="TxtRegular">{`Welcome  `}</span>
                        <span className="TxtBold">
                          {currentUser ? currentUser.displayName || currentUser.email : 'Guest'}
                        </span> </span> : null}


                    {currentUser ? (
                      <Button className="btn" onClick={() => this.doLogout()}>
                        <span className="text">Logout</span>
                      </Button>
                    ) : (
                        <Button
                          className="btn"
                          onClick={() => this.props.setPage('login')}
                        >
                          <span className="text">Login</span>
                        </Button>
                      )}
                  </Grid>
                </Grid>
                <MHeaderNav />
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
