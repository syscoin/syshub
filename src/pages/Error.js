import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { withTranslation } from "react-i18next";
import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
export class Error extends Component {
  render() {
    const { t } = this.props;
    return (
      <Background>
        <BackgroundInner />
        <main className="section errorPage">
          <MetaTags>
            <title>{t("error.meta.title")}</title>
            <meta name="keywords" content={t("error.meta.keywords")} />
            <meta name="description" content={t("error.meta.description")} />
          </MetaTags>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <section className="section_governance">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <div className="custom__about__left text-white text-center text-lg-left">
                          <h3 className="text-white text-center">{t("error.title")}</h3>
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
}

export default withTranslation()(Error);
