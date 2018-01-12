/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRoot } from '../HOC';

import { Layout } from 'antd';

//Import functionals components
import { Home, LoginTest, RegisterTest } from '../pages';

//Import Styles
import { contentStyle } from './styles';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render() {
    return (
      <div>
        <Content style={contentStyle.contentWraper}>
          {/* <Home /> */}
          {/* TODO: Replace for correct components*/}
          <LoginTest />
          <RegisterTest />
        </Content>
      </div>
    );
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(AppContent);
