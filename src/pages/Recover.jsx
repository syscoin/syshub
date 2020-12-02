import React from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import FormRecover from "../components/recover/formRecover";

/**
 * Recover Password page that shows at /recover
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
const Recover = ({ t }) => {
  return (
    <Background>
      <BackgroundInner/>
      <main className="section recoverPage">
        <MetaTags>
          <title> {t("register.meta.title")} </title>
          <meta name="keywords" content={t("register.meta.keywords")}/>
          <meta name="description" content={t("register.meta.description")}/>
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading="Recover your password" />
                      <FormRecover />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Background>
  )
}

export default withTranslation()(Recover);
