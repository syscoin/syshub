import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { withTranslation } from "react-i18next";
import { useUser } from '../../context/user-context';

import { list, getUserInfo } from '../../utils/request';

import SubTitle from '../global/SubTitle';
import ProposalCard from './ProposalCard';

/**
 * Component to show the proposal list of governance
 * @component
 * @subcategory Governance
 * @param {*} props t from withTranslation and statsData from governance
 * @example
 * const statsData = {}
 * return (
 *  <ProposalsList statsData={statsData} />
 * )
 */
function ProposalsList(props) {
  const { t } = props;
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [dataload, setDataload] = useState(0);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  /**
   * Function to fetch the proposals from the API
   * @function 
   */
  const loadProposals = useCallback(async () => {
    try {
      const response = await list(cancelSource.token);
      if (response.data) {
        let govdata = response.data;
        Object.keys(govdata).forEach(function(key) {
          if(govdata[key].ObectType===2) {
              delete govdata[key];
          }
        });
        setProposals(govdata);
        setDataload(1);
      }
    } catch (error) {
      // console.log(error);
      setDataload(2);
    }
  }, [cancelSource]);

  /**
   * Function to fetch the userInfo from the API
   * @function
   */
  const loadUserInfo = useCallback(async () => {
    if (user) {
      try {
        const response = await getUserInfo(user.data.user_id, cancelSource.token);
        if (response.data) {
          await setUserInfo(response.data.user);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }, [user, cancelSource]);

  /**
   * UseEffect that triggers the loadProposals and loadUserInfo functions, at the component's dismount cancel all the requests
   * @function
   */
  useEffect(() => {
    loadProposals();
    loadUserInfo();
    return () => {
      cancelSource.cancel('The request has been canceled');
    }
  }, [cancelSource, loadProposals, loadUserInfo]);


  return (
    <>
      <SubTitle heading={t('govlist.table.title')} />
      {
        (dataload === 0) && <p className="text-center">{t('govlist.loading')}</p>
      }
      {
        (dataload === 1 && proposals.length > 0) && <div className="proposals">
          {proposals.map(proposal => {
            return <ProposalCard
              key={proposal.Hash}
              proposal={proposal}
              onLoadProposals={loadProposals}
              enabled={props.statsData.enabled}
              userInfo={userInfo}
            />
          })}
        </div>
      }
      {
        (dataload === 1 && proposals.length === 0) && <p className="text-center">There are no proposals</p>
      }
      {
        (dataload === 2) && <p className="text-center">The data couldn't be fetched</p>
      }
    </>
  )
}

export default withTranslation()(ProposalsList);
