import constants from '../constants';

import { HTTPAsync } from '../helpers';

export default {
  getProposals: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get('http://159.89.141.35:3000/list', null, constants.SYS_PROPOSALS_GET)
      );
    };
  },

  checkProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post('159.89.141.35:3000/check', params, constants.SYS_PROPOSALS_CHECK)
      );
    };
  },

  prepareProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post('159.89.141.35:3000/prepare', params, constants.SYS_PROPOSALS_PREPARE)
      );
    };
  },

  submitProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post('159.89.141.35:3000/submit', params, constants.SYS_PROPOSALS_SUBMIT)
      );
    };
  },

  voteOnProposal: params => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post('http://159.89.141.35:3000/vote', params, constants.SYS_PROPOSAL_VOTE)
      );
    };
  }
};
