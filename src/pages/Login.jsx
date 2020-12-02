import React, {useEffect, useState} from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";

import {useUser} from '../context/user-context';

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import LoginForm from "../components/login/LoginForm";
import {Link, useHistory} from "react-router-dom";
import {get2faInfoUser} from "../utils/request";
import CustomModal from "../components/global/CustomModal";
import SMSTwoFAFormLogin from "../components/login/SMSTwoFAFormLogin";
import GAuthTwoFAFormLogin from "../components/login/GAuthTwoFAFormLogin";
import {decryptAes} from "../utils/encryption";
import {verifyAuthCode} from "../utils/twoFaAuthentication";
import swal from "sweetalert2";

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
    }
  }, [])

  /**
   * Function that verifies the user2fa and proceeds to open the 2faModal; in case 2fa isn't active, it signs in the user 
   * @param {{email:string, password: string}} loginData Login data received from LoginForm it has email and password
   */
  const loginToApp = async (loginData) => {
    setSubmitting(true);
    try {
      let user = await loginUser(loginData);
      let user2fa = await get2faInfoUser(user.uid)
      if (user2fa.twoFa === true && user2fa.sms === true) {
        let phoneProvider = await loginWithPhoneNumber(user.phoneNumber, window.recaptchaVerifier);
        setUserSignInSms(phoneProvider);
        setOpenSMS2Fa(true);
        setSubmitting(false);
      } else if (user2fa.twoFa === true && user2fa.gAuth === true) {
        setUserSignInGAuth({ ...user, secret: user2fa.gAuthSecret });
        setOpenGAuth2Fa(true);
        setSubmitting(false);
      } else {
        setUserDataLogin(user)
        history.push('/governance');
      }
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
      return setSubmitting(false);
    }
  }

  /**
   * Function that verifies the GAuth verification code and proceeds to login 
   * @param {string} gAuthCode gAuthcode submitted by the user in the 2fa modal
   */
  const verifyGAuth = async ({ gAuthCode }) => {
    swal.fire({
      title: 'Verifying',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    })
    let secret = decryptAes(userSignInGAuth.secret, process.env.REACT_APP_ENCRYPT_KEY_DATA);
    let h = decryptAes(secret, process.env.REACT_APP_ENCRYPT_KEY_DATA);
    let isVerified = verifyAuthCode(h, gAuthCode);

    if (isVerified) {
      setOpenGAuth2Fa(false);
      await swal.fire({
        icon: "success",
        title: "Code verified",
        timer: 2000,
        showConfirmButton: false
      });

      setUserDataLogin(userSignInGAuth);
      history.push('/governance');
    } else {
      swal.fire({
        icon: "error",
        title: "Invalid code"
      });
    }
  }

  /**
   * Function that verifies the SMS verification code and proceeds to login 
   * @param {string} phoneCode phoneCode submitted by the user in the 2fa modal
   */
  const verifyPhone = async ({ phoneCode }) => {
    swal.fire({
      title: 'Verifying',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    })
    try {
      let { user } = await userSignInSms.confirm(phoneCode).catch(err => {
        throw err
      });
      setOpenSMS2Fa(false);
      await swal.fire({
        icon: "success",
        title: "Code verified",
        timer: 2000,
        showConfirmButton: false
      });
      setUserDataLogin(user);
      history.push('/governance');
      
    } catch (error) {
      console.log(error)
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    }
  }
  
  return (
    <Background>
      <BackgroundInner/>
      <main className="section loginPage">
        <MetaTags>
          <title> {t("login.meta.title")} </title>
          <meta name="keywords" content={t("login.meta.keywords")}/>
          <meta name="description" content={t("login.meta.description")}/>
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading={t("login.data.heading")}/>

                      <LoginForm onLogin={loginToApp} submitting={submitting}/>
                      <div className="input-cont">
                        <Link to="/recover">Forgot your password?</Link> <br/>
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
      <CustomModal
        open={openSMS2Fa}
        onClose={() => setOpenSMS2Fa(false)}>
        <SMSTwoFAFormLogin userSignInSms={verifyPhone} closeModal={() => setOpenSMS2Fa(false)} />
      </CustomModal>
      <CustomModal
        open={openGAuthFa}
        onClose={() => setOpenGAuth2Fa(false)}>
        <GAuthTwoFAFormLogin userSignInGAuth={verifyGAuth} />
      </CustomModal>
    </Background>
  );
}

export default withTranslation()(Login);
