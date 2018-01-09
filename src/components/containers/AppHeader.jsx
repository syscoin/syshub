/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import HeaderStyles from '../../styles/headerStyle';
//import EmailModal from './the-modal';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
    width: '100%',
  },
});

class AppHeader extends Component {
  state = {
    open: false,
    showModal: false,
  };

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="fixed">
          <Toolbar style={HeaderStyles.header}>Header</Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
