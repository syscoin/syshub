import constants from '../constants';
import { nextGovernanceRewardDate } from '../../API/syscoin/proposals.service';

export default {
  getSysGovernanceInfo: () => {
    return dispatch =>
      dispatch({
        type: constants.SYS_GOVERNANCE_INFO,
        data: nextGovernanceRewardDate()
      });
  }
};
