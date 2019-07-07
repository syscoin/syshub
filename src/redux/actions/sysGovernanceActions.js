import constants from '../constants';
import * as proposalService from '../../API/syscoin/proposals.service';

export default {
  getSysGovernanceInfo: () => {
    return dispatch => {
      return dispatch(
        proposalService.getGovernanceInfo(constants.SYS_GOVERNANCE_INFO)
      );
    };
  }
};
