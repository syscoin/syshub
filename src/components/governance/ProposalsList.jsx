import React, { useEffect, useState, useCallback } from 'react';
import { withTranslation } from "react-i18next";
import { useUser } from '../../context/user-context';

import { list, getUserInfo } from '../../utils/request';

import SubTitle from '../global/SubTitle';
import ProposalCard from './ProposalCard';

function ProposalsList(props) {
  const { t } = props;
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [proposals, setProposals] = useState([]);

  const loadProposals = useCallback(async () => {
    try {
      const response = await list();
      if (response.data) {
        let govdata = response.data;
        Object.keys(govdata).forEach(function(key) {
          if(govdata[key].ObectType===2) {
              delete govdata[key];
          }
        });
        setProposals(govdata);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadUserInfo = useCallback(async () => {
    if (user) {
      try {
        const response = await getUserInfo(user.token, user.data.user_id);
        if (response.data) {
          await setUserInfo(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  useEffect(() => {
    loadProposals();
    loadUserInfo();
    return () => {
      setProposals([]);
      setUserInfo(null);
    }
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <SubTitle heading={t('govlist.table.title')} />
      {
        proposals.length > 0 && <div className="proposals">
          {proposals.map(proposal => {
            return <ProposalCard proposal={proposal} key={proposal.Hash} enabled={props.statsData.enabled} userInfo={userInfo} />
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