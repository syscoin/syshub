import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
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
      <Row type="flex" justify="space-around" align="middle">
        <Col xl={24} xxl={20}>
          <Layout>
            <AppHeader />
            <div style={desktopLayoutStyle.wraper}>
              <Col xl={5}>
                <AppLSider />
              </Col>

              <Col style={this.props.app.showChat ? desktopLayoutStyle.appContentWithChatBox : desktopLayoutStyle.appContent}>
                <AppContent />
              </Col>

              {this.props.app.showChat && (
                <Col style={desktopLayoutStyle.rightSlider}>
                  <AppRSider />
                </Col>
              )}
            </div>
            <AppFooter />
          </Layout>
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(DesktopLayout);
