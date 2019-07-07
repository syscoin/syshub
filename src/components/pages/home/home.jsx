import React, { Component } from 'react';
import injectSheet from 'react-jss';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';

// import components
import { Stats } from '../../functionals';
// import { WelcomeBox } from '../functionals';

// import style
import homeStyle from './home.style';

class Home extends Component {
  state = {};

  render() {
    const { classes, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        <div className="wrapper">
          {/* <WelcomeBox
          onJoin={() => this.props.setPage('register')}
          logged={this.props.logged}
          deviceType={this.props.deviceType}
        />  */}
          <Stats deviceType={this.props.deviceType} />
        </div>
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

export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(homeStyle)(Home));
