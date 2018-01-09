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

class Index extends Component {
  render() {
    return <div>Content</div>;
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(Index);
