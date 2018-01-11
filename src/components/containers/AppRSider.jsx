/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import WithRoot from './WithRoot';

//import Styles
import { RSiderStyle } from './styles';

const { Sider } = Layout;

class AppRSider extends Component {
  render() {
    return (
      <div>
        <Sider width={200} style={RSiderStyle.siderWraper}>
          Here comes ChatBox component{' '}
        </Sider>{' '}
      </div>
    );
  }
}

AppRSider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppRSider);
