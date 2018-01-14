import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { DesktopLayout } from './components/layouts';

import actions from './redux/actions';
import { fire } from './firebase';

import appStyles from './styles/appStyle';

class App extends Component {
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setCurrentUser(user);
      } else {
        this.props.setCurrentUser(null);
      }
    });
  }
  render() {
    return (
      <div style={appStyles.wraper}>
        <DesktopLayout />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
  };
};

export default connect(stateToProps, dispatchToProps)(App);
