import React, { useEffect, useState } from "react";
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
  const [openSMS2Fa, setOpenSMS2Fa] = useState(false);
  const [openGAuthFa, setOpenGAuth2Fa] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userSignInSms, setUserSignInSms] = useState({});
  const [userSignInGAuth, setUserSignInGAuth] = useState("");

  useEffect(() => {
    return () => {
      setSubmitting(false);
      setOpenGAuth2Fa(false);
      setOpenSMS2Fa(false);
    };
  }, []);

  /**
   * Function that verifies the user2fa and proceeds to open the 2faModal; in case 2fa isn't active, it signs in the user
   * @param {{email:string, password: string}} loginData Login data received from LoginForm it has email and password
   */
  const loginToApp = async (loginData) => {
    swal.fire({
      title: "Submitting",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });
    setSubmitting(true);
    try {
      let user = await loginUser(loginData);
      createSeed(loginData.password);
      let user2fa = await get2faInfoUser(user.uid);
      if (user2fa.twoFa === true && user2fa.sms === true) {
        swal.close();
        let phoneProvider = await loginWithPhoneNumber(
          user.phoneNumber,
          window.recaptchaVerifier
        );
        setUserSignInSms(phoneProvider);
        setOpenSMS2Fa(true);
        setSubmitting(false);
      } else if (user2fa.twoFa === true && user2fa.gAuth === true) {
        swal.close();
        setUserSignInGAuth({ ...user, secret: user2fa.gAuthSecret });
        setOpenGAuth2Fa(true);
        setSubmitting(false);
      } else {
        await swal.fire({
          icon: "success",
          title: "Logged in",
          timer: 2000,
          showConfirmButton: false,
        });
        setUserDataLogin(user);
        history.push("/governance");
      }
    } catch (error) {
      deleteUserData();
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      removeSeed();
      return setSubmitting(false);
    }
  };

  /**
   * Function that verifies the GAuth verification code and proceeds to login
   * @param {string} gAuthCode gAuthcode submitted by the user in the 2fa modal
   */
  const verifyGAuth = async ({ gAuthCode }) => {
    swal.fire({
      title: "Verifying",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });

    verifyGauthCode(gAuthCode)
      .then(() => {
        setOpenGAuth2Fa(false);
        swal.fire({
          icon: "success",
          title: "Logged in",
          text: "Code verified",
          timer: 2000,
          showConfirmButton: false,
        });
        setUserDataLogin(userSignInGAuth);
        history.push("/governance");
      })
      .catch((err) => {
        swal.fire({
          icon: "error",
          title: "Invalid code",
        });
      });
  };

  /**
   * Function that verifies the SMS verification code and proceeds to login
   * @param {string} phoneCode phoneCode submitted by the user in the 2fa modal
   */
  const verifyPhone = async ({ phoneCode }) => {
    swal.fire({
      title: "Verifying",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      },
    });
    try {
      let { user } = await userSignInSms.confirm(phoneCode).catch((err) => {
        throw err;
      });
      setOpenSMS2Fa(false);
      await swal.fire({
        icon: "success",
        title: "Logged in",
        text: "Code verified",
        timer: 2000,
        showConfirmButton: false,
      });
      setUserDataLogin(user);
      history.push("/governance");
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
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
      <CustomModal open={openSMS2Fa} onClose={() => setOpenSMS2Fa(false)}>
        <SMSTwoFAFormLogin
          userSignInSms={verifyPhone}
          closeModal={() => setOpenSMS2Fa(false)}
        />
      </CustomModal>
      <CustomModal open={openGAuthFa} onClose={() => setOpenGAuth2Fa(false)}>
        <GAuthTwoFAFormLogin userSignInGAuth={verifyGAuth} />
      </CustomModal>
    </Background>
  );
}

export default withTranslation()(Login);
