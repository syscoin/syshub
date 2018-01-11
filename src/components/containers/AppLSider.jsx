/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRoot } from '../HOC';

//Import functional components
import { SiderLogo, SiderMenu } from '../functionals';

// import Antd components
import { Layout, Menu, Icon } from 'antd';

// Styles
import { appLSiderStyle } from './styles';

const { SubMenu } = Menu;
const { Sider } = Layout;

class AppLSider extends Component {
  render() {
    return (
      <Sider width={300} style={appLSiderStyle.wraper}>
        <SiderLogo />
        <SiderMenu />
      </Sider>
    );
  }
}

AppLSider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(AppLSider);
