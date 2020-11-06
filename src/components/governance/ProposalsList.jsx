import React, { useEffect, useState, useCallback } from 'react';
import { withTranslation } from "react-i18next";

import { list } from '../../utils/request';

import SubTitle from '../global/SubTitle';
import ProposalCard from './ProposalCard';

function ProposalsList(props) {
  
  const { t } = props;
  const [proposals, setProposals] = useState([]);

  const loadProposals = useCallback(async () => {
    try {
      const response = await list();
      if (response.data) {
        console.log(response.data);
        const proposalRes = Object.values(response.data);

        setProposals(proposalRes);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadProposals();
    return () => {
      setProposals([]);
    }
  }, []);


  return (
    <>
      <SubTitle heading={t('govlist.table.title')} />
      {
        proposals.length > 0 && <div className="proposals">
          {proposals.map(proposal => {
            return <ProposalCard proposal={proposal} key={proposal} />
          })}
        </div>
      }
      {
        proposals.length === 0 && <p>Loading...</p>
      }
    </>
  )
}

export default withTranslation()(ProposalsList);