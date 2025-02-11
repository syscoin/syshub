import firebase from 'firebase';
import jwtDecode from "jwt-decode";
import {getToken, setToken} from "./auth-token";
import {getUserVotingAddress, updateVotingAddress} from "./request";
import {createSeed} from "./encryption";
import axios from "axios";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

/**
 * Class that manages firebase
 * @class
 * @name Firebase
 */
class Firebase {

  /**
   * To initialize the firebase app and the self authentication
   * @constructor
   */
  constructor() {
    firebase.initializeApp(config);
    this.firebaseApp = firebase;
    this.auth = firebase.auth();
  }

  /**
   * function to use the device language
   * @function
   * @name useDeviceLanguage
   */
  useDeviceLanguage = () => this.auth.useDeviceLanguage();

  /**
   * function to login the user with email and password
   * @function
   * @name loginWithEmailAndPassword
   * @param {Object} userData the email and password of the user to login
   */
  loginWithEmailAndPassword = async ({
                                       email,
                                       password
                                     }) => await this.auth.signInWithEmailAndPassword(email, password).catch(err => {
    throw err
  });

  /**
   * function to create a new user with email and password
   * @function
   * @name register
   * @param {Object} userData the email and password of the user to signup
   */
  register = async ({email, password}) => await this.auth.createUserWithEmailAndPassword(email, password).catch(err => {
    throw err
  });

  /**
   * function to logout / signout a user from firebase
   * @function
   * @name signOut
   */
  signOut = async () => await this.auth.signOut();

  /**
   * function to send an email to reset the password
   * @function
   * @name passwordReset
   * @param {string} email email of the user
   */
  passwordReset = async (email) => await this.auth.sendPasswordResetEmail(email, {
    url: 'https://syshub-dev.web.app/'
  }).catch(err => {
    throw err
  });

  /**
   * function to create a new recaptcha verifier
   * @function
   * @name newRecaptchaVerifier
   * @param {string} container id of the html container for the recaptcha (must be empty)
   * @param {*} params params of the recaptcha
   * @param {*} app firebase app
   */
  newRecaptchaVerifier = (container, params, app) => new this.firebaseApp.auth.RecaptchaVerifier(container, params, app);

  /**
   * function that creates a new phone provider
   * @function
   * @name newPhoneAuthProvider
   */
  newPhoneAuthProvider = () => new this.firebaseApp.auth.PhoneAuthProvider();

  /**
   * function that returns the phone number of the current user
   * @function
   * @name getPhoneAuthProviderID
   * @return {number} phoneNumber
   */
  getPhoneAuthProviderID = () => this.auth.currentUser.phoneNumber;

  /**
   * function that removes the phone number of the current user
   * @function
   * @name removePhoneNumber
   */
  removePhoneNumber = () => this.auth.currentUser.unlink(this.firebaseApp.auth.PhoneAuthProvider.PROVIDER_ID)

  /**
   * function to send an sms to verificate
   * @function
   * @name sendSMSToPhone
   * @param {string} phoneNumber the phone number to send the sms
   * @param {*} appVerifier the recaptcha verifier
   */
  sendSMSToPhone = async (phoneNumber, appVerifier) => {
    const provider = this.newPhoneAuthProvider();
    return await provider.verifyPhoneNumber(phoneNumber, appVerifier).catch(err => {
      throw err
    });
  };

  /**
   * function to login using the phone number
   * @function
   * @name loginWithPhone
   * @param {string} phoneNumber the phone number of the user
   * @param {*} appVerifier the recaptcha verifier
   */
  loginWithPhone = async (phoneNumber, appVerifier) => await this.auth.signInWithPhoneNumber(`${phoneNumber}`, appVerifier);

  /**
   * function to login with the user credentials
   * @function
   * @name loginWithCredentials
   * @param {*} credentials the credentials of the user
   */
  loginWithCredentials = async (credentials) => await firebase.auth().signInWithCredential(credentials)

  /**
   * function to verify the phone code sent to the phone number
   * @function
   * @name verifyPhoneCode
   * @param {*} verificationId
   * @param {string} smsCode the code sent to the user via sms
   */
  verifyPhoneCode = (verificationId, smsCode) => this.firebaseApp.auth.PhoneAuthProvider.credential(verificationId, smsCode);

  /**
   * function to update the phone number
   * @function
   * @name updatePhoneCredentials
   * @param {*} credentials the new data used to update the phone number
   */
  updatePhoneCredentials = (credentials) => new Promise(async (resolve, reject) => await this.auth.currentUser.updatePhoneNumber(credentials).then((res => resolve(res))).catch(err => reject(err)));

  /**
   * function to update the password of the user
   * @function
   * @name changePassword
   * @param {string} oldPwd old password of the user
   * @param {string} password new password of the user
   */
  changePassword = async (oldPwd, password) => {
    const currentUser = this.auth.currentUser;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (currentUser) {
      const credentials = this.firebaseApp.auth.EmailAuthProvider.credential(currentUser.email, oldPwd)

      return new Promise((resolve, reject) => {
        currentUser.reauthenticateWithCredential(credentials).then(() => {
          currentUser.updatePassword(password).then(async ()=>{
            let {data: {nodes}} = await getUserVotingAddress({cancelToken: source.token}).catch(err => {
              throw err
            });
            createSeed(password)
            await Promise.all(nodes.map(async (addressData, i) => {
              let {uid, address, name, privateKey, txId} = addressData;
              await updateVotingAddress(uid, {address, name, privateKey, txId})
                  .catch((err) => {
                    reject(err)
                  })
                  .catch((err)=>{
                    reject(err)
                  })
              })).catch((err) => {
                reject(err)
              })
              resolve('pwd Changed')
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

  /**
   * function to verify the user's saved information and their authentication
   * @function
   * @name onAuthState
   */

  onAuthState = () => {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user)
      }, (err) => {
        reject(err)
      });
    })
  }

  /**
   * function to refresh the authorization token of the user
   * @function
   * @name refreshToken
   */

  //
  refreshToken = () => {
    return new Promise((resolve, reject) => {
        // if (this.auth.currentUser !== null) {
        // this.auth.onAuthStateChanged(user => {
        //   console.log(user)
        // })
        this.auth.onIdTokenChanged(async user => {
          // unsubscribe()
          if (user !== null) {
            const refreshedToken = await user
              .getIdToken(true)
              .catch(err => reject(err))
            resolve(refreshedToken)
          } else {
            return new Error('no authenticated')
          }
        }, (err) => reject(err))
        // }
      }
    )
  }

  /**
   * function that generates a link to verificate the email
   * @function
   * @name generateLinkVerification
   */
  generateLinkVerification = async () => {
    await this.auth.currentUser.sendEmailVerification(
      {
        url: window.location.origin,
        handleCodeInApp: true
      }).catch(err => {
      throw err
    })
  }
  /**
   * function used to verificate the time of the auth token and refresh it if neccesary
   * @function
   * @name refreshInRequest
   */
  refreshInRequest = async () => {
    const token = getToken();
    if (!token) {
      return null
    } else {
      const decoded = jwtDecode(token.decryptedToken);
      const dateNow = new Date().getTime();
      if (Math.floor(dateNow / 1000) > decoded.exp) {
        const newTokenRefreshed = await this.refreshToken().catch(err => {
          throw err
        })
        setToken(newTokenRefreshed);
      }
    }
  }
}

export default Firebase;
