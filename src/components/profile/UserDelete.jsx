import React, { useState} from "react";
import swal from "sweetalert2";

import {useUser} from '../../context/user-context';
import {deleteUser, get2faInfoUser} from '../../utils/request';
import CustomModal from "../global/CustomModal";
import SMSTwoFAFormLogin from "../login/SMSTwoFAFormLogin";
import GAuthTwoFAFormLogin from "../login/GAuthTwoFAFormLogin";
import {decryptAes} from "../../utils/encryption";
import {verifyAuthCode} from "../../utils/twoFaAuthentication";

export default function UserDelete() {
  const {user, logoutUser, firebase} = useUser();
  const [userSignInGAuth, setUserSignInGAuth] = useState("");
  const [openSMS2Fa, setOpenSMS2Fa] = useState(false);
  const [openGAuthFa, setOpenGAuth2Fa] = useState(false);

  const deleteAccount = async () => {
    const result = await swal.fire({
      title: 'Your account will be deleted.',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete my account',
    })
    if (result.isConfirmed) {
      try {
        let user2fa = await get2faInfoUser(user.data.user_id);

        //ABRIR EL 2fa MODAL
        if (user2fa.twoFa === true && user2fa.sms === true) {
          setOpenSMS2Fa(true)
        } else if (user2fa.twoFa === true && user2fa.gAuth === true) {
          setUserSignInGAuth({secret: user2fa.gAuthSecret});
          setOpenGAuth2Fa(true)
        } else {
          await deleteUser(user.token, user.data.user_id).then(async () => {
            await swal.fire({
              title: 'Deleted',
              text: "Your account has been deleted",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            }).then(async () => {
              await logoutUser();
            })
          });
        }

      } catch (error) {
        swal.fire({
          title: 'There was an error',
          text: error,
          icon: 'error',
        });
        console.log(error);
      }
    }

  }

  const verifyPhone = async ({phoneCode}) => {
    console.log(phoneCode)
    let phone = await firebase.getPhoneAuthProviderID()
    let verifier = await firebase.sendSMSToPhone(phone, window.recaptchaVerifier)
    let x = firebase.verifyPhoneCode(verifier, phoneCode)
    console.log(x)
    // await deleteUser(user.token, user.data.user_id);
    // await swal.fire({
    //   title: 'Deleted',
    //   text: "Your account has been deleted",
    //   icon: 'success',
    //   showConfirmButton: false,
    //   timer: 2000
    // });
    // await logoutUser();
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
      setOpenGAuth2Fa(false);
      await swal.fire({
        icon: "success",
        title: "Code verified",
        timer: 2000,
        showConfirmButton: false
      }).then(async () => {
        await deleteUser(user.token, user.data.user_id).then(async () => {
          await swal.fire({
            title: 'Deleted',
            text: "Your account has been deleted",
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(async () => {
            await logoutUser();
          })
        })
      })
    } else {
      await swal.fire({
        icon: "error",
        title: "Code invalid",
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

  return (
    <div className="input-form">
      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Delete Account</label>
        <br/>
        <div className="indicator red">Your account will be deleted. This action cannot be undone.</div>
        <div className="description">We'll never share your email with anyone else.</div>
        <button className="btn btn--blue" onClick={deleteAccount}>Delete account</button>
      </div>

      <CustomModal
        open={openSMS2Fa}
        onClose={() => setOpenSMS2Fa(false)}>
        <SMSTwoFAFormLogin userSignInSms={verifyPhone} closeModal={() => setOpenSMS2Fa(false)}/>
      </CustomModal>
      <CustomModal
        open={openGAuthFa}
        onClose={() => setOpenGAuth2Fa(false)}>
        <GAuthTwoFAFormLogin userSignInGAuth={verifyGAuth}/>
      </CustomModal>
    </div>
  );
}
