import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import components
import { Stats, WelcomeBox } from '../functionals';
class Faq extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        {' '}
        Any doubts?, read our <strong>FAQ</strong> page
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

export default connect(stateToProps, dispatchToProps)(Faq);
