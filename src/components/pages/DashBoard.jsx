import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import components
import { Stats, WelcomeBox } from '../functionals';
class DashBoard extends Component {
  render() {
    return (
      <div>
        {' '}
        You can see the <strong>PROPOSAL DASHBOARD</strong> page{' '}
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

export default connect(stateToProps, dispatchToProps)(DashBoard);
