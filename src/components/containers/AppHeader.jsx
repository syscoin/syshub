/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

//import components
import HeaderStats from '../functionals/HeaderStats';
import Status from '../functionals/Status';

import { appHeaderStyle } from './styles';

class AppHeader extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar style={appHeaderStyle.header}>
            <div style={appHeaderStyle.container}>
              <HeaderStats />
              <Status />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AppHeader;
