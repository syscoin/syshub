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
import SMSTwoFAFormLogin from "../components/profile/2FA/SMSTwoFAFormLogin";
import {decryptAes} from "../utils/encryption";
import {verifyAuthCode} from "../utils/twoFaAuthentication";
import GAuthTwoFAFormLogin from "../components/profile/2FA/GAuthTwoFAFormLogin";


function Login(props) {
  const history = useHistory();
  const {firebase, loginUser, loginWithPhoneNumber,setUserDataLogin} = useUser();
  const [openSMS2Fa, setOpenSMS2Fa] = useState(false);
  const [openGAuthFa, setOpenGAuth2Fa] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userSignInSms, setUserSignInSms] = useState({});
  const [userSignInGAuth, setUserSignInGAuth] = useState("");

  const loginToApp = async (loginData) => {
    setSubmitting(true);
    if (!error) setError(null);
    try {
      let user = await loginUser(loginData);
      let user2fa = await get2faInfoUser(user.uid)
      if (user2fa.twoFa === true && user2fa.sms === true) {
        let phoneProvider = await loginWithPhoneNumber(user.phoneNumber, window.recaptchaVerifier)
        setUserSignInSms(phoneProvider)
        setOpenSMS2Fa(true)
      } else if (user2fa.twoFa === true && user2fa.gAuth === true) {
        setUserSignInGAuth({...user, secret: user2fa.gAuthSecret})
        setOpenGAuth2Fa(true)
      } else {
        setUserDataLogin(user)
        history.push('/governance');
      }
    } catch
      (error) {
      setError(error);
      return setSubmitting(false);
    }

  }

  useEffect(() => {
    return () => {
      setSubmitting(false);
    }
  }, [])

  const {t} = props;
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
                      {error && (
                        <p>{error.message}</p>
                      )}
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
        <SMSTwoFAFormLogin userSignInSms={userSignInSms}/>
      </CustomModal>
      <CustomModal
        open={openGAuthFa}
        onClose={() => setOpenGAuth2Fa(false)}>
        <GAuthTwoFAFormLogin userSignInGAuth={userSignInGAuth}/>
      </CustomModal>
    </Background>
  );
}

export default withTranslation()(Login);
