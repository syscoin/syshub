import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/partials/Title";
import UserInfo from "../components/partials/UserInfo";
import UserMasternodes from "../components/partials/UserMasternodes";
import { Route, Switch, useRouteMatch } from "react-router";
import AddMasternodes from "../components/partials/AddMasternodes";
import UserDelete from "../components/partials/UserDelete";

function Profile(props) {
  let { path } = useRouteMatch();

    const { t } = props;
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

            <Route path={`${path}/add-masternodes`}>
              <AddMasternodes />
            </Route>
          </Switch>
        </main>
      </Background>
    );
  
}

export default withTranslation()(Profile);
