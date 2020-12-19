import React from "react";
import swal from "sweetalert2";

import { useUser } from "../../../context/user-context";

/**
 * Component to show inside the 2fa modal to activate previous phone number
 * @component
 * @subcategory Profile
 * @param {string} userPhone user phone
 * @param {*} openChangePhone function to open the change phone modal
 * @param {*} onClose function to close the modal after verification
 * 
 * @example
 * const userPhone = ''
 * const openChangePhone = () => {}
 * const onClose = () => {}
 * return (
 *  <PreviousPhoneForm userPhone={userPhone} openChangePhone={openChangePhone} onClose={onClose} />
 * )
 */
function PreviousPhoneForm({ userPhone, openChangePhone, onClose }) {
  const { updateCurrentActionsUser } = useUser();

  /**
   * function to enable the previous phone number using the apí
   * @function
   */
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

export default PreviousPhoneForm;