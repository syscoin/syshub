import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import InnerBanner from "../parts/InnerBanner";
import { withTranslation } from "react-i18next";

class Login extends Component {
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
      </main>
    );
  }
}

export default withTranslation()(Login);
