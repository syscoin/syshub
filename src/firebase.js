import Rebase from 're-base';
import firebase from 'firebase';
import swal from 'sweetalert';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

const fire = firebase.initializeApp(config);
const base = Rebase.createClass(fire.database());
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
const messages = firebase.database().ref('messages');
// const currentUser

//Some useful functions

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

const doLogout = () => {
  fire
    .auth()
    .signOut()
    .then(() => {
      swal({
        title: 'Success',
        text: `Hope to see you soon`,
        icon: 'success'
      });
    });
};

export { fire, base, messages, doRegister, doLogin, doLogout };
