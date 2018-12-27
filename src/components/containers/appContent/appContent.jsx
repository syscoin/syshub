/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRoot } from '../../HOC';

import { Layout } from 'antd';



//Import functionals components
import {
  Home,
  Login,
  Register,
  DashBoard,
  Faq,
  MasternodeSetting,
  MasternodeInfo,
  NewProposal,
  News,
  UserAccount
} from '../../pages';

//Import Styles
import appContentStyle from './appContent.style';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render () {
    const { showPage, deviceType } = this.props;
    const wrapperStyle = showPage === 'home'? appContentStyle.wrapperHome : appContentStyle.wrapper
    return (
      <div style={wrapperStyle}>
        <Content style={appContentStyle.contentWrapper}>
          {
            {
              home: <Home deviceType={deviceType} />,
              dashBoard: <DashBoard deviceType={deviceType} />,
              newProposal: <NewProposal deviceType={deviceType} />,
              news: <News deviceType={deviceType} />,
              userAccount: <UserAccount deviceType={deviceType} />,
              faq: <Faq deviceType={deviceType} />,
              masterNode: <MasternodeSetting deviceType={deviceType} />,
              tool: <MasternodeInfo deviceType={deviceType} />,
              login: <Login deviceType={deviceType} />,
              register: <Register deviceType={deviceType} />
            }[showPage]
          }
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
