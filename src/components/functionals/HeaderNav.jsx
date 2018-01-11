/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { statusStyle } from './styles';
import actions from '../../redux/actions';
import { fire } from '../../firebase';

class HeaderStats extends Component {
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.currentUser(user);
      }
    });
  }

  render() {
    const { currentUser } = this.props.app;

    return (
      <div style={statusStyle.wraper}>
        {currentUser ? currentUser.displayName || currentUser.email : 'Status'}
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
  return {
    currentUser: user => dispatch(actions.currentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(HeaderStats);
