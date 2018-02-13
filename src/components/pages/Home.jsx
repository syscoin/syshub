import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import components
import { Stats, WelcomeBox } from '../functionals';

class Home extends Component {
  render() {
    return (
      <div>
        <WelcomeBox
          onJoin={() => this.props.setPage('register')}
          logged={this.props.logged}
          deviceType={this.props.deviceType}
        />
        <Stats deviceType={this.props.deviceType} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    logged: state.app.currentUser ? true : false
  };
};

const dispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default connect(stateToProps, dispatchToProps)(Home);
