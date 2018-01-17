import React, { Component } from 'react';

import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { Grid } from 'material-ui';
import swal from 'sweetalert';

import actions from '../../redux/actions';
import { fire, usernames } from '../../firebase';
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
        usernames.update({ [currentUser.uid]: user.username });
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
          swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
        });
    }
  }

  deleteProfile() {
    const currentUser = fire.auth().currentUser;

    if (currentUser) {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'Authentication Required',
        text: 'Please provide your password',
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
      })
        .then(password => {
          const credentials = fire.auth.EmailAuthProvider.credential(currentUser.email, password);

          return currentUser.reauthenticateWithCredential(credentials);
        })
        .then(() => {
          swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'WARNING',
            text: 'Type "DELETE" to delete your account permantly, this cannot be undone!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Type "DELETE"',
                type: 'text'
              }
            }
          }).then(value => {
            if (value === 'DELETE') {
              currentUser
                .delete()
                .then(() => {
                  swal({ title: 'Success', text: 'Account Deleted', icon: 'success' });
                })
                .catch(err => {
                  swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
                });

              return;
            }

            if (value !== 'DELETE') {
              swal({
                title: 'Oops...',
                text: 'Make sure to type "DELETE" with all caps',
                icon: 'error'
              });
            }
          });
        })
        .catch(err => {
          swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className="title">Account Settings</h1>
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
    setCurrentUser: user => dispatch(actions.setCurrentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(userAccountStyle)(UserAccount));
