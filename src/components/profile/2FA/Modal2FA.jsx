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
    if (user2fa.twoFa === true && user2fa.sms === true) {
      createPhoneProvider();
      
    }

  }, [user2fa]);

  const verifyPhone = async ({ phoneCode }) => {
    swal.fire({
      title: 'Verifying code',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    try {
      let credential = firebase.verifyPhoneCode(phoneProvider, phoneCode);
      await firebase.loginWithCredentials(credential).catch(err => {
        throw err
      });
      // console.log(isValidCredential)
      await swal.fire({
        icon: "success",
        title: "Code verified",
        timer: 1200,
        showConfirmButton: false
      });

      onPhoneSMS();
    } catch (error) {
      console.log(error)
      swal.fire({
        icon: "error",
        title: "Invalid code",
        text: "Error on the code verification try again"
      });
    }

  }
  const verifyGAuth = async ({gAuthCode}) => {
    swal.fire({
      title: 'Verifying code',
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
        timer: 1200,
        showConfirmButton: false
      });

      onGAuth()
    } else {
      await swal.fire({
        icon: "error",
        title: "Invalid code"
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
