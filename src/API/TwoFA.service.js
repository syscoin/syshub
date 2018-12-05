import { fire } from './firebase';
import Cryptr from 'cryptr';

const TWOFA_FIRE_COLLECTION = '2FAAuth';

/* *
 * 2FA general Functions
*/

/**
 * 
 * @param {uid} User ID
 * @return true if find a pending proposal for that user 
 */
export const getFire2FAstatus = async (uid) => {
  const user2FAStatusRef  = await fire.database().ref(`${TWOFA_FIRE_COLLECTION}/${uid}`).once('value', u2FAStatus => u2FAStatus);
  const user2FAStatus = user2FAStatusRef.val();
  if (!user2FAStatus) {
    return false
  }
  return user2FAStatus
};

export const getFire2FAMethod = async (uid, method) => {
  const currentStatus = await getFire2FAstatus(uid);
  if (!currentStatus) { return false }
  return currentStatus[method];
}

export const setFire2FAMethod = async (uid, method, value) => {
  const currentStatus = await getFire2FAstatus(uid);
  let newStatus = {};
  if (currentStatus) { newStatus = currentStatus; }
  if (method === 'authSecret') {
    newStatus['authSecret'] = value;
    newStatus['auth'] = !!value;
  }
  newStatus[method] = value;
  newStatus['twoFA'] = !!newStatus.sms || !!newStatus.auth;
  const twoFARef = fire.database().ref(`${TWOFA_FIRE_COLLECTION}/${uid}`);
  twoFARef.update(newStatus);

  return newStatus;
}

export const removeFire2FA = async (uid) => {
  await fire.database().ref(`${TWOFA_FIRE_COLLECTION}/${uid}`).remove();
  return {err: null, msg: '2FA register successfuly deleted'}
}

/* *
 * 2FA SMS methods
*/

export const sendSMSToPhone = async (provider, phoneNumber, appVerifier) => {
  const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
  return verificationId;
}

export const verifyPhoneCode = async (verificationId, smsCode) => {
  const phoneCredential = await fire.auth.PhoneAuthProvider.credential(verificationId, smsCode);
  return phoneCredential;
}

/* *
 * 2FA Google Auth
*/

const speakeasy = require('speakeasy');
const QRCode = require('qrcode')

export const getAuthQRCode = (email) => {
  const secret = speakeasy.generateSecret();
  let qrCodeURL;
  let url = speakeasy.otpauthURL({
    algorithm: 'sha1',
    issuer: 'Syshub',
    secret: secret.base32,
    label: email
  });
  QRCode.toDataURL(url, (err, data_url) => qrCodeURL = data_url);
  return { secret, qrCodeURL }  
}

export const getToken = (secret) => speakeasy.totp({
    secret: secret.base32,
    encoding: ['base32']
  });

export const verifyAuthCode = (secret, token) => {
  const verified = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: ['base32'],
    token,
  });
  return verified;
}

export const saveAuthSecret = async (secret, uid) => {
  const cryptr = new Cryptr(uid);
  const cryptedSecret = cryptr.encrypt(secret);
  const newStatus = await setFire2FAMethod(uid, 'authSecret', cryptedSecret);
  return newStatus;
} 

export const getAuthSecret = async (uid) => {
  const { auth, authSecret} = await getFire2FAstatus(uid);
  if (!auth) {
    return false;
  }

  const cryptr = new Cryptr(uid);
  const secret = cryptr.decrypt(authSecret);
  console.log('ACZ getSecret --> ', secret);

} 