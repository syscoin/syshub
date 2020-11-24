import React, { useState} from "react";
import swal from "sweetalert2";

import {useUser} from '../../context/user-context';
import {deleteUser, get2faInfoUser} from '../../utils/request';
import CustomModal from "../global/CustomModal";
import Modal2FA from "./2FA/Modal2FA";

export default function UserDelete() {
  const { user, logoutUser } = useUser();
  const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  const [user2FA, setUser2FA] = useState(null);
  const [open2FAModal, setOpen2FAModal] = useState(false);

  const VerificateDelete = async () => {
    const result = await swal.fire({
      title: 'Your account will be deleted.',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete my account',
    });
    if (result.isConfirmed) {
      try {
        let user2fa = await get2faInfoUser(user.data.user_id);
        if (user2fa.twoFa === true) {
          setUser2FA(user2fa);
          if (user2fa.gAuth === true) {
            setUserSignInGAuth({secret: user2fa.gAuthSecret});
          }
          setOpen2FAModal(true);
        }
        else {
          deleteAccountAfter2FA();
        }
      }
      catch (error) {
        swal.fire({
          title: 'There was an error',
          icon: 'error',
          text: 'please try again'
        });
        console.log(error);
      }
    }
  }
  
  const deleteAccountAfter2FA = async () => {
    setOpen2FAModal(false);
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
    }).catch(error => {
      swal.fire({
        title: 'There was an error',
        icon: 'error',
        text: error.message,
      });
    });
  }

  return (
    <div className="input-form">
      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Delete Account</label>
        <br/>
        <div className="indicator red">Your account will be deleted. This action cannot be undone.</div>
        <div className="description">We'll never share your email with anyone else.</div>
        <button className="btn btn--blue" onClick={VerificateDelete}>Delete account</button>
      </div>

      <CustomModal
        open={open2FAModal}
        onClose={() => setOpen2FAModal(false)}>
        {user2FA && <Modal2FA
          user2fa={user2FA}
          userSignInGAuth={userSignInGAuth}
          onGAuth={deleteAccountAfter2FA}
          onPhoneSMS={deleteAccountAfter2FA}
        />}
      </CustomModal>
    </div>
  );
}
