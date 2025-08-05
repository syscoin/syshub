import React, { useState } from "react";
import swal from "sweetalert2";

import { useUser } from "../../context/user-context";
import { deleteUser, get2faInfoUser } from "../../utils/request";
import CustomModal from "../global/CustomModal";
import Modal2FA from "./2FA/Modal2FA";

/**
 * Component used to delete the account of the user
 * @component
 * @subcategory Profile
 * @example
 * return (
 *  <UserDelete />
 * )
 */
function UserDelete() {
  const { user, logoutUser } = useUser();
  const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  const [user2FA, setUser2FA] = useState(null);
  const [open2FAModal, setOpen2FAModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  console.log({ user });

  /**
   * function to confirm the deletion of the account and check the 2fa auth to open the modal
   * @function
   */
  const verificateDelete = async () => {
    const result = await swal.fire({
      title: "Your account will be deleted.",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete my account",
    });
    if (result.isConfirmed) {
      try {
        setIsDeleting(true);
        let user2fa = await get2faInfoUser(user.data.uid);
        if (user2fa.twoFa === true) {
          setUser2FA(user2fa);
          if (user2fa.gAuth === true) {
            setUserSignInGAuth({ secret: user2fa.gAuthSecret });
          }
          setOpen2FAModal(true);
        } else {
          deleteAccountAfter2FA();
        }
      } catch (error) {
        swal.fire({
          title: "There was an error",
          icon: "error",
          text: "please try again",
        });
      }
    }
  };

  /**
   * function to delete the account after the verification
   * @function
   */
  const deleteAccountAfter2FA = async () => {
    setOpen2FAModal(false);
    await deleteUser(user.data.uid)
      .then(async () => {
        await swal
          .fire({
            title: "Deleted",
            text: "Your account has been deleted",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          })
          .then(async () => {
            await logoutUser();
          });
      })
      .catch((error) => {
        swal.fire({
          title: "There was an error",
          icon: "error",
          text: error.message,
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="input-form">
      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Delete Account</label>
        <br />
        <div className="indicator red">
          Your account will be deleted. This action cannot be undone.
        </div>
        <div className="description">
          We'll never share your email with anyone else.
        </div>
        <button
          className="btn btn--blue"
          onClick={verificateDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete account"}
        </button>
      </div>

      <CustomModal open={open2FAModal} onClose={() => setOpen2FAModal(false)}>
        {user2FA && (
          <Modal2FA
            user2fa={user2FA}
            userSignInGAuth={userSignInGAuth}
            onGAuth={deleteAccountAfter2FA}
            onPhoneSMS={deleteAccountAfter2FA}
          />
        )}
      </CustomModal>
    </div>
  );
}

export default UserDelete;
