
import { fire } from './firebase';

const TWOFA_FIRE_COLLECTION = '2FAAuth';

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
