/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import { Layout, Divider } from 'antd';
import injectSheet from 'react-jss';

//import components
import { HeaderStats } from '../functionals';
import { Grid } from 'material-ui';
import MHeaderNav from './MHeaderNav';

//Import Styles
import { mAppHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  render () {
    const { classes, deviceType } = this.props;
    const { currentUser } = this.props.app;
    console.log("AaaaaaaAAAAAAAAAAAAAAAAAA", this.props)
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Header className={style}>
          <AppBar position="fixed">
            <Toolbar className="header">
              <div className="container">
                <Grid container>
                  <Grid item xs={6}>
                    <HeaderStats deviceType={deviceType} />
                  </Grid>
                  <Grid item xs={6} className="name-header">
                    {currentUser ?
                      <Button className="btn">
                        <span className="text">Logout</span>
                      </Button>
                      :
                      <Button className="btn">
                        <span className="text">Login</span>

                      </Button>}
                  </Grid>
                </Grid>
                <Divider className="hdivider mb-0" />
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
  return {};
};
export default connect(stateToProps, dispatchToProps)(
  injectSheet(mAppHeaderStyle)(AppHeader)
);
