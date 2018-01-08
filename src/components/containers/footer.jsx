/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../../components/withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import FooterStyles from '../../styles/footerStyle';
import { Link } from 'react-scroll';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
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
