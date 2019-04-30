import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config, 'fbSyshub');

    this.firebaseApp = app;
    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  newRecaptchaVerifier = (container, params, app) =>
    new this.firebaseApp.auth.RecaptchaVerifier(container, params, app);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  /*  isUsernameAvailable = async username => {
    const userNamesRef = await this.db.ref('usernames').once('value');
    const userNames = userNamesRef.val();
    return Object.values(userNames).includes(username) === true;
  }; */

  isUsernameAvailable = async username => {
    if (username) {
      const userNamesRef = await this.db
        .ref(`userlist/${username}`)
        .once('value');
      const userId = userNamesRef.val();
      return !userId;
    }
    return true;
  };

  addUsername = async (key, username) => {
    const usernameRef = await this.db.ref('usernames');
    const userlistRef = await this.db.ref('userlist');
    usernameRef.child(key).set(username);
    userlistRef.child(username).set(key);
  };

  getCurrentUser = async () => await this.auth.currentUser;

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Database API ***

  getDocumentRef = document => this.db.ref(document);
}

export default Firebase;
