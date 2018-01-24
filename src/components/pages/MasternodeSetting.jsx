import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import components
import { Stats, WelcomeBox } from '../functionals';
class MasterNode extends Component {
  render() {
    return (
      <div>
        {' '}
        With our <strong>MASTERNODE SETTING</strong> page, all is under control
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

export default connect(stateToProps, dispatchToProps)(MasterNode);
