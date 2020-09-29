import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
import Title from "./partials/Title";

class Register extends Component {
  onRegister = (registerData) => {
    console.log(registerData);
  };
  render() {
    const { t } = this.props;
    return (
      <Background>
        <BackgroundInner />
        <main className="section registerPage">
          <MetaTags>
            <title> {t("register.meta.title")} </title>
            <meta name="keywords" content={t("register.meta.keywords")} />
            <meta name="description" content={t("register.meta.description")} />
          </MetaTags>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <section className="article">
                  <div className="cols">
                    <div className="col col--size-12">
                      <div className="article__content article__content--pull-left text-center">
                        <Title heading="Register" />
                        <form className="input-form centered">
                          <input className="styled-round" type="text" placeholder="Username" />
                          <input className="styled-round" type="password" placeholder="Password" />

                          <div className="input-cont">
                            Captcha
                          </div>

                          <div className="input-cont">
                            <button className="btn btn--blue">Login</button>
                          </div>

                          <div class="input-cont">
                            <Link to="/login">Already have an account?</Link>
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
    );
  }
}

export default withTranslation()(Register);
