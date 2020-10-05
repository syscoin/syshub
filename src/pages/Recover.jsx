import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";

import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
import Title from "./partials/Title";

class Recover extends Component {
  onRegister = (registerData) => {
    console.log(registerData);
  };
  render() {
    const { t } = this.props;
    return (
      <Background>
        <BackgroundInner />
        <main className="section recoverPage">
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
                        <Title heading="Recover your password" />
                        <form className="input-form centered">
                          <input className="styled-round" type="text" placeholder="Email" />

                          <div className="input-cont">
                            Captcha
                          </div>

                          <div className="input-cont">
                            <button className="btn btn--blue">Send</button>
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

export default withTranslation()(Recover);
