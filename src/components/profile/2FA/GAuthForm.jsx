import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import swal from "sweetalert2";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  getAuthQrCode,
  verifyAuthCode,
} from "../../../utils/twoFaAuthentication";
import { useUser } from "../../../context/user-context";
import { encryptAes } from "../../../utils/encryption";

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .required("The verification code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be 6 digits")
    .max(6, "Must be 6 digits"),
});

export default function GAuthForm({ GAuth }) {
  const { firebase, user, logoutUser, updateCurrentActionsUser } = useUser();
  const [QRCode, setQRCode] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const { secret, gAuthSecret, qrCodeURL } = getAuthQrCode(user.data.email);
    setQRCode({ secret, gAuthSecret, qrCodeURL });
    window.recaptchaVerifier = firebase.newRecaptchaVerifier("recaptcha", {
      size: "invisible",
      callback: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.recaptchaVerifier.render();
  }, []);

  const verifyCode = async ({ verificationCode }) => {
    let gAuthVerifyCode = verifyAuthCode(QRCode.secret, verificationCode);
    if (gAuthVerifyCode) {
      let gAuthSecretEncrypt = encryptAes(QRCode.gAuthSecret);
      let changeUserData = {
        gAuth: true,
        gAuthSecret: gAuthSecretEncrypt,
        twoFa: true,
      };
      await updateCurrentActionsUser(changeUserData).catch((err) => {
        throw err;
      });
      swal.fire({
        icon: "success",
        title: "Vefify",
        text: "your account is verifed",
        timer: 2000,
      });
      await logoutUser();
    } else {
      console.log("es falso");
    }
  };

  const copySecret = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      text: "your secret code was succesfully copied",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <h3>Google Authenticator</h3>
      <div id="recaptcha" style={{ display: "inline-block" }} />
      {QRCode && (
        <>
          <div className="article">
            <div className="cols-top cols">
              <div className="col col--size6">
                <img src={QRCode.qrCodeURL} alt="" />
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
                          "assets/images/png_icon_google.png"
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
                          "assets/images/png_icon_apple.png"
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

                    <button
                      className="btn btn--blue"
                      type="submit"
                      onClick={handleSubmit(verifyCode)}
                    >
                      Verify
                    </button>
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
