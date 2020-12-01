import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import UserInfo from "../components/profile/UserInfo";
import UserMasternodes from "../components/profile/UserMasternodes";
import AddMasternodes from "../components/profile/AddMasternodes";
import UserDelete from "../components/profile/UserDelete";

/**
 * Profile page that shows at /profile
 * @component
 * @param {*} t t prop received from withTranslation
 */
function Profile({ t }) {
  let { path } = useRouteMatch();

    return (
      <Background>
        <BackgroundInner />
        <main className="section profilePage">
          <MetaTags>
            <title> {t("profile.meta.title")} </title>
            <meta name="keywords" content={t("profile.meta.keywords")} />
            <meta name="description" content={t("profile.meta.description")} />
          </MetaTags>
          <Switch>
            <Route exact path={path}>
              <div className="shell-large">
                <div className="section__body">
                  <div className="articles">
                    <section className="article">
                      <div className="cols">
                        <div className="col col--size-12">
                          <div className="article__content article__content--pull-left text-center">
                            <Title heading={t("profile.data.heading")} />
                            <UserInfo />
                            <UserDelete />
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="article">
                      <div className="cols">
                        <div className="col col--size-12">
                          <div className="article__content article__content--pull-left text-center">
                            <UserMasternodes />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </Route>

            <Route path={`${path}/add-masternodes`} exact>
              <AddMasternodes />
            </Route>
            <Route path={path}>
              <Redirect to={path} />
            </Route>
          </Switch>
        </main>
      </Background>
    );
  
}

export default withTranslation()(Profile);
