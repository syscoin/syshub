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
  UserAccount,
} from '../../pages';
import MAppLSider from '../appLSider/appLSider';
import MAppRSider from '../appRSider/appRSider';

//Import Styles
import mAppContentStyle from './mAppContent.style';

import { cancelXHR } from '../../../redux/helpers/HTTPAsync';//Cancel allXHR


//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render() {
    const { showPage, deviceType } = this.props;

    return (
      <div style={mAppContentStyle.__container}>
        <Content style={mAppContentStyle.wraper}>
          {
            {
              home: <Home deviceType={deviceType} cancelXHR={cancelXHR} />,
              dashBoard: <DashBoard deviceType={deviceType} cancelXHR={cancelXHR} />,
              newProposal: <NewProposal deviceType={deviceType} cancelXHR={cancelXHR} />,
              news: <News deviceType={deviceType} cancelXHR={cancelXHR} />,
              userAccount: <UserAccount deviceType={deviceType} cancelXHR={cancelXHR} />,
              faq: <Faq deviceType={deviceType} cancelXHR={cancelXHR} />,
              masterNode: <MasternodeSetting deviceType={deviceType} cancelXHR={cancelXHR} />,
              tool: <MasternodeInfo deviceType={deviceType} cancelXHR={cancelXHR} />,
              login: <Login deviceType={deviceType} cancelXHR={cancelXHR} />,
              register: <Register deviceType={deviceType} cancelXHR={cancelXHR} />
            }[showPage]
          }
          {this.props.showMenu ? <MAppLSider deviceType={deviceType} /> : null}
          {this.props.showChat ? <MAppRSider deviceType={deviceType} /> : null}
        </Content>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    showPage: state.app.showPage,
    deviceType: state.app.platform.deviceType,
    showChat: state.app.showChat,
    showMenu: state.app.showMenu
  };
};

const dispatchToProps = dispatch => {
  return {};
};
export default connect(stateToProps, dispatchToProps)(withRoot(AppContent));
