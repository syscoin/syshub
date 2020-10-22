import React, { useEffect, useState } from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";

import { useUser } from '../context/user-context';

import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
import Title from "./partials/Title";
import LoginForm from "./partials/LoginForm";
import {Link, useHistory} from "react-router-dom";


function Login (props) {
  const history = useHistory();
  const { loginUser } = useUser();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loginToApp = async (loginData) => {
    setSubmitting(true);
    if (!error) setError(null);
    try {
      await loginUser(loginData);
      
      history.push('/governance');
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
                        <Title heading={t("login.data.heading")} />
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

      </Background>
    );
}

export default withTranslation()(Login);
