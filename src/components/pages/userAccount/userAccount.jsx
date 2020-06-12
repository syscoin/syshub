import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import to from '../../../Helpers/to';
import aes from 'aes256'

//Import providers HOC's
import { withFirebase } from '../../../providers/firebase';

import Paper from '@material-ui/core/Paper';
import injectSheet from 'react-jss';
import swal from 'sweetalert';

import actions from '../../../redux/actions';

import UserProfile from '../../functionals/userProfile/userProfile';
import UserChangePsw from '../../functionals/userChangePsw/userChangePsw';
import UserDelete from '../../functionals/userDelete/userDelete';
import UserTwoFactor from '../../functionals/userTwoFactor/userTwoFactor';

// Import styles
import userAccountStyle from './userAccount.style';

class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  async updateProfile(user) {
    const [err, { currentUser, error, message }] = await to(
      this.firebase.doUpdateProfile(user)
    );
    if (error || err) {
      swal({ title: 'Oops...', text: `${message}`, icon: 'error' });
      return;
    }
    swal({
      title: 'Success',
      text: 'Account updated.',
      icon: 'success'
    });
    this.props.setCurrentUser(currentUser);
  }

  async updatePassword(user) {
    const newUser = await this.firebase.getCurrentUser();
    const userData = await this.firebase.getUserData(newUser.uid);

    // Re-encrypt encryption key with new password
    const cipher = await this.firebase.getCipher();

    const encryptionKey = cipher.decrypt(userData.encryptionKey);
    const reEncryptedKey = aes.encrypt(user.newPass, encryptionKey);

    await this.firebase.doUpdateProfile({ encryptionKey: reEncryptedKey });

    this.firebase.doPasswordUpdate(user, async (err, data) => {
      if (!err) {
        swal({ title: 'Success', text: 'Account Updated', icon: 'success' });

        this.props.doAppLogout();
        this.props.setPage('login');
      } else {
        await this.firebase.doUpdateProfile({ encryptionKey: userData.encryptionKey });
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      }
    });
  }

  async deleteProfile() {
    const deleted = await this.firebase.doDeleteAccount();
    if (deleted) {
      this.props.doAppLogout();
      this.props.setPage('home');
    }
  }

  render() {
    const { classes, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        <h1 className="title">ACCOUNTS SETTINGS</h1>
        <Paper className="paper-container" elevation={4}>
          <UserProfile
            deviceType={this.props.deviceType}
            onUpdateProfile={this.updateProfile}
          />
          <UserChangePsw
            deviceType={this.props.deviceType}
            onUpdatePassword={this.updatePassword}
          />
          <UserTwoFactor deviceType={this.props.deviceType} />
          <UserDelete
            deviceType={this.props.deviceType}
            onDeleteProfile={this.deleteProfile}
          />
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
    doAppLogout: () => dispatch(actions.doLogout()),
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(userAccountStyle)
)(UserAccount);
