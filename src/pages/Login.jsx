import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InnerBanner from "../parts/InnerBanner";
import LoginForm from "./partials/LoginForm";


class Login extends Component {
  onLogin = (loginData) => {
    console.log(loginData)
  }

  render() {
    const { t } = this.props;
    return (
      <main className="loginPage">
        <MetaTags>
          <title> {t("login.meta.title")} </title>{" "}
          <meta name="keywords" content={t("login.meta.keywords")} />{" "}
          <meta name="description" content={t("login.meta.description")} />{" "}
        </MetaTags>{" "}
        <InnerBanner heading="Login" />
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 order-2 order-lg-1">
              <LoginForm onLogin={this.onLogin}/>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 mb-5 mb-lg-0 order-1 order-lg-2">
              <div className="about-img text-center text-lg-right">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/banner_img6.png"}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <div className="article">
                  <div className="cols">
                    <div className="col col--size-12">
                      <div className="article__content article__content--pull-left text-center">
                        <h2 className="article__title title-border title-border--blue">Login</h2>

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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default withTranslation()(Login);
