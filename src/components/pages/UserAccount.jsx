import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userAccountStyle } from './styles'
import { Grid} from 'material-ui';
import UserProfile from '../functionals/UserProfile'
import UserChangePsw from '../functionals/UserChangePsw'
// import components
import { Stats, WelcomeBox } from '../functionals';


class UserAccount extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className='title'>Account Settings</h1>
        <Paper className='paper-container' elevation={4}>
         <UserProfile/>
         <UserChangePsw/>
        </Paper>
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

export default connect(stateToProps, dispatchToProps)(withStyles(userAccountStyle)(UserAccount))
