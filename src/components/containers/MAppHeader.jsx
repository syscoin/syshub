/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Layout } from 'antd';
import injectSheet from 'react-jss';

//ReduxActions
import actions from '../../redux/actions';

//import components
import MHeaderNav from './MHeaderNav';

//Import Styles
import { mAppHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  renderName(name) {
    if (name.indexOf(' ') >= 0) {
      name = name.substring(0, name.indexOf(' '));
    }
    return name;
  }

  render() {
    const { classes } = this.props;
    //Platform style switcher
    
    return (
      <div>
        <Header className={classes.mRoot}>
          <AppBar position="fixed" className="app-bar">
            <Toolbar className="header">
              <div className="container">
                <MHeaderNav/>
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
    setPage: page => dispatch(actions.setPage(page))
  };
};
export default connect(stateToProps, dispatchToProps)(
  injectSheet(mAppHeaderStyle)(AppHeader)
);
