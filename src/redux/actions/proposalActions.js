import constants from '../constants';

import { HTTPAsync } from '../helpers';

export default {
  getProposals: () => {
    return dispatch => {
      return dispatch(HTTPAsync.get('159.89.141.35:3000/list', null, SYS_PROPOSALS_GET));
    };
  },

  checkProposal: params => {
    return dispatch => {
      return dispatch(HTTPAsync.post('159.89.141.35:3000/check', params, SYS_PROPOSALS_CHECK));
    };
  },

  prepareProposal: params => {
    return dispatch => {
      return dispatch(HTTPAsync.post('159.89.141.35:3000/prepare', params, SYS_PROPOSALS_PREPARE));
    };
  },

  submitProposal: params => {
    return dispatch => {
      return dispatch(HTTPAsync.post('159.89.141.35:3000/submit', params, SYS_PROPOSALS_SUBMIT));
    };
  }
};
