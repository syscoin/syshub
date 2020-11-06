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
import SMS2FAForm from "../components/profile/2FA/SMS2FAForm";
import GAuthForm from "../components/profile/2FA/GAuthForm";


function Login(props) {
  const history = useHistory();
  const {firebase, loginUser} = useUser();
  const [openSMS, setOpenSMS] = useState(false);
  const [openGAuth, setOpenGAuth] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loginToApp = async (loginData) => {
    setSubmitting(true);
    if (!error) setError(null);
    try {
      let {user} = await firebase.loginWithEmailAndPassword(loginData)
      // await loginUser(loginData);
      console.log(user)
      let user2fa = await get2faInfoUser(user.uid)
      console.log(user2fa)
      if (user2fa.twoFa === true) {
        if (user2fa.sms === true) {
          setOpenSMS(true)
        }
        if (user2fa.gAuth === true) {
          setOpenGAuth(true)
        }
      } else {
        console.log('no 2fa')
      }
      // history.push('/governance');
    } catch (error) {
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
        open={openSMS}
        onClose={() => setOpenSMS(false)}
      >
        <SMS2FAForm/>
      </CustomModal>
      <CustomModal
        open={openGAuth}
        onClose={() => setOpenGAuth(false)}
      >
        <GAuthForm/>
      </CustomModal>
    </Background>
  );
}

export default withTranslation()(Login);
