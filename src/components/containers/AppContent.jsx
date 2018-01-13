/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRoot } from '../HOC';

import { Layout } from 'antd';

//Import functionals components
import { Home, Register, LoginTest } from '../pages';

//Import Styles
import { contentStyle } from './styles';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render() {
    const page = this.props.app.showPage;

    return (
      <div>
        <Content style={contentStyle.contentWraper}>
          {
            {
              ['home']: <Home />,
              ['dash']: 'You can see DASHBOARD ',
              ['create']: 'This Create PROPOSAL',
              ['news']: 'Some NEWS to read',
              ['account']: 'Your ACCOUNT SETTINGS',
              ['faq']: 'Any doubts?, read our FAQ',
              ['masternode']: 'Your MASTERNODE SETTING',
              ['login']: <LoginTest />,
              ['register']: <Register />,
            }[this.props.app.showPage]
          }
        </Content>
      </div>
    );
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const stateToProps = state => {
  return {
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withRoot(AppContent));
