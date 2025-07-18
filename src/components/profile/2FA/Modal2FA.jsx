import React, {useState, useEffect} from 'react';
import swal from "sweetalert2";

import {decryptJWT} from "../../../utils/encryption";
import {verifyAuthCode} from "../../../utils/twoFaAuthentication";
import {useUser} from '../../../context/user-context';

import SMS2FA from './SMS2FA';
import GAuth from './GAuth';
import { verifyGauthCode } from '../../../utils/request';

/**
 * The modal content when using 2FA
 * @component
 * @subcategory Profile
 * @param {Object} user2fa user's 2fa info
 * @param {Object} userSignInGAuth secret of gauth
 * @param {*} onGAuth callback to the gauth verification
 * @param {*} onPhoneSMS callback to the sms verification
 * @example
 * const user2fa = {}
 * const userSignInGAuth = {}
 * const onGAuth = () => {}
 * const onPhoneSMS = () => {}
 * return (
 *  <Modal2FA user2fa={user2fa} userSignInGAuth={userSignInGAuth} onGAuth={onGAuth} onPhoneSMS={onPhoneSMS} />
 * )
 */
function Modal2FA({user2fa, userSignInGAuth, onGAuth, onPhoneSMS}) {
  const {firebase} = useUser();
  const [phoneProvider, setPhoneProvider] = useState(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  /**
   * useEffect to render the recaptcha when mounts
   * @function
   */
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

  /**
   * function used to verify the code sent via sms
   * @function
   * @param {string} phoneCode code sent to the phone number in sms verification
   */
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
      // console.log(error)
      swal.fire({
        icon: "error",
        title: "Invalid code",
        text: "Error on the code verification try again"
      });
    }

  }

  /**
   * function used to verify the code from google authenticator
   * @function
   * @param {string} gAuthCode code sent via google authenticator
   */
  const verifyGAuth = async ({gAuthCode}) => {
    swal.fire({
      title: 'Verifying code',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    })
    
    const verificationResponse = await verifyGauthCode(gAuthCode).then(a => a.data).catch(() => ({ok: false}));

    const isVerified = Boolean(verificationResponse.ok)
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

export default Modal2FA;