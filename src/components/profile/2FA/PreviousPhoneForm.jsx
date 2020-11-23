import React from "react";

import swal from "sweetalert2";

import { useUser } from "../../../context/user-context";


export default function PreviousPhoneForm({ userPhone, openChangePhone, onClose }) {
  const { updateCurrentActionsUser } = useUser();

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
        timer: 1500,
        showConfirmButton: false
      });

      onClose();
      
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
        onClick={openChangePhone}
      >
        Change Phone
      </button>
      
      <div
        id={"recaptcha"}
        className="recaptcha"
        style={{ display: "inline-block" }}
      />
      
    </>
  );
  
}
