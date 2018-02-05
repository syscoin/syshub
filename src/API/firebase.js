import Rebase from 're-base';
import * as firebase from 'firebase';
import swal from 'sweetalert';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

firebase.initializeApp(config);

const fire = firebase;

const base = Rebase.createClass(fire.database());
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
const messages = fire.database().ref('messages');
const usernames = fire.database().ref('usernames');
const votes = fire.database().ref('votes');
// const currentUser

//Some useful functions

const checkVoted = (user, proposal) => {
  return new Promise((resolve, reject) => {
    fire
      .database()
      .ref('votes/' + user.uid)
      .child(proposal.Hash)
      .once('value')
      .then(snap => {
        if (snap.val() !== null) {
          //          resolve(true); // Original true if voted false if no
          resolve(false); // Overrided
          return;
        }
        resolve(false);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

const voted = (user, proposal, voteTxt, voteId) => {
  fire
    .database()
    .ref('votes/' + user.uid)
    .child(proposal.Hash)
    .set({ proposalId: proposal.Hash, voteTxt: voteTxt, voteId: voteId });
};

const doRegister = () => {};

const doLogin = (email, password) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      swal({
        title: 'Success',
        text: `Account: ${user.email} logged in.`,
        icon: 'success'
      });
      //this.loginForm.reset();
    })
    .catch(err => {
      swal({
        title: 'Oops...',
        text: `${err}`,
        icon: 'error'
      });
    });
};

const doLogout = update => {
  fire
    .auth()
    .signOut()
    .then(() => {
      if (!update) {
        swal({
          title: 'Success',
          text: `Hope to see you soon`,
          icon: 'success'
        });
      }
    });
};

const doUpdatePassword = (user, callback) => {
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
        doLogout('fromUpdate');
        callback(null, 'success');
      })
      .catch(err => callback(err));
  }
};

const doUpdateProfile = (user, callback) => {
  const currentUser = fire.auth().currentUser;

  if (currentUser) {
    if (user.email) {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'Warning',
        text:
          'You are about to change your email, you must input your password first',
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
        const credentials = fire.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        );

        currentUser
          .reauthenticateWithCredential(credentials)
          .then(() => {
            return currentUser.updateEmail(user.email);
          })
          .then(() => {
            if (user.username) {
              return;
            }
            swal({
              title: 'Success',
              text: 'Account Updated',
              icon: 'success'
            });
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
          callback(null, currentUser);
        })
        .catch(err => callback(err));
    }

    if (user.photoURL) {
      currentUser
        .updateProfile({ photoURL: user.photoURL })
        .then(() => {
          callback(null, currentUser);
        })
        .catch(err => callback(err));
    }
  }
};

const doDeleteAccount = () => {
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
        const credentials = fire.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        );

        return currentUser.reauthenticateWithCredential(credentials);
      })
      .then(() => {
        swal({
          closeOnClickOutside: false,
          closeOnEsc: false,
          title: 'WARNING',
          text:
            'Type "DELETE" to delete your account permantly, this cannot be undone!',
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
                swal({
                  title: 'Success',
                  text: 'Account Deleted',
                  icon: 'success'
                });
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
};

//Check if neccessary
export {
  messages,
  usernames,
  fire,
  base,
  doRegister,
  doLogin,
  doLogout,
  doUpdateProfile,
  doUpdatePassword,
  doDeleteAccount,
  votes,
  checkVoted,
  voted
};
