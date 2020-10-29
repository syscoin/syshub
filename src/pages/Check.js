import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import MetaTags from "react-meta-tags";
import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/partials/Title";
import MasternodeTable from "../components/partials/MasternodeTable";


export class Check extends Component {
  
  render() {
    const { t } = this.props;
    
    return (
      <Background>
        <BackgroundInner />
        <main className="section checkPage">
          <MetaTags>
            <title>{t("check.meta.title")}</title>
            <meta name="keywords" content={t("check.meta.keywords")} />
            <meta name="description" content={t("check.meta.description")} />
          </MetaTags>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <section className="article">
                  <div className="cols">
                    <div className="col col--size-12">
                      <div className="article__content article__content--pull-left text-center">
                        <Title heading={t("check.title")} />
                        <MasternodeTable />
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

export default withTranslation()(Check);
