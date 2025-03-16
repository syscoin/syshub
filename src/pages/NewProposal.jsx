import React from "react";
import { MetaTags } from "react-meta-tags";
import { withTranslation } from "react-i18next";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import Title from "../components/global/Title";
import ProposalForm from "../components/proposal/ProposalForm";

/**
 * Proposal page that shows at /create-proposal
 * @component
 * @category Pages
 * @param {*} props the T prop comes from withTranslation to use react-i18next
 */
function NewProposal({ t }) {

  return (
    <Background>
      <BackgroundInner />
      <main className="section proposalPage">
        <MetaTags>
          <title> {t("proposal.meta.title")} </title>
          <meta name="keywords" content={t("proposal.meta.keywords")} />
          {/* <meta name="description" content={t("proposal.meta.description")} /> */}
        </MetaTags>
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content article__content--pull-left text-center">
                      <Title heading={t('proposal.data.heading')} />
                      <ProposalForm />
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

export default withTranslation()(NewProposal);
