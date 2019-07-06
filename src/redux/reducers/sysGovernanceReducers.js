import constants from '../constants';

const initialState = {
  payoutDate: '2/5/2019',
  governanceAvailable: 123618726,
  votingDeadline: '1/5/2019'
};

const governance = (state = initialState, action) => {
  switch (action.type) {
    case constants.SYS_GOVERNANCE_INFO: {
      const { payoutDate, governanceAvailable, votingDeadline } = action.data;
      return {
        ...state,
        payoutDate,
        governanceAvailable,
        votingDeadline
      };
    }
    default:
      return state;
  }
};

export default governance;
