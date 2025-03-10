import React, {useEffect, useState} from 'react';
import CustomModal from '../../global/CustomModal';

import {useUser} from "../../../context/user-context";
import GAuthForm from './GAuthForm';
import SMS2FAForm from './SMS2FAForm';
import swal from 'sweetalert2'
import PreviousPhoneForm from './PreviousPhoneForm';

// import { updateUser } from "../../utils/request";

/**
 * Component to show the TwoFA info at profile
 * @component
 * @subcategory Profile
 * @param {Object} props authData, onTwoFAChange, userPhone
 * @example
 * const authData = {}
 * const onTwoFAChange = () => {}
 * const userPhone = ''
 * return (
 *  <UserMasternodes authData={authData} onTwoFAChange={onTwoFAChange} userPhone={userPhone} />
 * )
 */
function UserTwoFA({authData, onTwoFAChange, userPhone}) {
  const {
    // user,
    firebase,
    updateCurrentActionsUser,
    logoutUser,
  } = useUser();
  const [openSMS, setOpenSMS] = useState(false);
  const [openPrevPhone, setOpenPrevPhone] = useState(false);
  const [openGAuth, setOpenGAuth] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier("recaptcha", {
      size: "invisible",
      callback: (resp) => {
        // console.log(resp);
      },
      error: (err) => {
        // console.log(err);
      },
    });
    window.recaptchaVerifier.render();
    //eslint-disable-next-line
  }, []);
  /* const enableSMS = async (data) => {
      let currentUserDataUpdate = {
        gAuth: false
      }
      await updateCurrentActionsUser(currentUserDataUpdate).catch(err => {
        // console.log(err)
      })
    } */

  /**
   * to disable the sms verification
   * @function
   */
  // const disableSMS = async () => {
  //     await removePhoneNumberProvider();
  // }

  /**
   * to remove the phone number provider from firebase
   * @function
   */
  // const removePhoneNumberProvider = async () => {
  //     const result = await swal.fire({
  //         icon: 'warning',
  //         title: "You will disable SMS 2FA",
  //         text: 'Your phone number will also be removed',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes, remove it'
  //     })
  //     if (result.isConfirmed) {
  //         const {value: password} = await swal.fire({
  //             title: 'Enter your Password',
  //             input: 'password',
  //             showCancelButton: true,
  //             inputValidator: (value) => {
  //                 if (!value) {
  //                     return `Please enter password`
  //                 }
  //             }
  //         })
  //         if (password) {
  //             const appVerifier = window.recaptchaVerifier;
  //             await firebase.sendSMSToPhone(
  //                 user.data.phone_number,
  //                 appVerifier
  //             );
  //             const {value: smscode} = await swal.fire({
  //                 title: 'Enter your Sms Code',
  //                 input: 'text',
  //                 showCancelButton: true,
  //                 inputValidator: (value) => {
  //                     if (!value) {
  //                         return `Please enter password`
  //                     }
  //                 }
  //             })
  //             if (smscode) {
  //                 swal.fire({
  //                     title: 'Removing please wait',
  //                     showConfirmButton: false,
  //                     willOpen: () => {
  //                         swal.showLoading()
  //                     }
  //                 });
  //                 try {
  //                     await firebase.removePhoneNumber().catch(err => {
  //                         throw err
  //                     });
  //                     let currentUserDataUpdate = {
  //                         pwd: password,
  //                         sms: false,
  //                         twoFa: false
  //                     }
  //                     await updateCurrentActionsUser(currentUserDataUpdate)

  //                     swal.fire({
  //                         icon: 'success',
  //                         title: 'Your phone number was removed',
  //                         timer: 2000
  //                     });

  //                     await onTwoFAChange();
  //                 } catch (err) {
  //                     swal.fire({
  //                         icon: 'error',
  //                         title: 'There was an error',
  //                         text: err.response.data.message
  //                     });
  //                 }
  //             }
  //         }

  //     }
  // }

  /**
   * to remove the secret of google authenticator
   * @function
   */
  const removeSecret = async () => {
    const result = await swal.fire({
      title: "Your google auth secret will be removed",
      text: "You will also disable Google Authenticator 2FA",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
    });
    if (result.isConfirmed) {
      const { value: password } = await swal.fire({
        title: "Enter your Password",
        input: "password",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return `Please enter password`;
          }
        },
      });

      if (password) {
        const { value: code } = await swal.fire({
          title: "Enter your Google Authenticator Code",
          input: "text",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return `Please enter Google Authenticator code`;
            }
          },
        });
        if (code) {
          swal.fire({
            title: "Removing please wait",
            showConfirmButton: false,
            willOpen: () => {
              swal.showLoading();
            },
          });
          try {
            let currentUserDataUpdate = {
              pwd: password,
              code,
              gAuthSecret: null,
              gAuth: false,
              twoFa: false,
            };
            await updateCurrentActionsUser(currentUserDataUpdate, {
              method: "gauth-disabled",
            }).catch((err) => {
              throw err;
            });

            swal.fire({
              icon: "success",
              title: "Your secret was removed",
              text: "Google authenticator is disabled",
              timer: 2000,
            });

            await onTwoFAChange();
          } catch (err) {
            swal.fire({
              icon: "error",
              title: "There was an error",
              text: err.response.data.message,
            });
          }
        }
      }
    }
  };

  /**
   * to close the 2fa modal and logout
   * @function
   */
  const closeGauthAndLogout = async () => {
    setOpenGAuth(false);
    await setTimeout(() => {
      logoutUser();
    }, 1000);
  };

  /**
   * to close the 2fa modal and logout
   * @function
   */
  const closeSMSAndLogout = async () => {
    setOpenSMS(false);
    await setTimeout(() => {
      logoutUser();
    }, 1000);
  };

  /**
   * to close the 2fa modal and logout
   * @function
   */
  const closePreviousPhoneAndLogout = async () => {
    setOpenPrevPhone(false);
    await setTimeout(() => {
      logoutUser();
    }, 1000);
  };

  return (
    <div className="cols-top cols">
      {/* <div className="form-group col col--size6">
                <label className="big">2FA SMS</label>
                {
                    authData.sms ? (
                        <div className="indicator">ENABLED</div>
                    ) : (
                        <div className="indicator red">DISABLED</div>
                    )
                }
                {
                    !authData.sms && !userPhone && (
                        <div className="btn-group">
                            <button className="btn btn--blue" onClick={() => setOpenSMS(true)}>
                                Enable
                            </button>
                        </div>
                    )
                }
                {
                    !authData.sms && userPhone && (
                        <div className="btn-group">
                            <button className="btn btn--blue" onClick={() => setOpenPrevPhone(true)}>
                                Enable phone
                            </button>
                        </div>
                    )
                }
                {
                    authData.sms && (
                        <div className="btn-group">
                            <button className="btn btn--blue-border" onClick={() => setOpenSMS(true)}>
                                Change phone
                            </button>
                            <button className="btn btn--blue-border" onClick={disableSMS}>
                                Disable
                            </button>
                        </div>
                    )
                }
            </div> */}
      <div className="form-group col col--size6">
        <label className="big">Google Authenticator</label>
        {authData.gAuth ? (
          <div className="indicator">ENABLED</div>
        ) : (
          <div className="indicator red">DISABLED</div>
        )}
        {!authData.gAuth && (
          <div className="btn-group">
            <button
              className="btn btn--blue"
              onClick={() => setOpenGAuth(true)}
            >
              Enable
            </button>
          </div>
        )}
        {authData.gAuth && (
          <div className="btn-group">
            <button className="btn btn--blue-border" onClick={removeSecret}>
              Remove secret and disable
            </button>
          </div>
        )}
      </div>

      <CustomModal open={openSMS} onClose={() => setOpenSMS(false)}>
        <SMS2FAForm
          onClose={closeSMSAndLogout}
          appVerifier={window.recaptchaVerifier}
        />
      </CustomModal>

      <CustomModal open={openPrevPhone} onClose={() => setOpenPrevPhone(false)}>
        <PreviousPhoneForm
          userPhone={userPhone}
          openChangePhone={() => setOpenSMS(true)}
          onClose={closePreviousPhoneAndLogout}
        />
      </CustomModal>

      <CustomModal open={openGAuth} onClose={() => setOpenGAuth(false)}>
        <GAuthForm onClose={closeGauthAndLogout} />
      </CustomModal>
      <div
        id={"recaptcha"}
        className="recaptcha"
        style={{ display: "inline-block" }}
      />
    </div>
  );
}

export default UserTwoFA;
