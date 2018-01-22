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
  MasterNode,
  NewProposal,
  News,
  UserAccount,
} from '../pages';

//Import Styles
import { appContentStyle } from './styles';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  render() {
    const page = this.props.app.showPage;

    return (
      <div style={appContentStyle.__container}>
        <Content style={appContentStyle.wraper}>
          {
            {
              home: <Home />,
              dashBoard: <DashBoard />,
              newProposal: <NewProposal />,
              news: <News />,
              userAccount: <UserAccount />,
              faq: <Faq />,
              masterNode: <MasterNode />,
              login: <Login />,
              register: <Register />,
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
