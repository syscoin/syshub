import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import {
  AppHeader,
  AppContent,
  AppLSider,
  AppRSider,
  AppFooter
} from '../containers/';

//Import Styles
import 'antd/dist/antd.css';
import { desktopLayoutStyle } from './styles';


class DesktopLayout extends Component {
  render() {
    return (
      <Layout>
        <AppHeader />
        <div style={desktopLayoutStyle.wraper}>
          <div style={desktopLayoutStyle.leftSlider}>
            <AppLSider />
          </div>

          <div style={this.props.app.showChat ? desktopLayoutStyle.appContentWithChatBox : desktopLayoutStyle.appContent}>
            <AppContent />
          </div>

          {this.props.app.showChat && (
            <div style={desktopLayoutStyle.rightSlider}>
              <AppRSider />
            </div>
          )}
        </div>
        <AppFooter />
      </Layout>
    );
  }
}

const stateToProps = state => {
  console.log(state.app.showChat,"show chat")
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(DesktopLayout);
