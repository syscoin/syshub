import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Material-UI components
import LinearProgress from '@material-ui/core/LinearProgress';

import { AppHeader, AppContent, AppLSider, AppFooter } from '../../containers/';

//Import Styles
import 'antd/dist/antd.css';
import desktopLayoutStyle from './desktopLayout.style';

class DesktopLayout extends Component {
  render() {
    return (
      <div style={desktopLayoutStyle.appContainer}>
        <div style={desktopLayoutStyle.headerContainer}>
          <AppHeader />
        </div>
        <div style={desktopLayoutStyle.mainContainer}>
          {<div style={desktopLayoutStyle.menuContainer}>{<AppLSider />}</div>}
          <div style={desktopLayoutStyle.contentContainer}>
            {this.props.app.loading && (
              <div style={desktopLayoutStyle.progressWrapper}>
                <LinearProgress />
              </div>
            )}
            {!this.props.app.loading && <AppContent />}
          </div>
        </div>
        <div style={desktopLayoutStyle.footerContainer}>
          <AppFooter />
        </div>
      </div>
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

export default connect(
  stateToProps,
  dispatchToProps
)(DesktopLayout);
