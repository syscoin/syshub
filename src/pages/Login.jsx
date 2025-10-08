import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";

import { useUser } from "../context/user-context";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import LoginForm from "../components/login/LoginForm";
import { Link, useHistory } from "react-router-dom";
import { get2faInfoUser, verifyGauthCode } from "../utils/request";
import CustomModal from "../components/global/CustomModal";
import SMSTwoFAFormLogin from "../components/login/SMSTwoFAFormLogin";
import GAuthTwoFAFormLogin from "../components/login/GAuthTwoFAFormLogin";
import { createSeed, removeSeed } from "../utils/encryption";
import swal from "sweetalert2";
import { deleteUserData } from "../utils/auth-token";

/**
 * Login page showed at /login
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
function Login({ t }) {
  const history = useHistory();
  const { loginUser, loginWithPhoneNumber, setUserDataLogin } = useUser();
  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [active2FAMethod, setActive2FAMethod] = useState(null); // 'sms' | 'gauth' | null

  // 2FA session state (in-memory, only during current login flow)
  const [pendingUser, setPendingUser] = useState(null); // firebase user from base login
  const [pendingPassword, setPendingPassword] = useState(""); // used to create seed after 2FA
  const [smsConfirmation, setSmsConfirmation] = useState(null); // result from signInWithPhoneNumber
  const [gauthContext, setGauthContext] = useState(null); // { ...user, secret }

  useEffect(() => {
    return () => {
      setSubmitting(false);
      setActive2FAMethod(null);
    };
  }, []);

  // Alert helpers
  const showLoading = useCallback((title) => {
    swal.fire({
      title: title || "Processing",
      showConfirmButton: false,
      willOpen: () => swal.showLoading(),
    });
  }, []);

  const showSuccess = useCallback(async (message = "Logged in") => {
    await swal.fire({
      icon: "success",
      title: message,
      timer: 2000,
      showConfirmButton: false,
    });
  }, []);

  const showError = useCallback((message = "Error") => {
    swal.fire({ icon: "error", title: "Error", text: message });
  }, []);

  // Finalize login: persist and navigate
  const finalizeLogin = useCallback(
    async (user) => {
      if (pendingPassword) {
        createSeed(pendingPassword);
      }
      setUserDataLogin(user);
      history.push("/governance");
    },
    [history, pendingPassword, setUserDataLogin]
  );

  /**
   * Function that verifies the user2fa and proceeds to open the 2faModal; in case 2fa isn't active, it signs in the user
   * @param {{email:string, password: string}} loginData Login data received from LoginForm it has email and password
   */
  const loginToApp = async (loginData) => {
    showLoading("Submitting");
    setSubmitting(true);
    try {
      const user = await loginUser(loginData);
      // store ephemeral data for post-2FA persistence
      setPendingPassword(loginData.password);
      setPendingUser(user);

      const user2fa = await get2faInfoUser(user.uid, user.accessToken);
      const hasSms2FA = user2fa.twoFa === true && user2fa.sms === true;
      const hasGAuth2FA = user2fa.twoFa === true && user2fa.gAuth === true;

      if (hasSms2FA) {
        swal.close();
        const confirmation = await loginWithPhoneNumber(
          user.phoneNumber,
          window.recaptchaVerifier
        );
        setSmsConfirmation(confirmation);
        setActive2FAMethod("sms");
        setSubmitting(false);
        return;
      }

      if (hasGAuth2FA) {
        swal.close();
        setGauthContext({ ...user, secret: user2fa.gAuthSecret });
        setActive2FAMethod("gauth");
        setSubmitting(false);
        return;
      }

      // No 2FA: finalize immediately
      await showSuccess("Logged in");
      createSeed(loginData.password);
      await finalizeLogin(user);
    } catch (error) {
      deleteUserData();
      showError(error.message);
      removeSeed();
      setSubmitting(false);
    }
  };

  /**
   * Function that verifies the GAuth verification code and proceeds to login
   * @param {string} gAuthCode gAuthcode submitted by the user in the 2fa modal
   */
  const verifyGAuth = async ({ gAuthCode }) => {
    showLoading("Verifying");
    try {
      await verifyGauthCode(gAuthCode, pendingUser?.accessToken);
      setActive2FAMethod(null);
      await showSuccess("Logged in");
      await finalizeLogin(gauthContext);
    } catch (err) {
      showError("Invalid code");
    }
  };

  /**
   * Function that verifies the SMS verification code and proceeds to login
   * @param {string} phoneCode phoneCode submitted by the user in the 2fa modal
   */
  const verifyPhone = async ({ phoneCode }) => {
    showLoading("Verifying");
    try {
      const { user } = await smsConfirmation.confirm(phoneCode);
      setActive2FAMethod(null);
      await showSuccess("Logged in");
      await finalizeLogin(user);
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <Background>
      <BackgroundInner />
      <main className="section loginPage">
        <MetaTags>
          <title> {t("login.meta.title")} </title>
          <meta name="keywords" content={t("login.meta.keywords")} />
          {/* <meta name="description" content={t("login.meta.description")}/> */}
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading={t("login.data.heading")} />

                      <LoginForm onLogin={loginToApp} submitting={submitting} />
                      <div className="input-cont">
                        <Link to="/recover">Forgot your password?</Link> <br />
                        <Link to="/signup">Don't have an account?</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <CustomModal open={active2FAMethod === "sms"} onClose={() => setActive2FAMethod(null)}>
        <SMSTwoFAFormLogin
          userSignInSms={verifyPhone}
          closeModal={() => setActive2FAMethod(null)}
        />
      </CustomModal>
      <CustomModal open={active2FAMethod === "gauth"} onClose={() => setActive2FAMethod(null)}>
        <GAuthTwoFAFormLogin userSignInGAuth={verifyGAuth} />
      </CustomModal>
    </Background>
  );
}

export default withTranslation()(Login);
