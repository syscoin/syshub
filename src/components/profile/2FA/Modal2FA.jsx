import React, {useState, useEffect} from 'react';
import swal from "sweetalert2";

import {decryptAes} from "../../../utils/encryption";
import {verifyAuthCode} from "../../../utils/twoFaAuthentication";
import {useUser} from '../../../context/user-context';

import SMSTwoFAFormLogin from '../../login/SMSTwoFAFormLogin';
import GAuthTwoFAFormLogin from '../../login/GAuthTwoFAFormLogin';

export default function Modal2FA({user2fa, userSignInGAuth, onGAuth, onPhoneSMS}) {
  const {firebase} = useUser();
  const [phoneProvider, setPhoneProvider] = useState(null);

  useEffect(() => {
    const createPhoneProvider = async () => {
      let phone = await firebase.getPhoneAuthProviderID();
      let verifier = await firebase.sendSMSToPhone(phone, window.recaptchaVerifier);
      setPhoneProvider(verifier);
    }

    if (typeof window.recaptchaVerifier === 'undefined') {
      window.recaptchaVerifier = firebase.newRecaptchaVerifier("recaptcha", {
        size: "invisible",
        callback: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
      window.recaptchaVerifier.render();
    }
    createPhoneProvider();

  }, []);

  const verifyPhone = async ({phoneCode}) => {
    let credential = firebase.verifyPhoneCode(phoneProvider, phoneCode)
    let isValidCredential = await firebase.loginWithCredentials(credential);
    console.log(isValidCredential)

    onPhoneSMS();
    //trycatch de si esta o no verificado con sus swal
    // ejecutar el callback onPhoneSMS() en el try al finalizar
  }
  const verifyGAuth = async ({gAuthCode}) => {

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

      onGAuth()
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
      <SMSTwoFAFormLogin userSignInSms={verifyPhone}/>
    )
  } else if (user2fa.twoFa === true && user2fa.gAuth === true) {
    return (
      <GAuthTwoFAFormLogin userSignInGAuth={verifyGAuth}/>
    )
  }
}
