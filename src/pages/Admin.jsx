import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router";

import { useUser } from "../context/user-context";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import SubTitle from "../components/global/SubTitle";
import Loading from "../components/global/Loading";
import UsersTable from "../components/admin/UsersTable";
import ProposalsTable from "../components/admin/ProposalsTable";


/**
 * Admin page that shows at /admin
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
const Admin = ({ t }) => {
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
              <div className="shell-large">
                <div className="section__body">
                  <div className="articles">
                    <section className="article">
                      <div className="cols">
                        <div className="col col--size-12">
                          <div className="article__content article__content--pull-left">
                            <Title heading={t('admin.heading')} />
                            <UsersTable />
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="article">
                      <div className="cols">
                        <div className="col col--size-12">
                          <div className="article__content article__content--pull-left">
                            <SubTitle heading={t('admin.proposals.heading')} />
                            <ProposalsTable />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
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
