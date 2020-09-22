import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import InnerBanner from "../parts/InnerBanner";
import { withTranslation } from "react-i18next";
import RegisterForm from "./partials/RegisterForm";

class Register extends Component {
  onRegister = (registerData) => {
    console.log(registerData)
  }
  render() {
    const { t } = this.props;
    return (
      <main className="registerPage">
        <MetaTags>
          <title> {t("register.meta.title")} </title>{" "}
          <meta name="keywords" content={t("register.meta.keywords")} />{" "}
          <meta name="description" content={t("register.meta.description")} />{" "}
        </MetaTags>{" "}
        <InnerBanner heading="Create an account" />
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 order-2 order-lg-1">
              <RegisterForm onRegister={this.onRegister} />
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 mb-5 mb-lg-0 order-1 order-lg-2">
              <div className="about-img text-center text-lg-right">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/header-img1.png"}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default withTranslation()(Register);
