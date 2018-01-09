/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-scroll';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import withRoot from './withRoot';
import FooterStyles from '../styles/footerStyle';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class Index extends Component {
  render() {
    return <div style={FooterStyles.footer}>Footer</div>;
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(Index);
