
import { fire } from './firebase/firebase';

export const sendSMSToPhone = async (provider, phoneNumber, appVerifier) => {
  const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
  return verificationId;
}

export const verifyPhoneCode = async (verificationId, smsCode) => {
  const phoneCredential = await fire.auth.PhoneAuthProvider.credential(verificationId, smsCode);
  return phoneCredential;
}

export const loginWithPhone = async (phoneNumber, appVerifier) => {
  const confirmationResult = await fire.auth().signInWithPhoneNumber(`${phoneNumber}`, appVerifier)
  return confirmationResult
}