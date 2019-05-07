import app from 'firebase/app';
import 'firebase/auth';
import Cryptr from 'cryptr';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

const FIREBASE_COLLECTION_DBINFO = 'dbinfo';
//const FIREBASE_COLLECTION_TWOFA = '2FAAuth';
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

  getRawDocument = document => this.getDocumentRef(document).once('value');

  getDocument = async document => {
    const rawDocument = await this.getRawDocument(document);
    return rawDocument.val();
  };

  getDbVersion = async () => {
    const dbVersion = await this.getDocument(
      `${FIREBASE_COLLECTION_DBINFO}/version`
    );
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
      const userId = await this.getDocument(
        `${FIREBASE_COLLECTION_USERLIST}/${username}`
      );
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

  getUsernameList = async () =>
    await this.getDocument(FIREBASE_COLLECTION_USERNAME);

  /**********************
   * Proposals Comments *
   **********************/

  /**
   *
   * @param {string} pid = proposal ID
   */
  getProposalComments = async (pid, sortAsc) => {
    const comments = await this.getDocument(
      `${FIREBASE_COLLECTION_COMMENTS}/${pid}`
    );
    if (comments) {
      Object.getOwnPropertyNames(comments).forEach((key, idx, array) => {
        comments[key]._id = key;
        comments[key].showAddReply = false;
      });
    }
    const commentsArray = comments ? Object.values(comments) : [];
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
  getProposalCommentsReply = async cid =>
    await this.getDocument(`${FIREBASE_COLLECTION_C_REPLIES}/${cid}`);

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

  getMasternodesTotal = async uid => {};

  getMasternodeList = async uid => {
    const masternodesListObj = await this.getDocument(`MasterNodes/${uid}`);
    const mnList = masternodesListObj ? Object.values(masternodesListObj) : [];
    return mnList;
  };

  deleteMasternode = async (masternode, uid) => {
    const masternodesRef = await this.getDocumentRef(`MasterNodes/${uid}`);
    const selectMasternode = await masternodesRef.child(masternode.keyId);
    selectMasternode.remove();
  };

  addMasternode = async (masternode, uid) => {
    const cryptr = new Cryptr(uid);
    const newKey = this.db.ref().push().key;
    masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
    masternode.txid = cryptr.encrypt(masternode.txid);
    masternode.keyId = newKey;
    masternode.key = newKey;
    const newMasternodeRef = this.getDocumentRef(`MasterNodes/${uid}`);
    const newMasternodeChild = newMasternodeRef.child(masternode.keyId);
    newMasternodeChild.set(masternode);
  };

  updateMasternode = async (masternode, uid) => {
    const cryptr = new Cryptr(uid);
    masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
    masternode.txid = cryptr.encrypt(masternode.txid);
    const masternodeRef = this.getDocumentRef(`MasterNodes/${uid}`);
    const selectedMasternode = await masternodeRef.child(masternode.keyId);
    selectedMasternode.update(masternode);
  };

  checkMasternodeExists = async (mnPrivateKey, uid) => {
    const cryptr = new Cryptr(uid);
    const encryptedPrivateKey = cryptr.encrypt(mnPrivateKey);
    const mnList = await this.getMasternodeList(uid);
    const foundedMn = mnList.find(
      item => item.mnPrivateKey === encryptedPrivateKey
    );
    return !!foundedMn;
  };
}

export default Firebase;
