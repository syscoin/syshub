import React, {useState, useEffect} from 'react';
import swal from "sweetalert2";

import {decryptAes} from "../../../utils/encryption";
import {verifyAuthCode} from "../../../utils/twoFaAuthentication";
import {useUser} from '../../../context/user-context';

import SMS2FA from './SMS2FA';
import GAuth from './GAuth';

export default function Modal2FA({user2fa, userSignInGAuth, onGAuth, onPhoneSMS}) {
  const {firebase} = useUser();
  const [phoneProvider, setPhoneProvider] = useState(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier("recaptcha", {
      size: "invisible",
      callback: () => {
        setRecaptchaVerified(true)
      },
      error: (err) => {
        setRecaptchaVerified(false)
      },
    });
    window.recaptchaVerifier.render();

    const createPhoneProvider = async () => {
      let phone = await firebase.getPhoneAuthProviderID();
      let verifier = await firebase.sendSMSToPhone(phone, window.recaptchaVerifier);
      setPhoneProvider(verifier);
    }
    
    if (user2fa.twoFa === true && user2fa.sms === true) {
      createPhoneProvider();
    }

  }, [user2fa, firebase]);

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

  return (
    <>
      {
        (user2fa.twoFa === true && user2fa.sms === true) && (
          <SMS2FA userSignInSms={verifyPhone} recaptchaVerified={recaptchaVerified} />
        )
      }
      {
        (user2fa.twoFa === true && user2fa.gAuth === true) && (
          <GAuth userSignInGAuth={verifyGAuth} />
        )
      }
      <div
        id={"recaptcha"}
        className="recaptcha"
        style={{display: "inline-block"}}
      ></div>
    </>
  )

}
