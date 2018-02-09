import constants from '../constants';

import { HTTPAsync } from '../helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API GO TO "/src/redux/constants/apiURLsConst.js"  */
/**---------------------------------------------------------------------------- */

const baseApiURL = constants.URL_SYS_MN_API; // Quang HTTPS server

/**---------------------------------------------------------------------------- */

const strToHex = str => {
  let hex = '';
  let i = 0;
  const str_len = str.length;
  let c = '';

  for (; i < str_len; i += 1) {
    c = str.charCodeAt(i);
    hex += c.toString(16);
  }
  return hex;
};

const hexToStr = hex => {
  let str = '';
  let i = 0;
  const arr_len = hex.length / 2;
  let c = '';

  for (; i < arr_len; i += 1) {
    const chunk = hex.slice(2 * i, 2 * i + 2);
    c = String.fromCharCode(parseInt(chunk, 16));
    str += c;
  }
  return str;
};

export default {
  getProposals: () => {
    //---- Sample code --------------------------
    const txt = 'Hello HEX World';
    const hex = strToHex(txt);
    const str = hexToStr(hex);
    console.log('ACZ Original String: ', txt);
    console.log('ACZ To Hex: ', hex);
    console.log('ACZ To Str: ', str);
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
