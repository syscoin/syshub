import React from "react";
import { withTranslation } from "react-i18next";

import MetaTags from "react-meta-tags";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import { MasternodeRegister } from "../components/masternodes/MasternodeRegister";
import MasternodeTable from "../components/masternodes/MasternodeTable";

/**
 * Masternodes page that shows at /masternodes
 * @component
 * @category Pages
 */
const Masternodes = ({ t }) => {
  let { path } = useRouteMatch();

  return (
    <Background>
      <BackgroundInner />
      <main className="section checkPage">
        <MetaTags>
          <title>{t("check.meta.title")}</title>
          <meta name="keywords" content={t("check.meta.keywords")} />
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Switch>
                        <Route exact path={path}>
                          <Title heading={t("check.title")} />
                          <MasternodeTable path={path} />
                        </Route>
                        <Route path={`${path}/masternode-registration`}>
                          <MasternodeRegister />
                        </Route>
                        <Route path={path}>
                          <Redirect to={path} />
                        </Route>
                      </Switch>
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
};

export default withTranslation()(Masternodes);
