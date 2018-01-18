import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import {newsFooterStyle} from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsFooter extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        {' '}
        Do you want to read some <strong>NEWS LIST</strong>?{' '}
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsFooterStyle)(NewsFooter));
