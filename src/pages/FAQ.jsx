import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";

const FAQ = ({t}) => {
  return (
    <>
      <Background>
        <BackgroundInner type="B" />
        <main className="section faqPage">
          <MetaTags>
            <title> {t("faq.meta.title")} </title>
            <meta name="keywords" content={t("faq.meta.keywords")} />
          </MetaTags>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <section className="article">
                  <div className="cols">
                    <div className="col col--size-12">
                      <div className="article__content article__content--pull-left">
                        <Title heading={t('faq.heading')} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </Background>
    </>
  );
};

export default withTranslation()(FAQ);
