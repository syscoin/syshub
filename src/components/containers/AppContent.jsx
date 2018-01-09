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

class AppContent extends Component {
  render() {
    return <div>Content</div>;
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(AppContent);
