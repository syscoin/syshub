/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import actions from '../../../redux/actions';
import { connect } from 'react-redux';

//Import Styles
import siderLogoStyle from './siderLogo.style';

class SiderLogo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <a onClick={() => this.props.setPage('home')}>
            <img alt="a" src={require('../../../assets/img/png_menu_logo.png')} width="100%" />
          </a>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default connect(stateToProps, dispatchToProps)(injectSheet(siderLogoStyle)(SiderLogo));
