import constants from '../constants';

const initialState = {
  payoutDate: '',
  governanceAvailable: 0,
  votingDeadline: ''
};

const governance = (state = initialState, action) => {
  switch (action.type) {
    case constants.SYS_GOVERNANCE_INFO: {
      const { rewardDate, votingDeadline, nextSuperBlockBudget } = action.data;
      return {
        ...state,
        payoutDate: rewardDate,
        blockHeight: nextSuperBlockBudget.block,
        votingDeadline,
        governanceAvailable: nextSuperBlockBudget.budget
      };
    }
    default:
      return state;
  }
};

export default governance;
