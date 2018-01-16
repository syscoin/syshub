import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import { UpdateUserAccountTest, UpdateUserPasswordTest } from '../pages';
import actions from '../../redux/actions/appActions';

class UserAccountTest extends Component {
  constructor(props) {
    super(props);

    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateProfile(user) {
    const currentUser = fire.auth().currentUser;

    if (currentUser) {
      if (user.email) {
        swal({
          closeOnClickOutside: false,
          closeOnEsc: false,
          title: 'Warning',
          text: 'You are about to change your email, you must input your password first',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
          content: {
            element: 'input',
            attributes: {
              placeholder: 'Type your password',
              type: 'password'
            }
          }
        }).then(password => {
          const credentials = fire.auth.EmailAuthProvider.credential(currentUser.email, password);

          currentUser
            .reauthenticateWithCredential(credentials)
            .then(() => {
              return currentUser.updateEmail(user.email);
            })
            .then(() => {
              if (user.username) {
                return;
              }
              swal({ title: 'Success', text: 'Account Updated', icon: 'success' });
            })
            .catch(err => {
              swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
            });
        });
      }

      if (user.username) {
        currentUser
          .updateProfile({ displayName: user.username })
          .then(() => {
            swal({ title: 'Success', text: 'Account Updated', icon: 'success' });
            this.props.setCurrentUser(currentUser);
          })
          .catch(err => {
            swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
          });
      }
    }
  }

  updatePassword(user) {
    const currentUser = fire.auth().currentUser;

    if (currentUser) {
      const credentials = fire.auth.EmailAuthProvider.credential(
        currentUser.email,
        user.currentPass
      );
      currentUser
        .reauthenticateWithCredential(credentials)
        .then(() => {
          return currentUser.updatePassword(user.newPass);
        })
        .then(() => {
          swal({ title: 'Success', text: 'Account Updated', icon: 'success' });
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  render() {
    return (
      <div>
        <h2>User Profile</h2>
        <UpdateUserAccountTest onUpdateProfile={this.updateProfile} />
        <UpdateUserPasswordTest onUpdatePassword={this.updatePassword} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(UserAccountTest);
