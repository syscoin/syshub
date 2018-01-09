/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-scroll';

import withRoot from './withRoot';
import HeaderStyles from '../styles/headerStyle';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
    width: '100%',
  },
});

class Index extends Component {
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
