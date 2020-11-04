import React from 'react';
import { withTranslation } from "react-i18next";

import SubTitle from '../global/SubTitle';
import ProposalCard from './ProposalCard';

function ProposalsList(props) {
  const { t } = props;
  const proposals = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <SubTitle heading={t('govlist.table.title')} />
      <div className="proposals">
        {proposals.map(proposal => {
          return <ProposalCard proposal={proposal} key={proposal} />
        })}
      </div>
    </>
  )
}

export default withTranslation()(ProposalsList);