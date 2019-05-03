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

const FIREBASE_COLLECTION_DBINFO = 'dbinfo';
const FIREBASE_COLLECTION_TWOFA = '2FAAuth';
const FIREBASE_COLLECTION_COMMENTS = 'comments';
const FIREBASE_COLLECTION_C_REPLIES = 'commentReplies_V2';
const FIREBASE_COLLECTION_USERNAME = 'usernames';
const FIREBASE_COLLECTION_USERLIST = 'userlist';

class Firebase {
  constructor() {
    app.initializeApp(config, 'fbSyshub');

    this.firebaseApp = app;
    this.auth = app.auth();
    this.db = app.database();
  }

  /***********
   * Auth API *
   ************/

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

  /****************************
   * General Db helper and API *
   *****************************/

  getDocumentRef = document => this.db.ref(document);

  getDbVersion = async () => {
    const dbVersionRef = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_DBINFO}/version`
    ).once('value');
    const dbVersion = dbVersionRef.val();
    return dbVersion;
  };

  setDbVersion = async newVersion => {
    const dbinfoRef = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_DBINFO}/version`
    );
    dbinfoRef.set(newVersion);
  };

  /********************
   * Users Management *
   ********************/

  isUsernameAvailable = async username => {
    if (username) {
      const userNamesRef = await this.getDocumentRef(
        `${FIREBASE_COLLECTION_USERLIST}/${username}`
      ).once('value');
      const userId = userNamesRef.val();
      return !userId;
    }
    return true;
  };

  addUsername = async (key, username) => {
    const usernameRef = await this.getDocumentRef(FIREBASE_COLLECTION_USERNAME);
    const userlistRef = await this.getDocumentRef(FIREBASE_COLLECTION_USERLIST);
    usernameRef.child(key).set(username);
    userlistRef.child(username).set(key);
  };

  getCurrentUser = async () => await this.auth.currentUser;

  getUsernameById = uid =>
    this.getDocumentRef(`${FIREBASE_COLLECTION_USERNAME}/${uid}`);

  getUsernameList = async () => {
    const usernameRef = await this.getDocumentRef(
      FIREBASE_COLLECTION_USERNAME
    ).once('value');
    const usernameList = usernameRef.val();
    return usernameList;
  };

  /**********************
   * Proposals Comments *
   **********************/

  /**
   *
   * @param {string} pid = proposal ID
   */
  getProposalComments = async (pid, sortAsc) => {
    const commentsRef = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_COMMENTS}/${pid}`
    ).once('value');
    const commentsListObj = await commentsRef.val();
    if (commentsListObj) {
      Object.getOwnPropertyNames(commentsListObj).forEach((key, idx, array) => {
        commentsListObj[key]._id = key;
        commentsListObj[key].showAddReply = false;
      });
    }
    const commentsArray = commentsListObj ? Object.values(commentsListObj) : [];
    if (sortAsc) {
      commentsArray.sort(function(a, b) {
        return a.createdAt - b.createdAt;
      });
    } else {
      commentsArray.sort(function(b, a) {
        return a.createdAt - b.createdAt;
      });
    }
    return commentsArray;
  };

  /**
   *
   * @param {string} pid = proposal ID
   * @param {string} comment = comment Object to be added
   */
  addProposalComments = async (pid, comment) => {
    const commentsRef = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_COMMENTS}/${pid}`
    );
    await commentsRef.push(comment);
  };

  /**
   *
   * @param {string} pid = proposal ID
   * @param {string} cid = comment ID
   * @param {object} item = object with the vote
   */
  setProposalCommentsVote = async (pid, cid, item) => {
    // console.log('ACZ -->', pid, cid, item);
    const commentsRef = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_COMMENTS}/${pid}/${cid}`
    );
    const rawComments = await commentsRef.set(item);
    return rawComments;
  };

  /**
   *
   * @param {string} cid = comment ID
   */
  getProposalCommentsReply = async cid => {
    const rawReplies = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_C_REPLIES}/${cid}`
    ).once('value');
    const repliesListObj = await rawReplies.val();
    return repliesListObj;
  };

  /**
   *
   * @param {string} cid = comment ID
   * @param {string} reply = comment Object to be added
   * @param {string} parentId = parent ID
   */
  addProposalCommentsReply = async (cid, reply, parentId) => {
    const replyRef = await this.getDocumentRef(
      `${FIREBASE_COLLECTION_C_REPLIES}/${cid}/`
    );
    const uniqueID = await replyRef.push(reply).key;
    if (parentId) {
      const parentRef = await this.getDocumentRef(
        `${FIREBASE_COLLECTION_C_REPLIES}/${cid}/${parentId}/child`
      );
      await parentRef.push(uniqueID);
    }
  };

  /***********************
   * Masternodes Manager *
   ***********************/
}

export default Firebase;
