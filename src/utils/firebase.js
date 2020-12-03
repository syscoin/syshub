import firebase from 'firebase';
import jwtDecode from "jwt-decode";
import {getToken, setToken} from "./auth-token";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

export default class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.firebaseApp = firebase;
    this.auth = firebase.auth();
  }

  useDeviceLanguage = () => this.auth.useDeviceLanguage();

  loginWithEmailAndPassword = async ({email, password}) => await this.auth.signInWithEmailAndPassword(email, password).catch(err => {
    throw err
  });

  register = async ({email, password}) => await this.auth.createUserWithEmailAndPassword(email, password).catch(err => {
    throw err
  });

  signOut = async () => await this.auth.signOut();

  passwordReset = async (email) => await this.auth.sendPasswordResetEmail(email, {
    // url: 'http://198.211.117.144/'
  }).catch(err => {
    throw err
  });

  newRecaptchaVerifier = (container, params, app) => new this.firebaseApp.auth.RecaptchaVerifier(container, params, app);

  newPhoneAuthProvider = () => new this.firebaseApp.auth.PhoneAuthProvider();

  getPhoneAuthProviderID = () => this.auth.currentUser.phoneNumber;

  removePhoneNumber = () => this.auth.currentUser.unlink(this.firebaseApp.auth.PhoneAuthProvider.PROVIDER_ID)

  sendSMSToPhone = async (phoneNumber, appVerifier) => {
    const provider = this.newPhoneAuthProvider();
    return await provider.verifyPhoneNumber(phoneNumber, appVerifier).catch(err => {
      throw err
    });
  };

  loginWithPhone = async (phoneNumber, appVerifier) => await this.auth.signInWithPhoneNumber(`${phoneNumber}`, appVerifier);

  loginWithCredentials = async (credentials) => await firebase.auth().signInWithCredential(credentials)

  verifyPhoneCode = (verificationId, smsCode) => this.firebaseApp.auth.PhoneAuthProvider.credential(verificationId, smsCode);

  updatePhoneCredentials = (credentials) => new Promise(async (resolve, reject) => await this.auth.currentUser.updatePhoneNumber(credentials).then((res => resolve(res))).catch(err => reject(err)));

  changePassword = async (oldPwd, password) => {
    const currentUser = this.auth.currentUser;

    if (currentUser) {
      const credentials = this.firebaseApp.auth.EmailAuthProvider.credential(currentUser.email, oldPwd)

      return new Promise(async (resolve, reject) => {
        currentUser.reauthenticateWithCredential(credentials).then(async () => {
          await currentUser.updatePassword(password).catch(err => {
            reject(err)
          })
          resolve('pwd Changed')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

  refreshToken = async () => {
    return new Promise(async (resolve, reject) => {
        if (this.auth.currentUser !== null) {
          const unsubscribe = this.auth
            .onIdTokenChanged(async user => {
              unsubscribe()
              const refreshedToken = await user
                .getIdToken(true)
                .catch(err => console.error(err))
              resolve(refreshedToken)
            }, reject)
        }
      }
    )
  }

  generateLinkVerification = async () => await this.auth.currentUser.sendEmailVerification(
    //   {
    //   url: 'https://firebase.google.com/docs/web/setup',
    //   handleCodeInApp: true
    //   }
  ).catch(err => {
    throw err
  })

  refreshInRequest = async () => {
    const token = getToken();
    if (!token) {
      return null
    } else {
      const decoded = jwtDecode(token.decryptedToken);
      const dateNow = new Date().getTime();
      if (Math.floor(dateNow / 1000) > decoded.exp) {
        console.log('token refrescado')
        const newTokenRefreshed = await this.refreshToken().catch(err => {
          throw err
        })
        setToken(newTokenRefreshed);
      }
    }
  }
}
