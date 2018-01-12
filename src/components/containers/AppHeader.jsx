/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

//import components

import { headerStyle } from './styles';

class AppHeader extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar style={headerStyle.header}>Header</Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AppHeader;
