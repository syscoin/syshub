import constants from '../constants';

import { HTTPAsync, Hex } from '../helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API GO TO "/src/redux/constants/apiURLsConst.js"  */
/**---------------------------------------------------------------------------- */

const baseApiURL = constants.URL_SYS_MN_API; // Quang HTTPS server

/**---------------------------------------------------------------------------- */

export default {
  getProposals: () => {
    //---- Sample code --------------------------
    const txt = 'Hello HEX World';
    const hex = Hex.strToHex(txt);
    const str = Hex.hexToStr(hex);
    // -------------------------------------------

    return dispatch => {
      return dispatch(
        HTTPAsync.get(`${baseApiURL}/list`, null, constants.SYS_PROPOSALS_GET)
      );
    };
  },

  checkProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(
          `${baseApiURL}/check`,
          params,
          constants.SYS_PROPOSALS_CHECK
        )
      );
    };
  },

  prepareProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(
          `${baseApiURL}/prepare`,
          params,
          constants.SYS_PROPOSALS_PREPARE
        )
      );
    };
  },

  submitProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(
          `${baseApiURL}/submit`,
          params,
          constants.SYS_PROPOSALS_SUBMIT
        )
      );
    };
  },

  voteOnProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(
          `${baseApiURL}/vote`,
          params,
          constants.SYS_PROPOSAL_VOTE
        )
      );
    };
  }
};
