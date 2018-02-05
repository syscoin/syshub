import constants from '../constants';

import { HTTPAsync, Hex } from '../helpers';

//const baseApiURL = 'http://159.89.141.35:3000'; //Old net, no SYS available
const baseApiURL = 'http://159.89.151.42:3000';

export default {
  getProposals: () => {
    //---- Sample code --------------------------
    const txt = 'Hello HEX World';
    const hex = Hex.strToHex(txt);
    const str = Hex.hexToStr(hex);
    console.log('ACZ Original String: ', txt);
    console.log('ACZ To Hex: ', hex);
    console.log('ACZ To Str: ', str);
    // -------------------------------------------

    return dispatch => {
      return dispatch(HTTPAsync.get(`${baseApiURL}/list`, null, constants.SYS_PROPOSALS_GET));
    };
  },

  checkProposal: params => {
    return dispatch => {
      return dispatch(HTTPAsync.post(`${baseApiURL}/check`, params, constants.SYS_PROPOSALS_CHECK));
    };
  },

  prepareProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(`${baseApiURL}/prepare`, params, constants.SYS_PROPOSALS_PREPARE)
      );
    };
  },

  submitProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(`${baseApiURL}/submit`, params, constants.SYS_PROPOSALS_SUBMIT)
      );
    };
  },

  voteOnProposal: params => {
    return dispatch => {
      return dispatch(HTTPAsync.post(`${baseApiURL}/vote`, params, constants.SYS_PROPOSAL_VOTE));
    };
  }
};
