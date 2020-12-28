import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";

import { useUser } from "../context/user-context";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import Loading from "../components/global/Loading";

/**
 * Admin page that shows at /admin
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
const Admin = ({ t }) => {
  let { path } = useRouteMatch();
  const { userAdmin, loadingAdmin } = useUser();

  return (
    <>
      {!loadingAdmin ? (
        userAdmin === "admin" ? (
          <Background>
            <BackgroundInner />
            <main className="section adminPage">
              <MetaTags>
                <title> {t("admin.meta.title")} </title>
                <meta name="keywords" content={t("admin.meta.keywords")} />
                <meta
                  name="description"
                  content={t("admin.meta.description")}
                />
              </MetaTags>
              <Switch>
                <Route path={path}>
                  <div className="shell-large">
                    <div className="section__body">
                      <div className="articles">
                        <section className="article">
                          <div className="cols">
                            <div className="col col--size-12">
                              <div className="article__content article__content--pull-left text-center">
                                <Title heading="Admin panel" />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Route>
                <Route exact path={`${path}/users-administration`}>
                  <div className="shell-large">
                    <div className="section__body">
                      <div className="articles">
                        <section className="article">
                          <div className="cols">
                            <div className="col col--size-12">
                              <div className="article__content article__content--pull-left text-center">
                                <Title heading={t("profile.data.heading")} />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Route>

                <Route exact path={`${path}/proposals-administration`}></Route>
              </Switch>
            </main>
          </Background>
        ) : (
          <Redirect to="/profile" />
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default withTranslation()(Admin);
