import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewProposal extends Component {
  render() {
    return (
      <div>
        {' '}
        You will <strong>CREATE PROPOSAL</strong> here{' '}
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

export default connect(stateToProps, dispatchToProps)(NewProposal);
