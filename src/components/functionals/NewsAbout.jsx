import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Avatar } from 'antd';

// import style
import { newsAboutStyle } from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsAbout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid md={12}>
            <Avatar shape="square" size="large" icon="user" className={classes.avatar}/>
            <p className={classes.about}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </Grid>
        </Grid>
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsAboutStyle)(NewsAbout));
