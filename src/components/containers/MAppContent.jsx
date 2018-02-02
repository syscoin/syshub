/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { withRoot } from '../HOC';

import { Layout } from 'antd';

//Import functionals components
import {
  Home,
  Login,
  Register,
  DashBoard,
  Faq,
  MasternodeSetting,
  NewProposal,
  News,
  UserAccount,
  UserAccountTest
} from '../pages';

//Import Styles
import { mAppContentStyle } from './styles';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render() {
    const { showPage, deviceType } = this.props;

    return (
      <div style={mAppContentStyle.__container}>
        <Content style={mAppContentStyle.wraper}>
          {/* 
            {
              home: <Home deviceType={deviceType} />,
              dashBoard: <DashBoard deviceType={deviceType} />,
              newProposal: <NewProposal deviceType={deviceType} />,
              news: <News deviceType={deviceType} />,
              userAccount: <UserAccount deviceType={deviceType} />,
              faq: <Faq deviceType={deviceType} />,
              masterNode: <MasternodeSetting deviceType={deviceType} />,
              login: <Login deviceType={deviceType} />,
              register: <Register deviceType={deviceType} />
            }[showPage] */}
          <Login deviceType={deviceType} />,
          <Register deviceType={deviceType} />
        </Content>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    showPage: state.app.showPage,
    deviceType: state.app.platform.deviceType
  };
};

const dispatchToProps = dispatch => {
  return {};
};
export default connect(stateToProps, dispatchToProps)(withRoot(AppContent));
