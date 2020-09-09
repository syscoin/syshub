import React, { Component } from "react";
import { MetaTags } from "react-meta-tags";
import Banner from "../parts/Banner";
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
        <Banner />
        <div>HOLA</div>
      </main>
    );
  }
}

export default withTranslation()(Login);
