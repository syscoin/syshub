import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import {
  MAppHeader,
  MAppContent,
} from '../../containers';

//Import Styles

import 'antd-mobile/dist/antd-mobile.css';
import mobileLayoutStyle from './mobileLayout.style';


class MobileLayout extends Component {
  toggleBoolState = d => {
    this.setState({
      [d]: !this.state[d]
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MAppHeader />
        <MAppContent />
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

export default connect(stateToProps, dispatchToProps)(
  injectSheet(mobileLayoutStyle)(MobileLayout)
);
