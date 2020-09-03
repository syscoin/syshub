/* eslint-disable flowtype/require-valid-file-annotation */

import React, { useState, useEffect } from 'react';
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

//Import Styles & Animation
import appContentStyle from './appContent.style';
import { useTransition, animated } from 'react-spring';
import { cancelXHR } from '../../../redux/helpers/HTTPAsync';//Cancel allXHR

const { Content } = Layout;

const AppContent = ({ showPage, deviceType }) => {
  const [activePage, setActivePage] = useState();

  useEffect(() => { setActivePage(showPage) }, [showPage]);

  const showThisPage = page => ({ style }) => (
    <animated.div style={{ ...style }}>
      {
        {
          home: <Home deviceType={deviceType} cancelXHR={cancelXHR} />,
          dashBoard: <DashBoard deviceType={deviceType} cancelXHR={cancelXHR} />,
          newProposal: <NewProposal deviceType={deviceType} cancelXHR={cancelXHR} />,
          userAccount: <UserAccount deviceType={deviceType} cancelXHR={cancelXHR} />,
          faq: <Faq deviceType={deviceType} cancelXHR={cancelXHR} />,
          masterNode: <MasternodeSetting deviceType={deviceType} cancelXHR={cancelXHR} />,
          login: <Login deviceType={deviceType} cancelXHR={cancelXHR} />,
          register: <Register deviceType={deviceType} cancelXHR={cancelXHR} />
        }[page]
      }
    </animated.div>
  );

  const transitions = useTransition(activePage, p => p, {
    from: {
      position: 'absolute',
      top: 0,
      opacity: 0,
      width: '100%',
      height: '100%'
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  return (
    <div id="content" style={appContentStyle.wrapper}>
      <Content id="contentWrapper" style={appContentStyle.contentWrapper}>
        {transitions.map(({ item, props, key }) => {
          const Page = showThisPage(item);
          return <Page key={key} style={props} />;
        })}
      </Content>
    </div>
  );
};

const stateToProps = state => {
  return {
    showPage: state.app.showPage,
    deviceType: state.app.platform.deviceType
  };
};

const dispatchToProps = dispatch => {
  return {};
};
export default connect(
  stateToProps,
  dispatchToProps
)(withRoot(AppContent));
