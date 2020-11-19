import React from 'react';
import swal from "sweetalert2";
import {decryptAes} from "../../utils/encryption";
import {verifyAuthCode} from "../../utils/twoFaAuthentication";
import SMSTwoFAFormLogin from '../../login/SMSTwoFAFormLogin';
import GAuthTwoFAFormLogin from '../../login/GAuthTwoFAFormLogin';
import { useUser } from '../../../context/user-context';

export default function Modal2FA({ user2fa, userSignInGAuth, onGAuth, onPhoneSMS }) {
  const { firebase } = useUser();

  const verifyPhone = async ({phoneCode}) => {
    console.log(phoneCode)
    let phone = await firebase.getPhoneAuthProviderID()
    let verifier = await firebase.sendSMSToPhone(phone, window.recaptchaVerifier)
    let x = firebase.verifyPhoneCode(verifier, phoneCode)
    console.log(x)
    //trycatch de si esta o no verificado con sus swal
    // ejecutar el callback onPhoneSMS() en el try al finalizar
  }
  const verifyGAuth = async ({ gAuthCode }) => {
    
    swal.fire({
      title: 'Verifying',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    })
    let secret = decryptAes(userSignInGAuth.secret, process.env.REACT_APP_ENCRYPT_KEY_DATA);
    let h = decryptAes(secret, process.env.REACT_APP_ENCRYPT_KEY_DATA);
    let isVerified = verifyAuthCode(h, gAuthCode);

    if (isVerified) {
      await swal.fire({
        icon: "success",
        title: "Code verified",
        timer: 2000,
        showConfirmButton: false
      });
      
      //callback onGAuth()
    } else {
      await swal.fire({
        icon: "error",
        title: "Code invalid",
        timer: 2000
      });
    }
  }

  if (user2fa.twoFa === true && user2fa.sms === true) {
    return (
      <SMSTwoFAFormLogin userSignInSms={verifyPhone} />
    )
  }

  else if (user2fa.twoFa === true && user2fa.gAuth === true) {
    return (
      <GAuthTwoFAFormLogin userSignInGAuth={verifyGAuth} />
    )
  }
}
