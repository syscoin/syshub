import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
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

  register = async ({email, password, username}) => await this.auth.createUserWithEmailAndPassword(email, password).catch(err => {
    throw err
  });

  signOut = async () => await this.auth.signOut();

  passwordReset = async ({email}) => await this.auth.sendPasswordResetEmail(email, {}).catch(err => {
    throw err
  });

  passwordUpdate = async (user, callback) => {
    const currentUser = await this.auth.currentUser;
    console.log(currentUser)
  };
  newRecaptchaVerifier = (container, params, app) => new this.firebaseApp.auth.RecaptchaVerifier(container, params, app);

  newPhoneAuthProvider = () => new this.firebaseApp.auth.PhoneAuthProvider();

  getPhoneAuthProviderID = () => this.firebaseApp.auth.PhoneAuthProvider.PROVIDER_ID;

  sendSMSToPhone = async (phoneNumber, appVerifier) => {
    const provider = this.newPhoneAuthProvider();
    return await provider.verifyPhoneNumber(phoneNumber, appVerifier).catch(err => {
      throw err
    });
  };

  loginWithPhone = async (phoneNumber, appVerifier) => await this.auth.signInWithPhoneNumber(`${phoneNumber}`, appVerifier);

  verifyPhoneCode = (verificationId, smsCode) => this.firebaseApp.auth.PhoneAuthProvider.credential(verificationId, smsCode);

  changePassword = async (password, callback) => {
    const currentUser = this.auth.currentUser;

    if (currentUser) {
      const credentials = this.firebaseApp.auth.EmailAuthProvider.credential(currentUser.email, currentUser.currentPass)
      currentUser
        .reauthenticateWithCredential(credentials)
        .then(async () => {
          await currentUser.updatePassword(password).catch(err => {
            throw err
          })
        })
        .then(async () => {
          await this.signOut();
          callback(null, 'success');
        })
        .catch(err => {
          callback(err)
        })
    }
  }
}
