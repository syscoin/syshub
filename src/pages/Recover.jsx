import React, {useEffect} from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";

import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
import Title from "./partials/Title";
import swal from "sweetalert2";
import {useUser} from "../context/user-context";

const Recover = (props) => {
  const {firebase} = useUser();

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha', {
      'callback': (response) => {
        console.log(response)
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    })
    window.recaptchaVerifier.render();
  })

  const passwordRecovery = () => {
    console.log('entro')
    swal.fire({
      title: 'Password Recovery',
      text:
        'Please provide your email that you used for this account. You will be sent an email with instructions for recovering your password.',
      icon: 'info',
      buttons: true,
      danger: false,
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Type your email',
          type: 'email'
        }
      }
    }).then(emailInput => {
      console.log(emailInput.value)
      // if (emailInput) {
      //   return firebase.passwordReset(emailInput);
      // } else {
      //   swal.fire({
      //     title: 'No email was given.',
      //     text: 'Please put an email in the input field.',
      //     icon: 'error'
      //   });
      // }
    })
    //   .then(() => {
    //   swal.fire({
    //     title: 'Success',
    //     text: 'An email has been sent.',
    //     icon: 'success'
    //   });
    // }).catch(err => {
    //   swal.fire({title: 'Oops...', text: `${err}`, icon: 'error'});
    // });
  }

  const {t} = props;
  return (
    <Background>
      <BackgroundInner/>
      <main className="section recoverPage">
        <MetaTags>
          <title> {t("register.meta.title")} </title>
          <meta name="keywords" content={t("register.meta.keywords")}/>
          <meta name="description" content={t("register.meta.description")}/>
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading="Recover your password"/>
                      <form className="input-form centered">
                        <input className="styled-round" type="text" placeholder="Email"/>

                        <div className="input-cont">
                          <div id={'recaptcha'} className={'recaptcha'}/>
                        </div>

                        <div className="input-cont">
                          <button type={'button'} className="btn btn--blue" onClick={passwordRecovery}>Send</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Background>
  )
}

export default withTranslation()(Recover);
