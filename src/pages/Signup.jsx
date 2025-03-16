import React, {useState} from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";
import {Link, useHistory} from "react-router-dom";

import {useUser} from '../context/user-context';

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import SignupForm from "../components/signup/SignupForm";
import swal from "sweetalert2";
import {createSeed, removeSeed} from "../utils/encryption";

/**
 * Signup page showed at /signup
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
function Signup({ t }) {
  const history = useHistory();
  const { signupUser } = useUser();

  const [submitting, setSubmitting] = useState(false);


  /**
   * Function that proceeds to create the user and signups
   * @param {{email: string, password: string}} registerData register data received from SignupForm it has email and password
   */
  const registerToApp = async (registerData) => {
    swal.fire({
      title: 'Submitting',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    setSubmitting(true);
    
    try {
      await signupUser(registerData).catch(err => {
        throw err;
      });
      createSeed(registerData.password);
      swal.fire({
        icon: "success",
        title: "Your account was created",
        timer: 2000,
        showConfirmButton: false
      });
      history.push('/profile');
    } catch (error) {
      setSubmitting(false);
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
      removeSeed();
    }

  }

  return (
    <Background>
      <BackgroundInner/>
      <main className="section registerPage">
        <MetaTags>
          <title> {t("signup.meta.title")} </title>
          <meta name="keywords" content={t("signup.meta.keywords")}/>
          {/* <meta name="description" content={t("signup.meta.description")}/> */}
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading={t("signup.data.heading")}/>
                      
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
