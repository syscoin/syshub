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

const { Content } = Layout;

const AppContent = ({ showPage, deviceType }) => {
  const [activePage, setActivePage] = useState();

  useEffect(() => setActivePage(showPage));

  const showThisPage = page => ({ style }) => (
    <animated.div style={{ ...style }}>
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
