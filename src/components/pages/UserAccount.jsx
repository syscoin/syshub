import React, { Component } from 'react';

import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { Grid } from 'material-ui';
import swal from 'sweetalert';

import actions from '../../redux/actions';
import {
  fire,
  usernames,
  doLogout,
  doUpdateProfile,
  doUpdatePassword,
  doDeleteAccount,
} from '../../firebase';
import { userAccountStyle } from './styles';
// import components
import { Stats, WelcomeBox } from '../functionals';
import UserProfile from '../functionals/UserProfile';
import UserChangePsw from '../functionals/UserChangePsw';
import UserDelete from '../functionals/UserDelete';
import UserTwoFactor from '../functionals/UserTwoFactor';

class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  updateProfile(user) {
    doUpdateProfile(user, (err, data) => {
      if (!err) {
        swal({
          title: 'Success',
          text: 'Account Updated',
          icon: 'success',
        });
        this.props.setCurrentUser(data);
      } else {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      }
    });
  }

  updatePassword(user) {
    doUpdatePassword(user, (err, data) => {
      if (!err) {
        swal({ title: 'Success', text: 'Account Updated', icon: 'success' });
        this.props.setPage('login');
      } else {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      }
    });
  }

  deleteProfile() {
    this.props.setPage('home');
    doDeleteAccount();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className="title">ACCOUNTS SETTINGS</h1>
        <Paper className="paper-container" elevation={4}>
          <UserProfile onUpdateProfile={this.updateProfile} />
          <UserChangePsw onUpdatePassword={this.updatePassword} />
          <UserTwoFactor />
          <UserDelete onDeleteProfile={this.deleteProfile} />
        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    setPage: page => dispatch(actions.setPage(page)),
  };
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userAccountStyle)(UserAccount)
);
