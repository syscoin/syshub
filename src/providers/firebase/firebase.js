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

  useDeviceLanguage = () => this.auth.useDeviceLanguage();

  newRecaptchaVerifier = (container, params, app) =>
    new this.firebaseApp.auth.RecaptchaVerifier(container, params, app);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** General Db helper and API ***

  getDocumentRef = document => this.db.ref(document);

  getDbVersion = async () => {
    const dbVersionRef = await this.getDocumentRef('dbinfo/version').once(
      'value'
    );
    const dbVersion = dbVersionRef.val();
    return dbVersion;
  };

  setDbVersion = async newVersion => {
    const dbinfoRef = await this.getDocumentRef('dbinfo/version');
    dbinfoRef.set(newVersion);
  };

  isUsernameAvailable = async username => {
    if (username) {
      const userNamesRef = await this.getDocumentRef(
        `userlist/${username}`
      ).once('value');
      const userId = userNamesRef.val();
      return !userId;
    }
    return true;
  };

  addUsername = async (key, username) => {
    const usernameRef = await this.getDocumentRef('usernames');
    const userlistRef = await this.getDocumentRef('userlist');
    usernameRef.child(key).set(username);
    userlistRef.child(username).set(key);
  };

  getCurrentUser = async () => await this.auth.currentUser;

  getUsernameById = uid => this.getDocumentRef(`usernames/${uid}`);

  getUsernameList = async () => {
    const usernameRef = await this.getDocumentRef('usernames').once('value');
    const usernameList = usernameRef.val();
    return usernameList;
  };
}

export default Firebase;
