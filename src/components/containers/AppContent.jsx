/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import WithRoot from './WithRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-scroll';
import swal from 'sweetalert';

import { Layout } from 'antd';

//Import functionals components
import { Home, LoginTest, RegisterTest } from '../pages';

//Import Styles
import { ContentStyle } from './styles';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render() {
    return (
      <div>
        <Content style={ContentStyle.contentWraper}>
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
  classes: PropTypes.object.isRequired
};

export default WithRoot(AppContent);
