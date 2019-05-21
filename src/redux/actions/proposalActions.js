import constants from '../constants';
import * as proposalService from '../../API/syscoin/proposals.service';

export default {
  getProposals: () => {
    return dispatch => {
      return dispatch(
        proposalService.getProposalList(constants.SYS_PROPOSALS_GET)
      );
    };
  },

  checkProposal: params => {
    return dispatch => {
      return dispatch(
        proposalService.checkProposal(params, constants.SYS_PROPOSALS_CHECK)
      );
    };
  },

  prepareProposal: params => {
    return dispatch => {
      return dispatch(
        proposalService.prepareProposal(params, constants.SYS_PROPOSALS_PREPARE)
      );
    };
  },

  submitProposal: params => {
    return dispatch => {
      return dispatch(
        proposalService.submitProposal(params, constants.SYS_PROPOSALS_SUBMIT)
      );
    };
  },

  voteOnProposal: params => {
    return dispatch => {
      return dispatch(
        proposalService.voteOnProposal(params, constants.SYS_PROPOSAL_VOTE)
      );
    };
  }
};
