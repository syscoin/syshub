import React, { useState } from "react";

import swal from "sweetalert2";

import { useUser } from "../../../context/user-context";
import CustomModal from "../../global/CustomModal";
import SMS2FAForm from "./SMS2FAForm";



export default function PreviousPhoneForm({ userPhone }) {
  const { logoutUser, updateCurrentActionsUser } = useUser();

  const [openSMS, setOpenSMS] = useState(false);

  

  
  const enablePhone = async () => {
    try {
      let currentUserDataUpdate = {
        sms: true,
        twoFa: true,
        gAuth: false
      };
      await updateCurrentActionsUser(currentUserDataUpdate).catch((err) => {
        throw err;
      });
      await swal.fire({
        icon: "success",
        title: "Your phone number was enabled",
        text: "Please log in again",
        timer: 2000,
        showConfirmButton: false
      });

      logoutUser();
      
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "There was an error",
        text: error
      });
    }
  };

  
  return (
    <>
      <h3>Enable Phone Code</h3>
      <div className="input-form">
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" className="styled" disabled value={userPhone} />
        </div>
        <button
          className="btn btn--blue btn-center"
          onClick={enablePhone}
        >
          Enable
        </button>
        <div className="form-group spacer line"></div>
      </div>
      <p>Or you might want to change your phone number</p>
      <button
        className="btn btn--blue btn-center"
        onClick={() => setOpenSMS(true)}
      >
        Change Phone
      </button>
      
      <div
        id={"recaptcha"}
        className="recaptcha"
        style={{ display: "inline-block" }}
      />
      <CustomModal
        open={openSMS}
        onClose={() => setOpenSMS(false)}
      >
        <SMS2FAForm />
      </CustomModal>
    </>
  );
  
}
