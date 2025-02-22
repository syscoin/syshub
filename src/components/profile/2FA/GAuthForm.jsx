import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import {
  getAuthQrCode,
  verifyAuthCode,
} from "../../../utils/twoFaAuthentication";
import { useUser } from "../../../context/user-context";
import { encryptJWT } from "../../../utils/encryption";

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .required("The verification code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be 6 digits")
    .max(6, "Must be 6 digits"),
});

/**
 * Component to show inside 2fa modal to activate gauth
 * @component
 * @subcategory Profile
 * @param {*} onClose function to close after the verification
 * @example
 * const onClose = () => {}
 * return (
 *  <GAuthForm onClose={onClose} />
 * )
 */
function GAuthForm({ onClose }) {
  const { firebase, user, updateCurrentActionsUser } = useUser();
  const [QRCode, setQRCode] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  /**
   * UseEffect to set the qrcode and secret and to show it at mount
   * @function
   */
  useEffect(() => {
    const { secret, gAuthSecret, qrCodeURL } = getAuthQrCode(user.data.email);
    setQRCode({ secret, gAuthSecret, qrCodeURL });
    window.recaptchaVerifier = firebase.newRecaptchaVerifier(
      "recaptcha-gauth",
      {
        size: "invisible",
        callback: (resp) => {
          // console.log(resp);
        },
        error: (err) => {
          // console.log(err);
        },
      }
    );
    window.recaptchaVerifier.render();
    // eslint-disable-next-line
  }, []);

  /**
   * function to verificate the code from google authenticator
   * @function
   * @param {{verificationCode: string}} verificationCode code from the input to verificate google authenticator
   */
  const verifyCode = async ({ verificationCode, verificationPassword }) => {
    console.log(verificationPassword);
    swal.fire({
      title: "Verifying",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });
    let gAuthVerifyCode = verifyAuthCode(QRCode.secret, verificationCode);
    if (gAuthVerifyCode) {
      let changeUserData = {
        pwd: verificationPassword,
        gAuth: true,
        gAuthSecret: QRCode.secret,
        twoFa: true,
        sms: false,
      };
      await updateCurrentActionsUser(changeUserData)
        .then(async () => {
          await swal
            .fire({
              icon: "success",
              title: "Google Authenticator it's activated",
              text: "Please log in again",
              timer: 1500,
              showConfirmButton: false,
            })
            .then(() => {
              onClose();
            });
        })
        .catch((err) => {
          swal.fire({
            icon: "error",
            title: "There was an error",
            text: err.message,
          });
        });
    } else {
      swal.fire({
        icon: "error",
        title: "Invalid code",
      });
    }
  };

  /**
   * function to copy the secret of gauth
   * @function
   */
  const copySecret = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      text: "your secret code was successfully copied",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <h3>Google Authenticator</h3>
      <div id="recaptcha-gauth" style={{ display: "inline-block" }} />
      {QRCode && (
        <>
          <div className="article">
            <div className="input-form cols-top cols">
              <div className="form-group col col--size6">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={QRCode.qrCodeURL} alt="QR Code" />
                </div>
              </div>
              <div className="col col--size6">
                <ol>
                  <li>Download and install Google Authenticator</li>
                  <div>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginRight: "10px",
                        marginBottom: "10px",
                        display: "inline-block",
                      }}
                    >
                      <img
                        width={113}
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/png_icon_google.png"
                        }
                        alt="Google Play"
                      />
                    </a>
                    <a
                      href="https://itunes.apple.com/es/app/google-authenticator/id388497605"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginRight: "10px",
                        marginBottom: "10px",
                        display: "inline-block",
                      }}
                    >
                      <img
                        width={100}
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/png_icon_apple.png"
                        }
                        alt="App Store"
                      />
                    </a>
                  </div>
                  <li>Scan this barcode</li>
                  <li>Enter the verification code</li>
                </ol>
                <div className="input-form">
                  <form>
                    <div className="form-group">
                      <input
                        className="styled"
                        name="verificationCode"
                        type="text"
                        id="verificationCode"
                        placeholder={"Verification code"}
                        ref={register}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="verificationCode"
                        render={({ message }) => (
                          <small>
                            <p style={{ lineHeight: "1.5" }}>{message}</p>
                          </small>
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="styled"
                        name="verificationPassword"
                        type="password"
                        id="verificationPassword"
                        placeholder="Password"
                        ref={register}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="verificationPassword"
                        render={({ message }) => (
                          <small>
                            <p style={{ lineHeight: "1.5" }}>{message}</p>
                          </small>
                        )}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn--blue text-center"
                        type="submit"
                        onClick={handleSubmit(verifyCode)}
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="input-form">
              <div className="form-group">
                <div className="form-group spacer line"></div>
                <div className="indicator red text-center">
                  This is your secret key, copy and keep it safe
                </div>
                <div className="indicator text-center">
                  <CopyToClipboard
                    text={QRCode.gAuthSecret}
                    onCopy={copySecret}
                  >
                    <p
                      style={{
                        lineBreak: "anywhere",
                        lineHeight: "initial",
                        cursor: "pointer",
                      }}
                    >
                      {QRCode.gAuthSecret}
                    </p>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GAuthForm;
