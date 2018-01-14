import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import components
import { Stats, WelcomeBox } from '../functionals';
class UserAccount extends Component {
  render() {
    return (
      <div>
        {' '}
        Set up yourself in the <strong>ACCOUNT SETTINGS</strong> page{' '}
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(UserAccount);
