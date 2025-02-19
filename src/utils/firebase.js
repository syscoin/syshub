import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  useDeviceLanguage,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  onIdTokenChanged,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  PhoneAuthProvider,
  unlink,
  updatePassword,
  updatePhoneNumber,
} from "firebase/auth";
import jwtDecode from "jwt-decode";
import { getUserData, saveUserData } from "./auth-token";
import { getUserVotingAddress, updateVotingAddress } from "./request";
import { createSeed } from "./encryption";
import axios from "axios";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
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
    this.firebaseApp = initializeApp(config);
    this.auth = getAuth(this.firebaseApp);
  }

  /**
   * function to use the device language
   * @function
   * @name useDeviceLanguage
   */
  useDeviceLanguage = () => useDeviceLanguage(this.auth);

  /**
   * function to login the user with email and password
   * @function
   * @name loginWithEmailAndPassword
   * @param {Object} userData the email and password of the user to login
   */
  loginWithEmailAndPassword = async ({ email, password }) =>
    await signInWithEmailAndPassword(this.auth, email, password).catch(
      (err) => {
        throw err;
      }
    );

  /**
   * function to create a new user with email and password
   * @function
   * @name register
   * @param {Object} userData the email and password of the user to signup
   */
  register = async ({ email, password }) =>
    await createUserWithEmailAndPassword(this.auth, email, password).catch(
      (err) => {
        throw err;
      }
    );

  /**
   * function to logout / signout a user from firebase
   * @function
   * @name signOut
   */
  signOut = async () => await signOut(this.auth);

  /**
   * function to send an email to reset the password
   * @function
   * @name passwordReset
   * @param {string} email email of the user
   */
  passwordReset = async (email) =>
    await sendPasswordResetEmail(this.auth, email, {
      url: window.location.origin,
    }).catch((err) => {
      throw err;
    });

  /**
   * function to create a new recaptcha verifier
   * @function
   * @name newRecaptchaVerifier
   * @param {string} container id of the html container for the recaptcha (must be empty)
   * @param {*} params params of the recaptcha
   * @param {*} app firebase app
   */
  newRecaptchaVerifier = (container, params, app) =>
    new RecaptchaVerifier(this.auth, container, params, app);

  /**
   * function that creates a new phone provider
   * @function
   * @name newPhoneAuthProvider
   */
  newPhoneAuthProvider = () => new PhoneAuthProvider(this.auth);

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
  removePhoneNumber = () =>
    unlink(this.currentUser, PhoneAuthProvider.PROVIDER_ID);

  /**
   * function to send an sms to verificate
   * @function
   * @name sendSMSToPhone
   * @param {string} phoneNumber the phone number to send the sms
   * @param {*} appVerifier the recaptcha verifier
   */
  sendSMSToPhone = async (phoneNumber, appVerifier) => {
    const provider = this.newPhoneAuthProvider();
    return await provider
      .verifyPhoneNumber(phoneNumber, appVerifier)
      .catch((err) => {
        throw err;
      });
  };

  /**
   * function to login using the phone number
   * @function
   * @name loginWithPhone
   * @param {string} phoneNumber the phone number of the user
   * @param {*} appVerifier the recaptcha verifier
   */
  loginWithPhone = async (phoneNumber, appVerifier) =>
    signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);

  /**
   * function to login with the user credentials
   * @function
   * @name loginWithCredentials
   * @param {*} credentials the credentials of the user
   */
  loginWithCredentials = async (credentials) =>
    await signInWithCredential(this.auth, credentials);

  /**
   * function to verify the phone code sent to the phone number
   * @function
   * @name verifyPhoneCode
   * @param {*} verificationId
   * @param {string} smsCode the code sent to the user via sms
   */
  verifyPhoneCode = (verificationId, smsCode) =>
    PhoneAuthProvider.credential(verificationId, smsCode);

  /**
   * function to update the phone number
   * @function
   * @name updatePhoneCredentials
   * @param {*} credentials the new data used to update the phone number
   */
  updatePhoneCredentials = (credentials) =>
    new Promise(
      async (resolve, reject) =>
        await updatePhoneNumber(this.auth.currentUser, credentials)
          .then((res) => resolve(res))
          .catch((err) => reject(err))
    );

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
      const credentials = EmailAuthProvider.credential(
        currentUser.email,
        oldPwd
      );

      return new Promise((resolve, reject) => {
        reauthenticateWithCredential(currentUser, credentials)
          .then(() => {
            updatePassword(currentUser, password)
              .then(async () => {
                let {
                  data: { nodes },
                } = await getUserVotingAddress({
                  cancelToken: source.token,
                }).catch((err) => {
                  throw err;
                });
                createSeed(password);
                await Promise.all(
                  nodes.map(async (addressData, i) => {
                    let { uid, address, name, privateKey, txId } = addressData;
                    await updateVotingAddress(uid, {
                      address,
                      name,
                      privateKey,
                      txId,
                    })
                      .catch((err) => {
                        reject(err);
                      })
                      .catch((err) => {
                        reject(err);
                      });
                  })
                ).catch((err) => {
                  reject(err);
                });
                resolve("pwd Changed");
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  };

  /**
   * function to verify the user's saved information and their authentication
   * @function
   * @name onAuthState
   */

  onAuthState = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          resolve(user);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  /**
   * function to refresh the authorization token of the user
   * @function
   * @name refreshToken
   */

  //
  refreshToken = () => {
    return new Promise((resolve, reject) => {
      onIdTokenChanged(
        this.auth,
        async (user) => {
          // unsubscribe()
          if (user !== null) {
            const refreshedToken = await user
              .getIdToken(true)
              .catch((err) => reject(err));
            resolve(refreshedToken);
          } else {
            return new Error("no authenticated");
          }
        },
        (err) => reject(err)
      );
    });
  };

  /**
   * function that generates a link to verificate the email
   * @function
   * @name generateLinkVerification
   */
  generateLinkVerification = async () => {
    await sendEmailVerification(this.auth.currentUser, {
      url: window.location.origin,
      handleCodeInApp: true,
    }).catch((err) => {
      throw err;
    });
  };
  /**
   * function used to verificate the time of the auth token and refresh it if neccesary
   * @function
   * @name refreshInRequest
   */
  refreshInRequest = async () => {
    const token = getUserData();
    if (!token) {
      return null;
    } else {
      const decoded = jwtDecode(token.decryptedToken);
      const dateNow = new Date().getTime();
      if (Math.floor(dateNow / 1000) > decoded.exp) {
        const newTokenRefreshed = await this.refreshToken().catch((err) => {
          throw err;
        });
        saveUserData(newTokenRefreshed);
      }
    }
  };
}

export default Firebase;
