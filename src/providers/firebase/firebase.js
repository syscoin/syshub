import firebase from 'firebase';
import Cryptr from 'cryptr';
import to from '../../Helpers/to';

// to be removed it is not good mix UI in the provider
import swal from 'sweetalert';
import swal2 from 'sweetalert2';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

const FB_COLLECTION_DBINFO = 'dbinfo';
const FB_COLLECTION_COMMENTS = 'comments';
const FB_COLLECTION_C_REPLIES = 'commentReplies_V2';
const FB_COLLECTION_USERSINFO = 'usersInfo';
const FB_COLLECTION_USERLIST = 'usersList';
const FB_COLLECTION_PROPOSALS = 'proposals';
const FB_COLLECTION_P_DESCRIPTIONS = 'proposalsDescriptions';
const FB_COLLECTION_MASTERNODES = 'MasterNodes';
const FB_STORAGE_AVATARS = 'avatars';

class Firebase {
  constructor() {
    /* firebase.initializeApp(config, 'fbSyshub'); */
    firebase.initializeApp(config);

    console.log('ACZ Node Env -->', process.env.NODE_ENV);
    console.log('ACZ Firebase apiKey-->', config.apiKey);

    this.firebaseApp = firebase;
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.storage = firebase.storage();
  }

  /***********
   * Auth API *
   ************/

  useDeviceLanguage = () => this.auth.useDeviceLanguage();

  newRecaptchaVerifier = (container, params, app) =>
    new this.firebaseApp.auth.RecaptchaVerifier(container, params, app);

  newPhoneAuthProvider = () => new this.firebaseApp.auth.PhoneAuthProvider();

  getPhoneAuthProviderID = () =>
    this.firebaseApp.auth.PhoneAuthProvider.PROVIDER_ID;

  sendSMSToPhone = async (phoneNumber, appVerifier) => {
    const provider = this.newPhoneAuthProvider();
    const verificationId = await provider.verifyPhoneNumber(
      phoneNumber,
      appVerifier
    );
    return verificationId;
  };

  loginWithPhone = async (phoneNumber, appVerifier) => {
    const confirmationResult = await this.auth.signInWithPhoneNumber(
      `${phoneNumber}`,
      appVerifier
    );
    return confirmationResult;
  };

  verifyPhoneCode = async (verificationId, smsCode) => {
    const phoneCredential = await this.firebaseApp.auth.PhoneAuthProvider.credential(
      verificationId,
      smsCode
    );
    return phoneCredential;
  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = async update => {
    this.auth.signOut();
    if (update) {
    }
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doPasswordUpdate = async (user, callback) => {
    const currentUser = await this.getCurrentUser();

    if (currentUser) {
      const credentials = this.firebaseApp.auth.EmailAuthProvider.credential(
        currentUser.email,
        user.currentPass
      );
      currentUser
        .reauthenticateWithCredential(credentials)
        .then(() => {
          return currentUser.updatePassword(user.newPass);
        })
        .then(() => {
          this.doSignOut('fromUpdate');
          callback(null, 'success');
        })
        .catch(err => callback(err));
    }
  };

  storageAvatar = async (fileName, file) =>
    this.storage.ref(`/${FB_STORAGE_AVATARS}/${fileName}`).put(file);

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
    const dbVersion = await this.getDocument(`${FB_COLLECTION_DBINFO}/version`);
    return dbVersion;
  };

  setDbVersion = async newVersion => {
    const dbinfoRef = await this.getDocumentRef(
      `${FB_COLLECTION_DBINFO}/version`
    );
    dbinfoRef.set(newVersion);
  };

  getDBnUsers = async () => {
    const dbnUsers = await this.getDocument(`${FB_COLLECTION_DBINFO}/nUsers`);
    return dbnUsers;
  };

  addOneDBnUsers = async () => {
    const nUser = parseFloat(await this.getDBnUsers());
    const dbnUsersRef = await this.getDocumentRef(
      `${FB_COLLECTION_DBINFO}/nUsers`
    );
    dbnUsersRef.set(nUser + 1);
  };

  rmvOneDBnUsers = async () => {
    const nUser = parseFloat(await this.getDBnUsers());
    const dbnUsersRef = await this.getDocumentRef(
      `${FB_COLLECTION_DBINFO}/nUsers`
    );
    dbnUsersRef.set(nUser - 1);
  };

  getDBnMnodes = async () => {
    const dbnMnodes = await this.getDocument(`${FB_COLLECTION_DBINFO}/nMnodes`);
    return dbnMnodes;
  };

  addOneDBnMnodes = async () => {
    const nMnodes = parseFloat(await this.getDBnMnodes());
    const dbnMnodesRef = await this.getDocumentRef(
      `${FB_COLLECTION_DBINFO}/nMnodes`
    );
    dbnMnodesRef.set(nMnodes + 1);
  };

  rmvOneDBnMnodes = async () => {
    const nMnodes = parseFloat(await this.getDBnMnodes());
    const dbnMnodesRef = await this.getDocumentRef(
      `${FB_COLLECTION_DBINFO}/nMnodes`
    );
    dbnMnodesRef.set(nMnodes - 1);
  };

  /********************
   * Users Management *
   ********************/

  isUsernameAvailable = async username => {
    if (username) {
      const userId = await this.getDocument(
        `${FB_COLLECTION_USERLIST}/${username}`
      );
      return !userId;
    }
    return true;
  };

  addUsername = async (key, username) => {
    const usernameRef = await this.getDocumentRef(FB_COLLECTION_USERSINFO);
    const userListRef = await this.getDocumentRef(FB_COLLECTION_USERLIST);
    usernameRef
      .child(key)
      .child('name')
      .set(username);
    userListRef.child(username).set(key);
    await this.addOneDBnUsers();
  };

  getCurrentUser = async () => await this.auth.currentUser;

  getUsernameById = uid =>
    this.getDocumentRef(`${FB_COLLECTION_USERSINFO}/${uid}`);

  getUsernameList = async () => await this.getDocument(FB_COLLECTION_USERSINFO);

  doLogout = async update => {
    await this.doSignOut();
    if (update) {
    }
  };

  doDeleteAccount = async () => {
    const currentUser = await this.getCurrentUser();
    let deleted = false;

    if (!currentUser) {
      return deleted;
    }

    const password = await swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      title: 'Authentication Required',
      text: 'Please provide your password (or dead)',
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
    });

    if (!password) {
      return deleted;
    }

    const credentials = await this.firebaseApp.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    const confirmed = await currentUser
      .reauthenticateWithCredential(credentials)
      .then(() => true)
      .catch(err => false);

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
      html:
        'Type "DELETE" to delete your account permantly, this cannot be undone! <span style="color: red;">YOUR DATA WILL BE DELETED AND CAN NOT BE RECOVERED, ENSURE YOUR MN KEYs AND VINs ARE BACKED UP!!</span>',
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

    if (value.dismiss) {
      return deleted;
    }

    if (value.value !== 'DELETE') {
      swal({
        title: 'Oops...',
        text: 'Make sure to type "DELETE", with all caps',
        icon: 'error'
      });
      return deleted;
    }

    if (value.value === 'DELETE') {
      //* add "-deleted" to comment author *
      /*  const rawComments = await this.getRawDocument('comments');
            rawComments.forEach(snap => {
              snap.forEach(comment => {
                if (comment.val().createdBy.uid === currentUser.uid) {
                  let newComment = { ...comment.val() };
                  newComment.createdBy.name = `${currentUser.displayName}-deleted`;
                  comment.ref.update(newComment);
                }
              });
            }); */

      //* Add "-deleted" to the username list *

      const usernameRef = await this.getDocumentRef(FB_COLLECTION_USERSINFO);
      const userlistRef = await this.getDocumentRef(FB_COLLECTION_USERLIST);

      // try to figure out why '-deleted' if no reason remove the alias from the DB
      usernameRef.child(currentUser.uid).remove();
      /* .child('name')
        .set(`${currentUser.displayName}-deleted`); */
      userlistRef.child(currentUser.displayName).remove();
      /* userlistRef
        .child(`${currentUser.displayName}-deleted`)
        .set(currentUser.uid); */

      this.removeFire2FA(currentUser.uid);

      const proposalsRef = await this.getDocumentRef(FB_COLLECTION_PROPOSALS);
      proposalsRef.child(currentUser.uid).remove();

      const masternodesRef = await this.getDocumentRef(
        FB_COLLECTION_MASTERNODES
      );
      masternodesRef.child(currentUser.uid).remove();

      await this.rmvOneDBnUsers();
      const [err, iamDeleted] = await to(currentUser.delete());
      if (!err) {
        swal({
          title: 'Success',
          text: 'Account Deleted',
          icon: 'success'
        });
        this.doSignOut();
        deleted = true;
        return deleted;
      } else {
        swal({
          title: 'Oops...',
          text: `${iamDeleted}`,
          icon: 'error'
        });
        return deleted;
      }
    }
  };

  doUpdateProfile = async user => {
    const currentUser = await this.getCurrentUser();
    const uid = currentUser.uid;
    let resultError = false;
    let resultMessage = [];

    if (!currentUser) {
      return ['Must be logged'];
    }

    if (user.username) {
      const usernameRef = await this.getDocumentRef(FB_COLLECTION_USERSINFO);
      const userlistRef = await this.getDocumentRef(FB_COLLECTION_USERLIST);
      const oldUsername = currentUser.displayName;
      currentUser.updateProfile({ displayName: user.username });
      usernameRef
        .child(uid)
        .child('name')
        .set(`${user.username}`);
      userlistRef.child(oldUsername).remove();
      userlistRef.child(`${user.username}`).set(uid);
      resultMessage.push('Username Updated');
    }

    if (user.photoURL) {
      currentUser.updateProfile({ photoURL: user.photoURL });
      resultMessage.push('Avatar Updated');
    }

    if (user.email) {
      const password = await swal({
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
      });
      if (password) {
        const credentials = this.firebaseApp.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        currentUser
          .reauthenticateWithCredential(credentials)
          .then(() => {
            currentUser.updateEmail(user.email);
            resultMessage.push('Email Updated');
          })
          .catch(err => {
            resultError = true;
            resultMessage.push('Fail email update');
          });
      }
    }
    return { currentUser, error: resultError, message: resultMessage };
  };

  /*************
   * Proposals *
   *************/

  getProposal = async uid => {
    const proposal = await this.getDocument(
      `${FB_COLLECTION_PROPOSALS}/${uid}`
    );
    return proposal;
  };

  setProposal = async (uid, payload) => {
    const proposalRef = await this.getDocumentRef(FB_COLLECTION_PROPOSALS);
    proposalRef.child(uid).set(payload);
  };

  /**
   *
   * @param {string} descriptionID = the ID used to store in DB,
   * you can find it in the proposal gObject from syscoin
   */
  getProposalDescription = async descriptionID => {
    const proposalDescription = await this.getDocument(
      `${FB_COLLECTION_P_DESCRIPTIONS}/${descriptionID}`
    );
    return proposalDescription;
  };

  /****
   * @param {string} pdid = Proposal Description ID
   * @param {string} payload = the data to be storage
   */
  setProposalDescription = async (pdid, payload) => {
    const descriptionRef = await this.getDocumentRef(
      FB_COLLECTION_P_DESCRIPTIONS
    );
    descriptionRef.child(pdid).set(payload);
  };

  /**
   *
   * @param {uid} User ID
   * @return the proposal object plus the description atached
   */
  recoverPendingProposal = async uid => {
    const recoveredProposal = await this.getProposal(uid);
    if (!recoveredProposal) {
      return false;
    }
    const descID = recoveredProposal.descriptionID;
    const recoveredDescription = await this.getProposalDescription(descID);
    recoveredProposal.descriptionRef = recoveredDescription;
    return recoveredProposal;
  };

  deletePendingProposal = async uid => {
    const descriptionID = await this.getDocument(
      `${FB_COLLECTION_PROPOSALS}/${uid}/descriptionID`
    );
    if (descriptionID) {
      const descriptionHash = await this.getDocument(
        `${FB_COLLECTION_P_DESCRIPTIONS}/${descriptionID}/hash`
      );
      if (!descriptionHash) {
        const proposalRef = await this.getDocumentRef(
          `${FB_COLLECTION_PROPOSALS}/${uid}`
        );
        const proposalDescriptionRef = await this.getDocumentRef(
          `${FB_COLLECTION_P_DESCRIPTIONS}/${descriptionID}`
        );
        proposalRef.remove();
        proposalDescriptionRef.remove();
      }
    }
  };

  /**
   *
   * @param {string} pid = proposal ID
   */
  getProposalComments = async (pid, sortAsc) => {
    const comments = await this.getDocument(`${FB_COLLECTION_COMMENTS}/${pid}`);
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
      `${FB_COLLECTION_COMMENTS}/${pid}`
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
      `${FB_COLLECTION_COMMENTS}/${pid}/${cid}`
    );
    const rawComments = await commentsRef.set(item);
    return rawComments;
  };

  /**
   *
   * @param {string} cid = comment ID
   */
  getProposalCommentsReply = async cid =>
    await this.getDocument(`${FB_COLLECTION_C_REPLIES}/${cid}`);

  /**
   *
   * @param {string} cid = comment ID
   * @param {string} reply = comment Object to be added
   * @param {string} parentId = parent ID
   */
  addProposalCommentsReply = async (cid, reply, parentId) => {
    const replyRef = await this.getDocumentRef(
      `${FB_COLLECTION_C_REPLIES}/${cid}/`
    );
    const uniqueID = await replyRef.push(reply).key;
    if (parentId) {
      const parentRef = await this.getDocumentRef(
        `${FB_COLLECTION_C_REPLIES}/${cid}/${parentId}/child`
      );
      await parentRef.push(uniqueID);
    }
  };

  /***********************
   * Masternodes Manager *
   ***********************/

  getMasternodeListByUser = async uid => {
    const masternodesListObj = await this.getDocument(`MasterNodes/${uid}`);
    const mnList = masternodesListObj ? Object.values(masternodesListObj) : [];
    return mnList;
  };

  getMasternodesTotalCount = async uid => await this.getDBnMnodes();

  deleteMasternode = async (masternode, uid) => {
    const masternodesRef = await this.getDocumentRef(`MasterNodes/${uid}`);
    masternodesRef.child(masternode.keyId).remove();
    this.rmvOneDBnMnodes();
  };

  addMasternode = async (masternode, uid) => {
    const cryptr = new Cryptr(uid);
    const newKey = this.db.ref().push().key;
    masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
    masternode.txid = cryptr.encrypt(masternode.txid);
    masternode.keyId = newKey;
    masternode.key = newKey;
    const newMasternodeRef = this.getDocumentRef(`MasterNodes/${uid}`);
    newMasternodeRef.child(masternode.keyId).set(masternode);
    this.addOneDBnMnodes();
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
    const mnList = await this.getMasternodeListByUser(uid);
    const foundedMn = mnList.find(
      item => item.mnPrivateKey === encryptedPrivateKey
    );
    return !!foundedMn;
  };

  /***************
   * 2FA Manager *
   ***************/

  /**
   *
   * @param {uid} User ID
   * @return Auth Object with 2FA values
   */
  getFire2FAstatus = async uid => {
    const rawUser2FAStatus = await this.getRawDocument(
      `${FB_COLLECTION_USERSINFO}/${uid}/2FA`
    );
    const user2FAStatus = rawUser2FAStatus.val();
    if (!user2FAStatus) {
      return false;
    }
    return user2FAStatus;
  };

  getFire2FAMethod = async (uid, method) => {
    const currentStatus = await this.getFire2FAstatus(uid);
    if (!currentStatus) {
      return false;
    }
    return currentStatus[method];
  };

  setFire2FAMethod = async (uid, method, value) => {
    const currentStatus = await this.getFire2FAstatus(uid);
    let newStatus = {};
    if (currentStatus) {
      newStatus = currentStatus;
    }
    if (method === 'authSecret') {
      newStatus['authSecret'] = value;
      newStatus['auth'] = !!value;
    }
    newStatus[method] = value;
    newStatus['twoFA'] = !!newStatus.sms || !!newStatus.auth;
    const twoFARef = this.getDocumentRef(
      `${FB_COLLECTION_USERSINFO}/${uid}/2FA`
    );
    twoFARef.update(newStatus);

    return newStatus;
  };

  removeFire2FA = async uid => {
    await this.getDocumentRef(`${FB_COLLECTION_USERSINFO}/${uid}/2FA`).remove();
    return { err: null, msg: '2FA register successfuly deleted' };
  };

  getAuthSecret = async uid => {
    const { auth, authSecret } = await this.getFire2FAstatus(uid);
    const cryptr = new Cryptr(uid);
    if (!auth) {
      return false;
    }
    const secret = cryptr.decrypt(authSecret);
    return secret;
  };

  saveAuthSecret = async (secret, uid) => {
    const cryptr = new Cryptr(uid);
    const cryptedSecret = cryptr.encrypt(secret);
    const newStatus = await this.setFire2FAMethod(
      uid,
      'authSecret',
      cryptedSecret
    );
    return newStatus;
  };
}

export default Firebase;
