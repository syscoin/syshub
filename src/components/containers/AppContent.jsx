/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRoot } from '../HOC';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-scroll';
import swal from 'sweetalert';

import { Layout } from 'antd';
import { fire } from '../../firebase';

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
