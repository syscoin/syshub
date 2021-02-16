import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";

import { useUser } from "../context/user-context";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Loading from "../components/global/Loading";
import UsersTable from "../components/admin/UsersTable";
import ProposalsTable from "../components/admin/ProposalsTable";
import FaqTable from "../components/admin/FaqTable";
import FaqForm from "../components/admin/FaqForm";

/**
 * Admin page that shows at /admin
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
const Admin = ({ t }) => {
  const { userAdmin, loadingAdmin } = useUser();
  let { path } = useRouteMatch();

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
              </MetaTags>
              <Switch>
                <Route exact path="/admin">
                  <div className="shell-large">
                    <div className="section__body">
                      <div className="articles">
                        <section className="article">
                          <div className="cols">
                            <div className="col col--size-12">
                              <div className="article__content article__content--pull-left">
                                <UsersTable />
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="article">
                          <div className="cols">
                            <div className="col col--size-12">
                              <div className="article__content article__content--pull-left">
                                <ProposalsTable />
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="article">
                          <div className="cols">
                            <div className="col col--size-12">
                              <div className="article__content article__content--pull-left">
                                <FaqTable />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Route>
                <Route path={[`/admin/faq`, `/admin/faq/:id`]} exact>
                  <div className="shell-large">
                    <div className="section__body">
                      <div className="articles">
                        <section className="article">
                          <div className="cols">
                            <div className="col col--size-12">
                              <div className="article__content article__content--pull-left">
                                <FaqForm />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Route>
                <Route path="*">
                  <Redirect to="/admin" />
                </Route>
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
