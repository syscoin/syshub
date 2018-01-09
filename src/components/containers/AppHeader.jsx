/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../../components/withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import HeaderStyles from '../../styles/headerStyle';
import { Link } from 'react-scroll';
//import EmailModal from './the-modal';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
    width: '100%'
  }
});

class AppHeader extends Component {
  state = {
    open: false,
    showModal: false
  };

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
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
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(AppHeader));
