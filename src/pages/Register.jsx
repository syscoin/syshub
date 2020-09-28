import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import InnerBanner from "../parts/InnerBanner";
import { withTranslation } from "react-i18next";
import RegisterForm from "./partials/RegisterForm";
import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";

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
                <InnerBanner heading="Create an account" />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 order-2 order-lg-1">
                      <RegisterForm onRegister={this.onRegister} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Background>
    );
  }
}

export default withTranslation()(Register);
