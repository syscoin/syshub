import React, {useState, useEffect} from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";
import {Link, useHistory} from "react-router-dom";

import {useUser} from '../context/user-context';


import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/partials/Title";
import SignupForm from "../components/partials/SignupForm";

function Signup(props) {
  const history = useHistory();
  const {signupUser, firebase} = useUser();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const registerToApp = async (registerData) => {
    setSubmitting(true);
    if (!error) setError(null);

    const response = await signupUser(registerData);
    if (response.error) {
      setError(response.error);
      return setSubmitting(false);
    }

    history.push('/profile');
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
      <main className="section registerPage">
        <MetaTags>
          <title> {t("signup.meta.title")} </title>
          <meta name="keywords" content={t("signup.meta.keywords")}/>
          <meta name="description" content={t("signup.meta.description")}/>
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading={t("signup.data.heading")}/>
                      {error && (
                        <p>{error.message}</p>
                      )}
                      <SignupForm onSignup={registerToApp} submitting={submitting}/>

                      <div className="input-cont">
                        <Link to="/login">Already have an account?</Link>
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

export default withTranslation()(Signup);
