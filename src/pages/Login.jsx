import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
import Title from "./partials/Title";


class Login extends Component {
  onLogin = (loginData) => {
    console.log(loginData)
  }

  render() {
    const { t } = this.props;
    return (
      <Background>
        <BackgroundInner />
        <main className="section loginPage">
          <MetaTags>
            <title> {t("login.meta.title")} </title>
            <meta name="keywords" content={t("login.meta.keywords")} />
            <meta name="description" content={t("login.meta.description")} />
          </MetaTags>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <section className="article">
                  <div className="cols">
                    <div className="col col--size-12">
                      <div className="article__content article__content--pull-left text-center">
                        <Title heading="Login" />
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
                            <Link to="/recover">Forgot your password?</Link> <br />
                            <Link to="/register">Dont have an account?</Link>
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

export default withTranslation()(Login);
