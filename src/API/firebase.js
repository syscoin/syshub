/* eslint-disable */
import Rebase from 're-base';
import firebase from 'firebase';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';

import { removeFire2FA, getFire2FAstatus, setFire2FAMethod } from './twoFAFirebase.service';

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

const baseOLD = Rebase.createClass(fire.database());
// const messages = fire.database().ref('messages');
const usernames = fire.database().ref('usernames');
const comments = fire.database().ref('comments');
const commentReplies_V2 = fire.database().ref('commentReplies_V2');
// const votes = fire.database().ref('votes');

//Some useful functions
const checkVoted = (user, proposal, masternodes) => {
  return new Promise(resolve => {
    fire
      .database()
      .ref('votes/' + user.uid)
      .child(proposal.Hash)
      .once('value')
      .then(snap => {
        if (snap.val() !== null) {
          let hasVoted = null;
          masternodes.map(mn => {
            if (snap.val().mnKeyIds.includes(mn.keyId) === false) {
              hasVoted = false;
            }
          });
          if (hasVoted === false) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
        resolve(false);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

const voted = (user, proposal, voteTxt, voteId, mnKeyIds) => {
  fire
    .database()
    .ref('votes/' + user.uid)
    .child(proposal.Hash)
    .set({
      proposalId: proposal.Hash,
      voteTxt: voteTxt,
      voteId: voteId,
      mnKeyIds: mnKeyIds
    });
};


const doRegister = () => {};

const doLogin = (email, password) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {})
    .catch(err => {});
};

const doLogout = update => {
  fire
    .auth()
    .signOut()
    .then(() => {
      if (!update) {}
    });
};

const doUpdatePassword = (user, callback) => {
  const currentUser = fire.auth().currentUser;

  if (currentUser) {
    const credentials = fire.auth.EmailAuthProvider.credential(currentUser.email, user.currentPass);
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

const doUpdateProfile = user => {
  const currentUser = fire.auth().currentUser;
  const oldUsername = currentUser.displayName;
  const oldEmail = currentUser.email;

  return new Promise((resolve, reject) => {
    if (currentUser) {
      if (user.username) {
        usernames.update({
          [currentUser.uid]: user.username
        });
        currentUser
          .updateProfile({
            displayName: user.username
          })
          .then(() => {
            messages.on('value', snap => {
              snap.forEach(message => {
                if (message.val().user.displayName === oldUsername) {
                  const updated = {
                    body: message.val().body,
                    key: message.val().key,
                    user: {
                      displayName: currentUser.displayName,
                      email: message.val().user.email,
                      id: message.val().user.id
                    }
                  };

                  fire
                    .database()
                    .ref('messages/' + message.val().key)
                    .update(updated);
                }
              });
            });
            if (user.photoURL || user.email) {
              return;
            }
            resolve(currentUser);
          })
          .catch(err => resolve(err));
      }

      if (user.photoURL) {
        currentUser
          .updateProfile({
            photoURL: user.photoURL
          })
          .then(() => {
            if (user.email) {
              return;
            }
            resolve(currentUser);
          })
          .catch(err => reject(err));
      }

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
          })
          .then(password => {
            const credentials = fire.auth.EmailAuthProvider.credential(currentUser.email, password);

            return currentUser.reauthenticateWithCredential(credentials);
          })
          .then(() => {
            return currentUser.updateEmail(user.email);
          })
          .then(() => {
            messages.on('value', snap => {
              snap.forEach(message => {
                if (message.val().user.email === oldEmail) {
                  const updated = {
                    body: message.val().body,
                    key: message.val().key,
                    user: {
                      displayName: message.val().user.displayName,
                      email: currentUser.email,
                      id: message.val().user.id
                    }
                  };

                  fire
                    .database()
                    .ref('messages/' + message.val().key)
                    .update(updated);
                }
              });
            });
            resolve(currentUser);
          })
          .catch(err => {
            reject(err);
          });
      }
    }
  });
};

const doDeleteAccount = async () => {
  const currentUser = await fire.auth().currentUser;
  let deleted = false;

  if (currentUser) {
    const password = await swal({
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

    if (!password) {return deleted;}

    const credentials = await fire.auth.EmailAuthProvider.credential(currentUser.email, password);
    const confirmed = await currentUser.reauthenticateWithCredential(credentials).then(() => true).catch(err => false);
    
    if (!confirmed) {
      swal({
        title: 'Oops...',
        text: 'Make sure to type the correct password',
        icon: 'error'
      });
      return deleted;
    }

    const value = await swal2({
      allowOutsideClick: false,
      allowEscapeKey: false,
      title: 'WARNING',
      html: 'Type "DELETE" to delete your account permantly, this cannot be undone! <span style="color: red;">YOUR DATA WILL BE DELETED AND CAN NOT BE RECOVERED, ENSURE YOUR MN KEYs AND VINs ARE BACKED UP!!</span>',
      type: 'warning',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger'
    });
    

    if (value.value === 'DELETE') {
      await fire.database().ref('comments').once('value', snapshot => {
        snapshot.forEach(snap => {
          snap.forEach(comment => {
            if (comment.val().createdBy.name === currentUser.displayName) {
              let newComment = { ...comment.val() };
              newComment.createdBy.name = `${currentUser.displayName}-deleted`;
              comment.ref.update(newComment);
            }
          });
        });
      });

      await fire.database().ref('messages').once('value', snapshot => {
        snapshot.forEach(snap => {
          if (snap.val().user.id === currentUser.uid) {
            let newMessage = { ...snap.val()
            };
            newMessage.user.displayName = `${currentUser.displayName}-deleted`;
            snap.ref.update(newMessage);
          }
        });
      });
      await fire.database().ref(`usernames/${currentUser.uid}`).set(`${currentUser.displayName}-deleted`);
      removeFire2FA(currentUser.uid);
      await fire.database().ref(`proposals/${currentUser.uid}`).remove();
      await fire.database().ref(`MasterNodes/${currentUser.uid}`).remove();
      const iamDeleted = await currentUser.delete().then(() => true).catch(err => err);
      if (iamDeleted) {
        swal({
          title: 'Success',
          text: 'Account Deleted',
          icon: 'success'
        });
        fire.auth().signOut();
        deleted = true;
      } else {
        swal({
          title: 'Oops...',
          text: `${iamDeleted}`,
          icon: 'error'
        });
      }
    }
    
    if (value.dismiss) {return deleted;}

    if (value.value !== 'DELETE') {
      swal({
        title: 'Oops...',
        text: 'Make sure to type "DELETE", with all caps',
        icon: 'error'
      });
      deleted = false;
    }
  }
  return deleted;
};

const getCurrentUser = () => {
  return fire.auth().currentUser;
}

// refactor this method to run properly
const addAuthenticator = (user, provider, phoneNumber, appVerifier) => {
  return new Promise((resolve, reject) => {
    provider
      .verifyPhoneNumber(phoneNumber, appVerifier)
      .then(verificationId => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Verify',
            text: 'Please enter the verification code sent to your mobile device',
            icon: 'info',
            buttons: true,
            dangerMode: false,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Confirmation code here',
                type: 'text'
              }
            }
          })
          .then(verificationCode => {
            if (!verificationCode) {
              throw new Error('Please provide your verificatoin code next time.');
            }
            return fire.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
          })
          .then(phoneCredential => {
            return user.updatePhoneNumber(phoneCredential);
          })
          .then(() => {
            fire.database().ref(`2FA/${user.uid}`).set(true, () => // <-- ACZ Delete: after create the correct method
              fire.database().ref(`2FAAuth/${user.uid}`).set(true, () =>
                resolve(true)
            ));
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};


//Check if neccessary
export {
  fire, // si
  messages, // si
  comments, // si
  commentReplies_V2, // si
  doLogout, // si
  doUpdateProfile, // si
  doUpdatePassword, // si
  doDeleteAccount, // si
  checkVoted, // si
  voted, // si
  getCurrentUser // si
};